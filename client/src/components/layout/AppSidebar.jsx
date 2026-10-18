import {
  LayoutDashboard,
  FileSearch,
  Files,
  BriefcaseBusiness,
  MessageSquareText,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resume Analysis",
    url: "/dashboard/analysis",
    icon: FileSearch,
  },
  {
    title: "My Resumes",
    url: "/dashboard/resumes",
    icon: Files,
  },
  {
    title: "Job Matches",
    url: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interviews",
    icon: MessageSquareText,
  },
];

function AppSidebar() {
const location = useLocation();

return ( 

  <Sidebar collapsible="icon"> 
    <SidebarHeader> 
      <SidebarMenu> 
        <SidebarMenuItem>
          <SidebarMenuButton
          render={<Link to="/dashboard" />}
          tooltip="Pathway"
          size="lg">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold">Pathway</span>
              <span className="text-xs text-muted-foreground">
                Career Intelligence
              </span>
            </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>

      <SidebarMenu>
        {navigationItems.map((item) => {
          const isActive =
            item.url === "/dashboard"
              ? location.pathname === item.url
              : location.pathname === item.url ||
                location.pathname.startsWith(`${item.url}/`);

          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                render={<Link to={item.url} />}
                isActive={isActive}
                tooltip={item.title}
              >
                <Icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup>
      <SidebarGroupLabel>Preferences</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<Link to="/dashboard/settings" />}
            isActive={location.pathname.startsWith(
              "/dashboard/settings"
            )}
            tooltip="Settings"
          >
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Account">
          <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            U
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Your Account</span>
            <span className="text-xs text-muted-foreground">
              Career workspace
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Log out">
          <LogOut />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>

  <SidebarRail />
</Sidebar>

);
}

export default AppSidebar;
