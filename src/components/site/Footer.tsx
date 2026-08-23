import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";
import { ORG } from "./site-nav";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Our Focus", to: "/our-focus" },
  { label: "Impact", to: "/impact" },
];

const ACTION_LINKS = [
  { label: "Donate", to: "/donate", accent: true },
  { label: "Volunteer or Partner", to: "/get-involved" },
  { label: "Stories & Updates", to: "/stories" },
  { label: "Contact Us", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white print:hidden">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            GKD-YDI works to empower young people, strengthen communities and advance sustainable
            development across Northeast Nigeria.
          </p>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-yellow uppercase">
            {ORG.motto}
          </p>
        </div>

        <nav aria-label="Footer explore">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {EXPLORE_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-white/75 transition-colors hover:text-yellow"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Take action">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
            Take Action
          </h2>
          <ul className="mt-5 space-y-3">
            {ACTION_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={
                    item.accent
                      ? "inline-flex items-center rounded-sm bg-yellow px-3 py-1.5 text-sm font-bold text-navy-deep transition-colors hover:bg-yellow/85"
                      : "text-sm text-white/75 transition-colors hover:text-yellow"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
            Organisation
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/50">Founded</dt>
              <dd className="mt-1 text-white/85">{ORG.founded}</dd>
            </div>
            <div>
              <dt className="text-white/50">Operating focus</dt>
              <dd className="mt-1 text-white/85">
                {ORG.city}, {ORG.state} — {ORG.region}
              </dd>
            </div>
            <div>
              <dt className="text-white/50">Enquiries</dt>
              <dd className="mt-1">
                <Link to="/contact" className="text-yellow hover:underline">
                  Get in Touch
                </Link>
              </dd>
            </div>
          </dl>
          {/* Social links are intentionally omitted until official accounts are supplied. */}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {ORG.name}. All rights reserved.</p>
          <p>A registered non-governmental organisation working in Northeast Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
