import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import EmptyState from "@/features/shared/EmptyState";

export default function RolesList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Roles" subtitle="Define and assign roles." />
      <EmptyState label="Hook up your roles table here." />
    </div>
  );
}
