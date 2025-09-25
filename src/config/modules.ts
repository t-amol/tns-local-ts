// src/config/modules.ts

export type Submodule = { label: string; to: string };
export type ModuleDef = {
  id: string;
  label: string;
  path: string;
  submodules: Submodule[];
};

// Central registry of all top modules and their submodules
export const MODULES: ModuleDef[] = [
  {
    id: "admin",
    label: "Administration",
    path: "/admin",
    submodules: [
      { label: "Overview", to: "/admin" },
      { label: "Users", to: "/admin/users" },
      { label: "Products", to: "/admin/products" },
      { label: "Roles", to: "/admin/roles" },
      { label: "Permissions", to: "/admin/permissions" },
      { label: "Audit Logs", to: "/admin/audit-logs" },
      { label: "Org Settings", to: "/admin/settings" },
    ],
  },
  {
    id: "orders",
    label: "Order Management",
    path: "/orders",
    submodules: [
      { label: "All Orders", to: "/orders" },
      { label: "Returns", to: "/orders/returns" },
      { label: "Shipments", to: "/orders/shipments" },
      { label: "Customers", to: "/orders/customers" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    path: "/inventory",
    submodules: [
      { label: "Items", to: "/inventory/items" },
      { label: "Suppliers", to: "/inventory/suppliers" },
      { label: "Warehouses", to: "/inventory/warehouses" },
      { label: "Stock Movements", to: "/inventory/movements" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    path: "/billing",
    submodules: [
      { label: "Invoices", to: "/billing/invoices" },
      { label: "Payments", to: "/billing/payments" },
      { label: "Plans", to: "/billing/plans" },
      { label: "Tax", to: "/billing/tax" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/analytics",
    submodules: [
      { label: "Dashboards", to: "/analytics" },
      { label: "Reports", to: "/analytics/reports" },
      { label: "Funnels", to: "/analytics/funnels" },
    ],
  },
];

/**
 * Returns the active top-level module based on the current pathname.
 * - Exact match: `/admin` → Administration
 * - Nested match: `/admin/users` → Administration
 * - Picks the longest matching path (so `/orders/returns` matches `/orders`)
 */
export function getActiveModule(pathname: string): ModuleDef | undefined {
  const matches = MODULES.filter(
    (m) => pathname === m.path || pathname.startsWith(m.path + "/")
  );
  if (matches.length === 0) return undefined;
  return matches.sort((a, b) => b.path.length - a.path.length)[0];
}
