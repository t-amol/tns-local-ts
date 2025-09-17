import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReturnsList from "@/features/orders/ReturnsList";

export const Route = createFileRoute("/orders/returns")({
  component: () => <ReturnsList />,
});
