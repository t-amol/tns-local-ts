// src/routes/index.tsx
import * as React from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { isLoggedIn, getUser } from "@/lib/auth/fake-auth";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const nav = useNavigate();
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState(getUser());

  React.useEffect(() => {
    if (!isLoggedIn()) nav({ to: "/login" }); else { setUser(getUser()); setReady(true); }
  }, [nav]);

  if (!ready) return null;
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Welcome, {user?.name ?? "Guest"}</h1>
      <p className="mt-2 text-muted-foreground">You’re logged in via fake auth.</p>
      <div className="mt-6"><Link to="/dashboard" className="btn">Open Dashboard</Link></div>
    </main>
  );
}
