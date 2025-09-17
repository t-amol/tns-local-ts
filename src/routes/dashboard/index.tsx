import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Overview</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Users" value="1,248" />
        <Card title="Sessions" value="8,921" />
        <Card title="Conversion" value="3.2%" />
        <Card title="Revenue" value="$12.4k" />
      </div>

      {/* Placeholder panel */}
      <div className="rounded-xl border p-4">
        <div className="text-sm font-medium">Recent Activity</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Hook up your API here. This is the default dashboard landing page.
        </div>
      </div>
    </div>
  );
}
