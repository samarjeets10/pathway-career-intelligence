import {
  LayoutDashboard,
  FileSearch,
  Files,
  BriefcaseBusiness,
  MessageSquareText,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth"

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
import { useState } from "react";

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

const { actionLoading, handleLogout } = useAuth();
const navigate = useNavigate();
const location = useLocation();

const [error, setError] = useState("");

const userLogoutHandler = async () => {
  try {

    await handleLogout();
    const from = location.state?.from?.pathname;
    navigate(from || "/", { replace: true });

  } catch (err) {
    setError(err.message);
  }
}


return ( 

  <Sidebar className='py-4 px-4' collapsible="icon"> 
    <SidebarHeader> 
      <SidebarMenu> 
        <SidebarMenuItem>
          <SidebarMenuButton
          render={<Link to="/dashboard" />}
          tooltip="Pathway"
          size="lg">
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xl">Pathway</span>
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
        <SidebarMenuButton
        className='w-fit px-4 cursor-pointer bg-[#c8f36b] mt-4 border border-neutral-200 rounded-full' 
        disabled={actionLoading}
        onClick={userLogoutHandler}
        tooltip="Log out">
          <LogOut />
          <span className='text-md font-semibold'>{actionLoading ? "Loging out..." : "Log out"}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>

  <SidebarRail />
</Sidebar>

);
}

export default AppSidebar;
