import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import StatCard from "@/features/shared/StatCard";

export default function OrdersOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" subtitle="Order pipeline at a glance." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Orders" value="328" />
        <StatCard label="Returns" value="12" />
        <StatCard label="Shipments Today" value="84" />
        <StatCard label="On Hold" value="9" />
      </div>
    </div>
  );
}
