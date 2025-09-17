// src/components/app-sidebar.tsx
import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { getActiveModule } from "@/config/modules";

export default function AppSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;
  const activeModule = getActiveModule(pathname);

  // Fallback when on routes that don't belong to any module (e.g., "/")
  const submodules =
    activeModule?.submodules ?? [{ label: "Welcome", to: "/" }];

  return (
    <nav className="w-full text-sm">
      {/* Submodule links */}
      <ul className="py-1">
        {submodules.map((s) => {
          const isActive =
            pathname === s.to || (s.to !== activeModule?.path && pathname.startsWith(s.to + "/"));
          return (
            <li key={s.to}>
              <Link
                to={s.to}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "block px-3 py-2 transition-colors",
                  isActive
                    ? "text-zinc-900 font-bold"
                    : "text-zinc-700 hover:bg-zinc-100 font-normal",
                ].join(" ")}
              >
                {s.label}
              </Link>
            </li>

          );
        })}
      </ul>

      {/* Optional: common bottom links 
      <div className="mt-4 border-t pt-2">
        <ul>
          <li>
            <Link
              to="/settings"
              className={[
                "block px-3 py-2 transition-colors",
                pathname.startsWith("/settings")
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100",
              ].join(" ")}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className={[
                "block px-3 py-2 transition-colors",
                pathname.startsWith("/help")
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100",
              ].join(" ")}
            >
              Help
            </Link>
          </li>
        </ul>
      </div>*/}
    </nav>
  );
}
