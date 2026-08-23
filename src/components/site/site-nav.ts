export type NavItem = { label: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Our Focus", to: "/our-focus" },
  { label: "Impact", to: "/impact" },
  { label: "Media & Updates", to: "/media" },
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
  patron: "Dr. Usman Muhammad Dakasko (Dean, Faculty of Education, Yobe State University)",
} as const;
