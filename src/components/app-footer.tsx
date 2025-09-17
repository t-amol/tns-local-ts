import * as React from "react";

export default function AppFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-[rgb(10,10,11)]">
      <div className="mx-auto flex h-4 items-center justify-center text-xs text-zinc-400">
        <span>© {new Date().getFullYear()}  @Copyright all rights reseved by EDUTECH SCHOOL MANAGEMENT</span>
      </div>
    </footer>
  );
}
