import innovatechLogo from "@/assets/partners/innovatech.png";
import yitdaLogo from "@/assets/partners/yitda.png";
import neyifLogo from "@/assets/partners/neyif.png";
import taimakoLogo from "@/assets/partners/taimako-cdi.png";
import abaLogo from "@/assets/partners/aba-academy.png";
import nuyossLogo from "@/assets/partners/nuyoss.png";

export type Partner = {
  id: string;
  name: string;
  category: string;
  logo: string;
  description?: string;
  website?: string;
};

export const PARTNERS: Partner[] = [
  {
    id: "yitda",
    name: "Yobe State Information Technology Development Agency (YITDA)",
    category: "Government & ICT Partner",
    logo: yitdaLogo,
    description:
      "State agency advancing digital inclusion, ICT literacy, and technology empowerment in Yobe.",
  },
  {
    id: "innovatech",
    name: "InnovaTech Consultancy Limited",
    category: "Technology & Cyber Resilience",
    logo: innovatechLogo,
    description:
      "Strategic partner for modern web systems, digital security, and youth tech incubation.",
  },
  {
    id: "neyif",
    name: "North East Youth Initiative for Development (NEYIF)",
    category: "Youth Leadership & Peacebuilding",
    logo: neyifLogo,
    description:
      "Empowering youth-led community actions, peacebuilding, and civic engagement across Northeast Nigeria.",
  },
  {
    id: "taimako-cdi",
    name: "Taimako Community Development Initiative (TAIMAKO-CDI)",
    category: "Community Development & Livelihoods",
    logo: taimakoLogo,
    description:
      "Grassroots initiative dedicated to community resilience, household empowerment, and self-reliance.",
  },
  {
    id: "aba-academy",
    name: "A B.A Academy",
    category: "Educational Excellence & Mentorship",
    logo: abaLogo,
    description:
      "Committed to high academic standards, youth mentorship, and foundational learning.",
  },
  {
    id: "nuyoss",
    name: "National Union of Yobe State Students (NUYOSS)",
    category: "Student Union & Youth Advocacy",
    logo: nuyossLogo,
    description:
      "Apex student body championing student welfare, education for development, and youth mobilization.",
  },
];

