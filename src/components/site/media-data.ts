import patronImg1 from "@/assets/media/patron-dakasko-advisory-1.jpg";
import patronImg2 from "@/assets/media/patron-dakasko-advisory-2.jpg";
import neyifImg from "@/assets/media/neyif-collaboration-meeting.jpg";
import ycaCbtImg from "@/assets/media/yobe-children-academy-cbt.jpg";
import innovatechImg from "@/assets/media/innovatech-courtesy-visit-dutse.jpg";
import studentsCbtImg from "@/assets/media/female-students-cbt-prep-damaturu.jpg";
import sdgGoalsImg from "@/assets/sdg-goals-transparent.png";

export type KeyPoint = {
  title: string;
  description: string;
};

export type MediaItem = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  formattedDate: string;
  category:
    | "Official Announcement"
    | "Advisory & Leadership"
    | "Education & Skills"
    | "Technology & Innovation"
    | "Field Updates";
  categoryColor: "yellow" | "ocean" | "growth" | "navy";
  summary: string;
  content: string[];
  keyPointsHeading: string;
  keyPoints: KeyPoint[];
  closingNote?: string;
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  featured?: boolean;
  location: string;
  tags: string[];
};

export const MEDIA_UPDATES: MediaItem[] = [
  {
    id: "patron-appointment-dr-dakasko",
    slug: "patron-appointment-dr-usman-muhammad-dakasko",
    title: "Dr. Usman Muhammad Dakasko Appointed as Patron of GKD – Youth Development Initiative",
    subtitle:
      "Dean of Faculty of Education at Yobe State University provides strategic leadership and advisory direction.",
    date: "2025-12-23",
    formattedDate: "December 23, 2025",
    category: "Advisory & Leadership",
    categoryColor: "yellow",
    featured: true,
    location: "Yobe State University, Damaturu",
    tags: ["Patron", "Leadership", "Advisory", "Governance", "YSU"],
    summary:
      "It is a profound honor to introduce Dr. Usman Muhammad Dakasko, Dean of the Faculty of Education at Yobe State University, as the Patron of the GKD – Youth Development Initiative.",
    content: [
      "It is a profound honor to introduce Dr. Usman Muhammad Dakasko, Dean of the Faculty of Education at Yobe State University, as the Patron of the GKD – Youth Development Initiative.",
      "During a courtesy visit and advisory session on December 23rd, 2025, our leadership team engaged Dr. Dakasko on mission alignment, team cohesion, and strategic growth. His vast academic experience, regional insight, and commitment to human capital development provide invaluable guidance to our organization as we expand our youth empowerment programmes across Northeast Nigeria.",
      "We are deeply grateful for Dr. Dakasko’s guidance as we strengthen our strategy to build resilient communities and empower the next generation.",
    ],
    keyPointsHeading: "Key Takeaways",
    keyPoints: [
      {
        title: "Strategic Growth",
        description: "Enhancing organizational vision, governance, and community reach.",
      },
      {
        title: "Ethical Leadership",
        description: "Instilling discipline, accountability, and professional standards.",
      },
      {
        title: "Historical Context",
        description:
          "Applying lessons from Northern Nigeria’s history to drive regional reintegration.",
      },
      {
        title: "Nation Building",
        description: "Empowering youth to actively drive sustainable national progress.",
      },
    ],
    closingNote:
      "We are deeply grateful for Dr. Dakasko’s guidance as we strengthen our strategy to build resilient communities and empower the next generation.",
    images: [
      {
        src: patronImg1,
        alt: "Dr. Usman Muhammad Dakasko presiding over the GKD-YDI advisory session",
        caption:
          "Dr. Usman Muhammad Dakasko engaging with the GKD-YDI leadership team during the advisory session at Yobe State University.",
      },
      {
        src: patronImg2,
        alt: "GKD-YDI leadership team reviewing strategic materials during the patron session",
        caption:
          "The GKD-YDI leadership team reviewing organizational strategy and operational priorities during the advisory dialogue.",
      },
    ],
  },
  {
    id: "innovatech-courtesy-visit-dutse",
    slug: "strategic-engagement-web-management-online-safety-innovatech",
    title:
      "GKD-YDI Pays Strategic Courtesy Visit to InnovaTech Headquarters in Dutse, Jigawa State",
    subtitle:
      "Leadership delegation engages InnovaTech CEO Abdullahi Bala Musa on enterprise web management, data privacy, and digital safety frameworks.",
    date: "2026-04-18",
    formattedDate: "April 18, 2026",
    category: "Technology & Innovation",
    categoryColor: "ocean",
    featured: false,
    location: "InnovaTech Headquarters, Dutse, Jigawa State",
    tags: [
      "InnovaTech",
      "Digital Safety",
      "Cybersecurity",
      "Web Architecture",
      "Partnership",
      "Jigawa State",
    ],
    summary:
      "On April 18, 2026, the leadership of GKD – Youth Development Initiative paid an official courtesy visit to the headquarters of InnovaTech Consultancy Limited in Dutse, Jigawa State, engaging in high-level strategic bilateral discussions with the Managing Director and Chief Executive Officer, Mr. Abdullahi Bala Musa, on modern web governance and digital safety.",
    content: [
      "On April 18, 2026, the leadership delegation of the GKD – Youth Development Initiative paid an official courtesy visit to the headquarters of InnovaTech Consultancy Limited in Dutse, Jigawa State, engaging in high-level strategic bilateral discussions with the Managing Director and Chief Executive Officer, Mr. Abdullahi Bala Musa.",
      "The dialogue centered on contemporary web governance, enterprise architecture, and robust digital safety frameworks. Underpinning this collaborative engagement is a shared commitment to establishing a secure, state-of-the-art digital ecosystem that fortifies our technological infrastructure while safeguarding the confidentiality and data privacy of the grassroots communities we serve across Northern Nigeria.",
    ],
    keyPointsHeading: "Key Strategic Focus Areas",
    keyPoints: [
      {
        title: "Enterprise Web Architecture",
        description:
          "Deploying scalable, modern web infrastructure and intuitive platform management systems to enhance operational agility.",
      },
      {
        title: "Digital Safety & Privacy",
        description:
          "Implementing advanced data protection protocols and online safeguarding measures to protect community stakeholders and beneficiaries.",
      },
      {
        title: "Strategic Tech Collaboration",
        description:
          "Fostering cross-state technology partnerships across Northern Nigeria to accelerate digital transformation and youth-driven innovation.",
      },
    ],
    closingNote:
      "By forging strategic alliances with premier technology consultancies, GKD-YDI continues to build resilient, secure, and modern digital pathways for community transformation.",
    images: [
      {
        src: innovatechImg,
        alt: "GKD-YDI leadership with Abdullahi Bala Musa, CEO of InnovaTech Consultancy Limited in Dutse, Jigawa State",
        caption:
          "GKD-YDI leadership during the official courtesy visit and strategic partnership dialogue at the InnovaTech Consultancy Limited headquarters in Dutse, Jigawa State on April 18th, 2026.",
      },
    ],
  },
  {
    id: "cbt-digital-exam-readiness-yca",
    slug: "strategic-collaboration-digital-exam-readiness-yca",
    title: "Strategic Collaboration for Digital Exam Readiness with Yobe Children’s Academy",
    subtitle:
      "GKD-YDI establishes strategic partnership to deploy CBT assessment software and hands-on digital skills training.",
    date: "2026-03-29",
    formattedDate: "March 29, 2026",
    category: "Education & Skills",
    categoryColor: "growth",
    featured: false,
    location: "Yobe Children’s Academy, Damaturu",
    tags: ["CBT", "Digital Literacy", "JAMB", "Exam Readiness", "YCA", "Education"],
    summary:
      "On March 29, 2026, the leadership of the GKD – Youth Development Initiative convened with the executive management of Yobe Children’s Academy to establish a strategic partnership centered on digital literacy and Computer-Based Test (CBT) preparation.",
    content: [
      "On March 29, 2026, the leadership of the GKD – Youth Development Initiative convened with the executive management of Yobe Children’s Academy to establish a strategic partnership centered on digital literacy and Computer-Based Test (CBT) preparation.",
      "This initiative expands access to modern educational technology and practical computer navigation modules, empowering local public school students with the confidence and tools required for competitive exam performance.",
    ],
    keyPointsHeading: "Key Operational Objectives",
    keyPoints: [
      {
        title: "Infrastructure Deployment",
        description:
          "Successful installation and optimization of specialized CBT assessment software.",
      },
      {
        title: "Practical Capacity Building",
        description:
          "Delivery of practical, hands-on computer navigation modules to prepare beneficiaries for the upcoming JAMB examinations.",
      },
      {
        title: "Institutional Alignment",
        description:
          "Expanding access to modern educational technology for public school candidates across the region.",
      },
    ],
    closingNote:
      "By integrating digital infrastructure with practical training, GKD-YDI ensures candidates are fully prepared for electronic examination standards.",
    images: [
      {
        src: ycaCbtImg,
        alt: "GKD-YDI team member deploying CBT examination software on a laptop",
        caption:
          "GKD-YDI team member configuring specialized Computer-Based Test (CBT) assessment software during the digital exam readiness rollout at Yobe Children’s Academy.",
      },
    ],
  },
  {
    id: "gkd-intensive-exam-prep-program-damaturu",
    slug: "gkd-launches-three-month-intensive-exam-prep-damaturu",
    title: "Launch of Intensive 3-Month Exam Prep Program for 50+ Top Scholars in Damaturu",
    subtitle:
      "Free classroom tutoring and Computer-Based Test (CBT) training for JAMB, WAEC, and NECO across Government Day Secondary Schools.",
    date: "2026-02-08",
    formattedDate: "February 8, 2026",
    category: "Education & Skills",
    categoryColor: "growth",
    featured: false,
    location: "Damaturu, Yobe State",
    tags: ["JAMB", "WAEC", "NECO", "CBT", "Scholarships", "PublicSchools", "Damaturu", "Education"],
    summary:
      "On February 8, 2026, the GKD Youth Development Initiative successfully launched an intensive three-month exam preparation program to support over 50 top-performing students from Government Day Secondary Schools across Damaturu, Yobe State.",
    content: [
      "On February 8, 2026, the GKD Youth Development Initiative successfully launched an intensive three-month exam preparation program to support over 50 top-performing students from Government Day Secondary Schools across Damaturu, Yobe State.",
      "Designed to help scholars secure admission into tertiary institutions, the program provides comprehensive classroom tutoring and computer-based test (CBT) training for the JAMB, WAEC, and NECO examinations.",
      "Classes hold every Friday and Saturday at 2:00 PM under continuous supervision, with all participants receiving a Certificate of Participation upon completion.",
    ],
    keyPointsHeading: "Program Highlights & Structure",
    keyPoints: [
      {
        title: "Target Cohort",
        description:
          "Targeted support for over 50 top-performing scholars from Government Day Secondary Schools across Damaturu.",
      },
      {
        title: "Holistic Curricula",
        description:
          "Comprehensive subject tutoring combined with hands-on computer-based test (CBT) simulation modules.",
      },
      {
        title: "Supervised Schedule",
        description:
          "Structured intensive weekend classes holding every Friday and Saturday at 2:00 PM under dedicated supervision.",
      },
      {
        title: "Certification & Pathways",
        description:
          "Formal Certificate of Participation awarded upon completion alongside tertiary admission guidance.",
      },
    ],
    closingNote:
      "By equipping our top students with academic knowledge, computer literacy, and examination resilience, GKD-YDI is actively cultivating the next generation of academic leaders in Yobe State.",
    images: [
      {
        src: studentsCbtImg,
        alt: "Secondary school students in Damaturu undergoing CBT exam practice",
        caption:
          "Public school scholars in Damaturu participating in hands-on computer-based test (CBT) preparation for JAMB, WAEC, and NECO during GKD-YDI's three-month intensive tutorial program.",
      },
    ],
  },
  {
    id: "neyif-strategic-partnership-tutorials",
    slug: "neyif-collaboration-free-jamb-waec-neco-tutorials",
    title: "Strategic Meeting with NEYIF to Review Free JAMB, WAEC & NECO Tutorial Programs",
    subtitle:
      "GKD-YDI leadership convenes with North East Youth Initiative For Development in Damaturu to advance public school student support.",
    date: "2026-02-09",
    formattedDate: "February 9, 2026",
    category: "Education & Skills",
    categoryColor: "ocean",
    featured: false,
    location: "NEYIF Office, Damaturu, Yobe State",
    tags: ["Education", "JAMB", "WAEC", "NECO", "Tutorials", "NEYIF", "Partnership"],
    summary:
      "On February 9th, 2026, the GKD – Youth Development Initiative met with the team at the North East Youth Initiative For Development (NEYIF) office in Damaturu. Together, we reviewed key strategies to navigate challenges in delivering our free JAMB, WAEC, and NECO tutorial programs for public school students across the community.",
    content: [
      "On February 9th, 2026, the GKD – Youth Development Initiative met with the team at the North East Youth Initiative For Development (NEYIF) office in Damaturu.",
      "Together, we reviewed key strategies to navigate challenges in delivering our free JAMB, WAEC, and NECO tutorial programs for public school students across the community.",
    ],
    keyPointsHeading: "Key Focus Areas",
    keyPoints: [
      {
        title: "Exam Readiness",
        description:
          "Equipping local students with critical tools and confidence for academic success.",
      },
      {
        title: "Overcoming Barriers",
        description: "Identifying operational solutions to ensure uninterrupted learning.",
      },
      {
        title: "Strategic Collaboration",
        description: "Partnering with key stakeholders to foster educational equity.",
      },
    ],
    closingNote:
      "Our continuous collaboration with regional youth bodies reinforces our dedication to educational access and youth development in Yobe State.",
    images: [
      {
        src: neyifImg,
        alt: "GKD-YDI and NEYIF team meeting in Damaturu",
        caption:
          "GKD-YDI leadership in strategic consultation at the NEYIF office in Damaturu on February 9th, 2026.",
      },
    ],
  },
  {
    id: "un-sdgs-alignment-framework",
    slug: "vision-mission-aligned-to-united-nations-sdgs",
    title: "Our Vision and Mission are Aligned to the United Nations Sustainable Development Goals",
    subtitle:
      "GKD-YDI's programmatic roadmap directly advances the UN 2030 Agenda for Sustainable Development across Northeast Nigeria.",
    date: "2026-01-15",
    formattedDate: "January 15, 2026",
    category: "Official Announcement",
    categoryColor: "yellow",
    featured: false,
    location: "Damaturu, Yobe State",
    tags: [
      "UNSDGs",
      "GlobalGoals",
      "QualityEducation",
      "CleanWater",
      "GenderEquality",
      "DecentWork",
      "Partnerships",
    ],
    summary:
      "OUR VISION AND MISSION ARE ALIGNED TO THE UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS! GKD-YDI's programmatic roadmap directly advances the 2030 Agenda for Sustainable Development across Northeast Nigeria.",
    content: [
      "OUR VISION AND MISSION ARE ALIGNED TO THE UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS!",
      "GKD-YDI is dedicated to creating long-term, measurable impact across Northeast Nigeria. By grounding our mission in the United Nations 2030 Agenda for Sustainable Development, we align local community interventions with globally recognized standards for human progress, equity, and sustainability.",
      "From empowering 10,000 youth with practical education and livelihood skills, to providing 5,000 young women with leadership tools, and expanding clean water access to 50 communities, our work directly contributes to building a healthier, more prosperous future.",
    ],
    keyPointsHeading: "Core SDG Alignments",
    keyPoints: [
      {
        title: "SDG 4: Quality Education",
        description:
          "Free JAMB, WAEC, and NECO tutorial programs, digital CBT training, and foundational literacy initiatives for public school students.",
      },
      {
        title: "SDG 5: Gender Equality",
        description:
          "Targeted empowerment of 5,000 young women through leadership incubation, vocational agency, and digital skills.",
      },
      {
        title: "SDG 6: Clean Water & Sanitation",
        description:
          "Improving sustainable access to clean drinking water, sanitation facilities, and hygiene education across 50 communities.",
      },
      {
        title: "SDG 8: Decent Work & Economic Growth",
        description:
          "Vocational skill-building and entrepreneurship pathways ensuring 10,000 youth attain sustainable economic livelihoods.",
      },
      {
        title: "SDG 17: Partnerships for the Goals",
        description:
          "Forging multi-stakeholder partnerships with academic institutions, youth organizations, and technology consultancies.",
      },
    ],
    closingNote:
      "Through targeted local execution aligned with global sustainable goals, GKD-YDI continues to drive transformative change across Yobe State and the wider Northeast region.",
    images: [
      {
        src: sdgGoalsImg,
        alt: "United Nations Sustainable Development Goals Framework",
        caption:
          "United Nations Sustainable Development Goals (SDGs) — The global 2030 development framework guiding GKD-YDI's vision, mission, and community interventions.",
      },
    ],
  },
];

export const MEDIA_CATEGORIES = [
  "All",
  "Advisory & Leadership",
  "Education & Skills",
  "Technology & Innovation",
  "Official Announcement",
  "Field Updates",
] as const;
