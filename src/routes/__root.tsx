import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ORG } from "@/components/site/site-nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";
import { ScrollToTop } from "@/components/site/ScrollToTop";

function NotFoundComponent() {
  return (
    <div className="radiant-field flex min-h-[60vh] items-center bg-navy text-white">
      <div className="container-page py-20">
        <p className="eyebrow text-yellow">Error 404</p>
        <h1 className="text-display-lg mt-6 font-extrabold">We couldn&apos;t find that page.</h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
          The page may have moved, or the address may be incorrect.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent">
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild size="lg" variant="outlineLight">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span aria-hidden="true" className="rule-accent mx-auto block" />
        <h1 className="mt-6 text-xl font-semibold tracking-tight text-navy">
          This page didn&apos;t load
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Something went wrong on our end while loading this page. You can try again, or return
          home.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Button onClick={() => router.invalidate().then(() => reset())}>Try again</Button>
          <Button asChild variant="outline">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORG.name,
  alternateName: ORG.short,
  slogan: ORG.motto,
  foundingDate: "2025-09-17",
  description:
    "Youth development organisation working across Northeast Nigeria on education, skills, leadership development and access to clean water, sanitation and hygiene.",
  address: {
    "@type": "PostalAddress",
    addressLocality: ORG.city,
    addressRegion: ORG.state,
    addressCountry: "NG",
  },
} as const;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GKD-YDI — Empowering Youth, Building Futures" },
      {
        name: "description",
        content:
          "Gidan Karan Dawa Youth Development Initiatives (GKD-YDI) empowers young people in Northeast Nigeria through education, skills, leadership and clean water access.",
      },
      { property: "og:title", content: "GKD-YDI — Empowering Youth, Building Futures" },
      {
        property: "og:description",
        content:
          "Youth-led development for a resilient Northeast Nigeria — education, skills, leadership and WASH access in Yobe State.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgressBar />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <Toaster />
    </QueryClientProvider>
  );
}
