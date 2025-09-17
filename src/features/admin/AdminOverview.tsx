import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import StatCard from "@/features/shared/StatCard";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Administration" subtitle="Overview of administrative activity." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Users" value="1,248" />
        <StatCard label="Roles" value="17" />
        <StatCard label="Permissions" value="142" />
        <StatCard label="Audit Events (24h)" value="3,921" />
      </div>
    </div>
  );
}
