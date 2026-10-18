import { Outlet } from "react-router-dom";

import {
SidebarInset,
SidebarProvider,
SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSidebar from "./AppSidebar";

function DashboardLayout() {
return ( <SidebarProvider> <AppSidebar />

  <SidebarInset className="min-w-0">
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <SidebarTrigger />

      <h1 className="text-sm font-medium">
        Pathway Workspace
      </h1>
    </header>

    <main className="flex-1 p-4 md:p-6">
      <Outlet />
    </main>
  </SidebarInset>
</SidebarProvider>

);
}

export default DashboardLayout;
