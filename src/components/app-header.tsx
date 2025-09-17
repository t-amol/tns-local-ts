import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
// If you use lucide-react icons, you can import a small logo/icon here.

export default function AppHeader() {
  const { location } = useRouterState();

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={[
          "text-sm px-3 py-1 rounded-md transition",
          active ? "bg-zinc-800 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800/60",
        ].join(" ")}
      >
        {label}
      </Link>
    );
  };

  return (
<header className="sticky top-0 z-50 border-b border-zinc-800 bg-[rgb(10,10,11)]/95 backdrop-blur">
  <div className="flex h-10 items-center justify-between px-4">
    <div className="flex items-center gap-3">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-200">
        <span className="text-xs font-bold">𝓔𝓓</span>
      </div>
      <span className="text-sm font-semibold text-white">
        EDUTECH SCHOOL MANAGEMENT
      </span>
    </div>

    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-zinc-700/70" aria-label="User avatar" />
    </div>
  </div>
</header>
  );
}
