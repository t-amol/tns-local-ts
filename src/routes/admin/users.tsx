import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import UsersList from "@/features/admin/UsersList";

export const Route = createFileRoute("/admin/users")({
  component: () => <UsersList />,
});
