import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import ShipmentsList from "@/features/orders/ShipmentsList";

export const Route = createFileRoute("/orders/shipments")({
  component: () => <ShipmentsList />,
});
