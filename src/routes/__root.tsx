import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { authQueries } from "@/services/queries";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

// in your root layout header
import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import TopModuleBar from "@/components/app-modulebar";
import { getUser, isLoggedIn, logout } from "@/lib/auth/fake-auth";
import AppSidebar from "@/components/app-sidebar";
// ...
{isLoggedIn() ? (
  <>
    <span className="text-sm text-muted-foreground">{getUser()?.name}</span>
    <button className="btn btn-sm" onClick={()=>{ logout(); window.location.href="/login"; }}>Logout</button>
  </>
) : (
  <Link to="/login" className="btn btn-sm">Login</Link>
)}


export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(
      authQueries.user()
    );
    return { userSession };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
     <RootDocument>
      <div
  className="min-h-dvh flex flex-col"
  style={{
    ['--app-header-h' as any]: '56px',
    ['--app-modbar-h' as any]: '40px',
    ['--app-footer-h' as any]: '48px',
  }}
>
  <AppHeader />
  <TopModuleBar />

  <main className="flex-1 min-h-0">
  <div
    className="grid"
    style={{
      gridTemplateColumns: "256px 1fr",
      // ensure this whole area is at least the viewport minus header+modulebar
      minHeight: "calc(100dvh - var(--app-header-h) - var(--app-modbar-h))",
    }}
  >
    {/* LEFT: Sidebar with explicit height (so the border-right paints fully) */}
    <aside
      className="border-r bg-background"
      style={{
        position: "sticky",
        top: "calc(var(--app-header-h) + var(--app-modbar-h))",
        height:
          "calc(100dvh - var(--app-header-h) - var(--app-modbar-h) - var(--app-footer-h))",
        overflow: "auto",
      }}
    >
      <AppSidebar />
    </aside>

    {/* RIGHT */}
    <section className="min-w-0">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <Outlet />
      </div>
    </section>
  </div>
</main>

  <AppFooter />
</div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>{children}</Providers>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
