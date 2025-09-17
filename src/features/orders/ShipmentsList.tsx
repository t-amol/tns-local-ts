import * as React from "react";
import PageHeader from "@/features/shared/PageHeader";
import EmptyState from "@/features/shared/EmptyState";

export default function ShipmentsList() {
  return (
    <div className="space-y-4">
      <PageHeader title="Shipments" subtitle="Track shipments and carriers." />
      <EmptyState label="Hook up your shipments table here." />
    </div>
  );
}
