import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import AdminOverview from "@/features/admin/AdminOverview";

export const Route = createFileRoute("/admin/")({
  component: () => <AdminOverview />,
});
