export type NavItem = { label: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Our Focus", to: "/our-focus" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "Contact", to: "/contact" },
];

export const ORG = {
  name: "Gidan Karan Dawa Youth Development Initiatives",
  short: "GKD-YDI",
  motto: "Empowering Youth, Building Futures",
  founded: "17 September 2025",
  region: "Northeast Nigeria",
  state: "Yobe State",
  city: "Damaturu",
} as const;
