import * as React from "react";

export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-md border p-6 text-sm text-muted-foreground">
      {label}
    </div>
  );
}
