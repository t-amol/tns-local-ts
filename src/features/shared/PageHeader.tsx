import * as React from "react";

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
    </header>
  );
}
