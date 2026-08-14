import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Building2,
  CalendarClock,
  Database,
  FileStack,
  Gauge,
  Globe,
  Headphones,
  Inbox,
  Import,
  Layers,
  Mail,
  MailCheck,
  Phone,
  PhoneCall,
  Plug,
  ScrollText,
  ShieldCheck,
  Ban,
  Server,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Silver Operations",
    items: [
      { title: "Live Metrics", url: "/", icon: Gauge },
      { title: "Activity", url: "/activity", icon: Activity },
    ],
  },
  {
    label: "SilverCall Center",
    items: [
      { title: "Overview", url: "/call", icon: PhoneCall },
      { title: "Campaigns", url: "/call/campaigns", icon: Layers },
      { title: "Hopper / Auto-Dial", url: "/call/hopper", icon: CalendarClock },
      { title: "Agent Console", url: "/call/agents", icon: Headphones },
      { title: "Call History", url: "/call/history", icon: Phone },
    ],
  },
  {
    label: "SilverLeads CRM",
    items: [
      { title: "Overview", url: "/leads", icon: Database },
      { title: "Leads", url: "/leads/all", icon: FileStack },
      { title: "Import", url: "/leads/import", icon: Import },
      { title: "Suppression", url: "/leads/suppression", icon: Ban },
    ],
  },
  {
    label: "SilverMailer",
    items: [
      { title: "Overview", url: "/mailer", icon: Mail },
      { title: "Mailboxes", url: "/mailer/mailboxes", icon: Inbox },
      { title: "Campaigns", url: "/mailer/campaigns", icon: MailCheck },
      { title: "Deliverability", url: "/mailer/deliverability", icon: BarChart3 },
    ],
  },
  {
    label: "SilverHost",
    items: [
      { title: "Overview", url: "/host", icon: Server },
      { title: "Domains", url: "/host/domains", icon: Globe },
      { title: "DNS", url: "/host/dns", icon: Building2 },
      { title: "Deployments", url: "/host/deployments", icon: Layers },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Roles & Permissions", url: "/admin/roles", icon: ShieldCheck },
      { title: "Audit Log", url: "/admin/audit", icon: ScrollText },
      { title: "Integrations", url: "/admin/integrations", icon: Plug },
    ],
  },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <span className="font-mono text-xs font-bold">S</span>
          </span>
          <span className="min-w-0 truncate">
            <span className="block truncate text-sm font-semibold leading-tight">
              Silver Operations
            </span>
            <span className="block truncate font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              ops panel
            </span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="font-mono text-[10px] tracking-wider uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={currentPath === item.url} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <span className="font-mono text-[10px] font-semibold">DW</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium">Dana Whitfield</span>
            <span className="block truncate text-[11px] text-muted-foreground">Administrator</span>
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
