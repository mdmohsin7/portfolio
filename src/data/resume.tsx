import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FileTextIcon } from "lucide-react";

export const DATA = {
  name: "Mohsin Mohammed",
  initials: "MM",
  url: "https://mohsin.xyz",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Founding Engineer at Omi AI. Flutter & Full Stack Developer passionate about AI, mobile development, and open source. Currently building the future of wearable AI.",
  summary:
    "I'm a Founding Engineer at [Omi AI](https://omi.me), building the future of wearable AI. I've shipped products used by **100,000+ users**, architected systems that reduced response times by **75%**, and created a Flutter course with **14,000+ students** (4.9★ rating). I love reverse-engineering protocols, optimizing performance, and turning complex problems into elegant solutions. When I'm not coding, you'll find me writing about my engineering adventures on my blog.",
  avatarUrl: "/me.webp",
  skills: [
    "Flutter",
    "Dart",
    "Go",
    "Python",
    "Swift",
    "TypeScript",
    "JavaScript",
    "C++",
    "Java",
    "HTML/CSS",
    "Firebase",
    "Docker",
    "Redis",
    "MongoDB",
    "OpenAI",
    "LangChain",
    "NextJS",
    "FastAPI",
    "Spring Boot"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "https://drive.google.com/file/d/1x6qlLVfa8Cv09lolzEB5d6RZGaCg1dkf/view", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "mohsin.lp710@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mdmohsin7",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/mohsinxyz",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/mohsinxyz_",
        icon: Icons.x,

        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "mailto:mohsin.lp710@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Omi AI",
      href: "https://omi.me",
      badges: [],
      location: "San Francisco (Hybrid)",
      title: "Founding Engineer",
      logoUrl: "/omi.webp",
      start: "Jun 2024",
      end: "Present",
      description:
        "Shaped product vision and executed across backend, support, and product design. Refactored entire codebase using Provider for better maintainability. Designed and developed App Store infrastructure powering 1M+ app uses and hosting 4,000+ apps. Developed native macOS audio pipeline and Omi Apple Watch app. Implemented improvements to STT, WAL, search, and AI persona features.",
    },
    {
      company: "Google Summer of Code (AOSSIE)",
      badges: [],
      href: "https://summerofcode.withgoogle.com",
      location: "Remote",
      title: "Flutter Developer",
      logoUrl: "/gsoc.png",
      start: "Jun 2024",
      end: "Aug 2024",
      description:
        "Developed Desktop and Web version of an AR integrated Social Media Platform. Utilized BLoC for State Management with Domain Driven Design Approach. Made the UI responsive to work on devices with all types of resolutions.",
    },
    {
      company: "Cattleguru",
      href: "https://cattleguru.in",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/cattleguru.webp",
      start: "May 2023",
      end: "June 2024",
      description:
        "Led product design and development, collaborating with CEO and COO. Implemented multi-layered caching strategies with Redis reducing response time from 9-12s to 2-3s. Managed development of both Flutter apps serving 5000+ users. Migrated API service from Spring Boot to Go, reducing memory footprint from 400MB to 20MB.",
    },
    {
      company: "RentOk (EazyPG)",
      href: "https://eazypg.in",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/eazypg.avif",
      start: "Feb 2022",
      end: "Aug 2022",
      description:
        "Led migration of consumer app from native to Flutter using MVP architecture, resulting in 90% performance improvement on iOS. Revamped UI for version 2.0 used by 100,000+ users. Expanded payment capabilities and integrated Firebase services",
    },
  ],
  education: [
    {
      school: "Nawab Shah Alam Khan College of Engineering and Technology",
      href: "https://nsakcet.ac.in",
      degree: "Bachelor of Engineering in Information Technology",
      logoUrl: "/nsakcet.png",
      start: "2019",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: {
    participant: [
      {
        title: "HackRevolution",
        dates: "January 2025",
        location: "Hyderabad, India",
        description:
          "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
        image:
          "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
        mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
        links: [],
      },
    ],
    mentor: [
      {
        title: "Hackcelerate",
        dates: "May 2025",
        location: "Hyderabad, India",
        description:
          "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
        image:
          "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
        mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
        links: [],
      },
    ],
    judge: [
      {
        title: "Spark! Hackathon",
        dates: "October 2024",
        location: "Boston, MA (Remote Judge)",
        description:
          "Evaluated projects on innovation, technical execution, and impact; provided detailed feedback to finalists.",
        image:
          "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
        links: [],
      },
    ],
  },
} as const;
