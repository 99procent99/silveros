import {
  Inviter,
  Registerer,
  SessionState,
  UserAgent,
  type Session,
} from "sip.js";

export type SipProviderConfig = {
  label: string;
  websocketUrl: string;
  domain: string;
  username: string;
  password: string;
  displayName: string;
};

export type SipSessionState = "idle" | "connecting" | "connected" | "dialing" | "ringing" | "in-call" | "ended" | "error";

const SIP_PROVIDER_STORAGE_KEY = "silvercall.sip.provider.v1";

export function loadSipProvider(): SipProviderConfig | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem(SIP_PROVIDER_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as SipProviderConfig;
  } catch {
    return null;
  }
}

export function saveSipProvider(config: SipProviderConfig): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SIP_PROVIDER_STORAGE_KEY, JSON.stringify(config));
}

export function clearSipProvider(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SIP_PROVIDER_STORAGE_KEY);
}

export function getSipErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "The SIP operation failed. Check the provider settings and browser permissions.";
}

export function getRemoteMediaStream(session: Session | undefined): MediaStream | undefined {
  const handler = session?.sessionDescriptionHandler as
    | { remoteMediaStream?: MediaStream }
    | undefined;
  return handler?.remoteMediaStream;
}

export class BrowserSipClient {
  private userAgent: UserAgent | undefined;
  private registerer: Registerer | undefined;
  private session: Inviter | undefined;

  get isConnected(): boolean {
    return this.userAgent?.isConnected() ?? false;
  }

  get activeSession(): Inviter | undefined {
    return this.session;
  }

  async connect(config: SipProviderConfig): Promise<void> {
    if (!config.websocketUrl || !config.domain || !config.username || !config.password) {
      throw new Error("Enter the WebSocket URL, SIP domain, username, and password first.");
    }

    await this.disconnect();

    const uri = UserAgent.makeURI(`sip:${config.username}@${config.domain}`);
    if (!uri) throw new Error("The SIP username or domain is not a valid SIP URI.");

    this.userAgent = new UserAgent({
      uri,
      displayName: config.displayName || config.username,
      authorizationUsername: config.username,
      authorizationPassword: config.password,
      transportOptions: {
        server: config.websocketUrl,
      },
      sessionDescriptionHandlerFactoryOptions: {
        peerConnectionConfiguration: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
      },
      delegate: {
        onInvite: async (invitation) => {
          await invitation.reject();
        },
      },
    });

    await this.userAgent.start();
    this.registerer = new Registerer(this.userAgent);
    await this.registerer.register();
  }

  async disconnect(): Promise<void> {
    if (this.session) {
      await this.endSession();
    }

    if (this.registerer) {
      try {
        await this.registerer.unregister();
      } catch {
        // The transport may already be gone; shutdown should still continue.
      }
      await this.registerer.dispose();
      this.registerer = undefined;
    }

    if (this.userAgent) {
      await this.userAgent.stop();
      this.userAgent = undefined;
    }
  }

  async dial(
    destination: string,
    onStateChange: (state: SipSessionState) => void,
    onRemoteStream: (stream: MediaStream | undefined) => void,
  ): Promise<void> {
    if (!this.userAgent || !this.isConnected) {
      throw new Error("Connect a SIP provider before dialing.");
    }

    const normalizedDestination = destination.trim().replace(/[^\d*#+]/g, "");
    if (!normalizedDestination) throw new Error("Enter a phone number to dial.");

    const target = UserAgent.makeURI(`sip:${normalizedDestination}@${this.userAgent.configuration.uri.host}`);
    if (!target) throw new Error("The dialed number could not be converted to a SIP target.");

    const inviter = new Inviter(this.userAgent, target, {
      sessionDescriptionHandlerOptions: {
        constraints: { audio: true, video: false },
      },
    });

    this.session = inviter;
    inviter.stateChange.addListener((state) => {
      if (state === SessionState.Establishing) onStateChange("ringing");
      if (state === SessionState.Established) {
        onStateChange("in-call");
        onRemoteStream(getRemoteMediaStream(inviter));
      }
      if (state === SessionState.Terminating || state === SessionState.Terminated) {
        onStateChange("ended");
        onRemoteStream(undefined);
      }
    });

    onStateChange("dialing");
    await inviter.invite();
  }

  async endSession(): Promise<void> {
    const session = this.session;
    if (!session) return;

    try {
      if (session.state === SessionState.Established) {
        await session.bye();
      } else if (session.state !== SessionState.Terminated) {
        await session.cancel();
      }
    } finally {
      this.session = undefined;
    }
  }

  sendDtmf(tone: string): boolean {
    return this.session?.sessionDescriptionHandler?.sendDtmf(tone) ?? false;
  }

  setMuted(muted: boolean): void {
    const handler = this.session?.sessionDescriptionHandler as
      | { localMediaStream?: MediaStream }
      | undefined;
    handler?.localMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }
}