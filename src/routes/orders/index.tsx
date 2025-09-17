import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import OrdersOverview from "@/features/orders/OrdersOverview";

export const Route = createFileRoute("/orders/")({
  component: () => <OrdersOverview />,
});
