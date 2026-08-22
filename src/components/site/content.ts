import {
  Droplets,
  GraduationCap,
  HandHeart,
  Handshake,
  Leaf,
  Lightbulb,
  Megaphone,
  ScaleIcon,
  Sprout,
  Users,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const MISSION =
  "To empower 10,000 youth in the northeast of Nigeria over the next 5 years by providing education, skills development, and leadership training, ensuring they are equipped for sustainable livelihoods. We are committed to improving access to clean water, sanitation, and hygiene in 50 communities, while also empowering 5,000 young women with the tools to become leaders and change agents. Through innovative and community-driven initiatives, we aim to create a generation of resilient, skilled youth capable of driving social, economic, and environmental transformation across the region.";

export const VISION =
  "To be a pioneering force in youth empowerment, community development, and environmental sustainability in Nigeria. By 2030, we envision a future where 10,000 empowered youth, including 5,000 young women, are equipped with essential skills for sustainable livelihoods, and where 50 communities have improved access to clean water, sanitation, and hygiene. Our goal is to foster a generation of leaders who will contribute to the prosperity and well-being of their communities, driving social progress and ensuring a cleaner, healthier future for all.";

export type FocusArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "yellow" | "ocean" | "growth";
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Youth Empowerment",
    description:
      "Education, skills development and opportunities that help young people build sustainable livelihoods.",
    icon: Users,
    accent: "yellow",
  },
  {
    title: "Skills & Education",
    description:
      "Supporting young people with practical knowledge and skills that can improve their economic opportunities.",
    icon: GraduationCap,
    accent: "ocean",
  },
  {
    title: "Leadership Development",
    description:
      "Preparing young people, particularly young women, to become leaders and positive change agents.",
    icon: Sprout,
    accent: "growth",
  },
  {
    title: "Women & Girls Empowerment",
    description:
      "Working toward the empowerment of 5,000 young women with tools and opportunities for leadership and transformation.",
    icon: UsersRound,
    accent: "yellow",
  },
  {
    title: "Water, Sanitation & Hygiene",
    description:
      "Improving access to clean water, sanitation and hygiene across 50 communities.",
    icon: Droplets,
    accent: "ocean",
  },
  {
    title: "Community Development",
    description:
      "Supporting innovative, community-driven approaches to sustainable social and economic development.",
    icon: Wrench,
    accent: "growth",
  },
];

export type Value = { title: string; description: string; icon: LucideIcon };

export const CORE_VALUES: Value[] = [
  {
    title: "Youth Empowerment",
    description:
      "Young people hold the capability to change their own circumstances. Our work exists to widen what is possible for them.",
    icon: Users,
  },
  {
    title: "Community Development",
    description:
      "Lasting progress is built with communities, guided by the priorities they set for themselves.",
    icon: HandHeart,
  },
  {
    title: "Integrity & Transparency",
    description:
      "We hold ourselves accountable for what we commit to, and we report honestly on what we achieve.",
    icon: ScaleIcon,
  },
  {
    title: "Sustainability",
    description:
      "Initiatives are designed to keep delivering value long after the first intervention ends.",
    icon: Leaf,
  },
  {
    title: "Innovation",
    description:
      "We apply practical, locally grounded thinking to challenges that conventional approaches have not solved.",
    icon: Lightbulb,
  },
];

export type Principle = { title: string; description: string };

export const APPROACH: Principle[] = [
  {
    title: "Community-Driven",
    description: "Solutions should respond to real community needs.",
  },
  {
    title: "Youth-Centered",
    description: "Young people should be active participants in development.",
  },
  {
    title: "Inclusive",
    description: "Young women and underserved groups should have meaningful opportunities.",
  },
  {
    title: "Sustainable",
    description: "Initiatives should create long-term value.",
  },
  {
    title: "Innovative",
    description: "Use practical and innovative approaches to solve local challenges.",
  },
];

export type Pathway = {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
};

export const PATHWAYS: Pathway[] = [
  {
    title: "Volunteer",
    description: "Join GKD-YDI's community and youth development efforts.",
    icon: HandHeart,
    action: "Register your interest",
  },
  {
    title: "Partner",
    description: "Explore collaboration opportunities.",
    icon: Handshake,
    action: "Start a conversation",
  },
  {
    title: "Support",
    description: "Support initiatives that contribute to youth and community development.",
    icon: Sprout,
    action: "Enquire about support",
  },
  {
    title: "Advocate",
    description: "Help amplify youth empowerment and community development.",
    icon: Megaphone,
    action: "Amplify our work",
  },
];
