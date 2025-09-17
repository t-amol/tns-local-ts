// src/routes/login.tsx
import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isLoggedIn, login } from "@/lib/auth/fake-auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const nav = useNavigate();
  const [name, setName] = React.useState("");
  React.useEffect(() => { if (isLoggedIn()) nav({ to: "/" }); }, [nav]);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-muted-foreground">Fake login for dev. Enter any name.</p>
      <form className="mt-6 space-y-3" onSubmit={(e)=>{e.preventDefault(); login(name); nav({to:"/"});}}>
        <input className="input input-bordered w-full" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="btn w-full" type="submit">Continue</button>
      </form>
    </main>
  );
}
