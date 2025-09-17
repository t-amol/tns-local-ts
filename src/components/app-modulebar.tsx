import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MODULES } from "@/config/modules";

export default function TopModuleBar() {
  const { location } = useRouterState();

  return (
    <div className="sticky top-10 z-40 border-b-0 bg-[rgb(10,10,11)]/85 backdrop-blur">

      {/* full-bleed, no horizontal padding so it starts at x=0 */}
      <div className="flex items-center overflow-x-auto whitespace-nowrap gap-0">
        {/* segmented group with sharp corners */}
        <div className="inline-flex overflow-hidden">
          {MODULES.map((m, i) => {
            const active =
              location.pathname === m.path ||
              location.pathname.startsWith(m.path + "/");

            const separator = i === 0 ? "" : "border-l border-zinc-700";

            const base =
              "inline-flex items-center px-3 h-8 text-xs md:text-sm select-none transition-colors " +
              separator;

            const state = active
              ? "bg-white text-black mb-[-1px]" // hide any bar border below
              : "bg-transparent text-zinc-200 hover:bg-zinc-800/60";

            return (
              <Link
                key={m.path}
                to={m.path}
                aria-current={active ? "page" : undefined}
                className={`${base} ${state} focus:outline-none focus:ring-0 w-32 justify-center`}
              >
                {m.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
