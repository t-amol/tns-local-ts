import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import EmptyState from "@/features/shared/EmptyState";

export default function UsersList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Users" subtitle="Manage user accounts." />
      <EmptyState label="Hook up your users table here." />
    </div>
  );
}
