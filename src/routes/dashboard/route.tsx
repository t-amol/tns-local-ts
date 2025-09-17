import * as React from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

// If your sidebar provider is a NAMED export (common for shadcn):
import { SidebarProvider } from "@/components/ui/sidebar";

// If your components export default:
import {AppSidebar} from "@/components/app-sidebar";
import {UserNav} from "@/components/user-nav";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full">
        <aside className="hidden md:block sticky top-0 h-dvh shrink-0 border-r">
          <AppSidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <section className="px-4 py-4">
            {/* ⬇️ This is where the index page will render */}
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
