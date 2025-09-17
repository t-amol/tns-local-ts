import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import EmptyState from "@/features/shared/EmptyState";

export default function ReturnsList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Returns" subtitle="Process product returns." />
      <EmptyState label="Hook up your returns table here." />
    </div>
  );
}
