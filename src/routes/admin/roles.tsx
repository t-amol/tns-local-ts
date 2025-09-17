import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import RolesList from "@/features/admin/RolesList";

export const Route = createFileRoute("/admin/roles")({
  component: () => <RolesList />,
});
