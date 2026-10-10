import { About, Blog, Gallery, Home, Person, Social, Work } from "@/types";
import { Row } from "@once-ui-system/core";

const person: Person = {
  firstName: "Preetham",
  lastName: "S",
  name: "Preetham S",
  role: "Student",
  avatar: "",
  email: "5059preetham@gmail.com",
  location: "UTC",
  languages: ["English"],
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/5059preetham-oss",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/preetham-s-3a7947367",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Learning by building with code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Personal portfolio website</strong>
      </Row>
    ),
    href: "/work/portfolio-website",
  },
  subline: (
    <>
      I'm {person.name}, a second-year student at PES University exploring game development, 3D modeling, and programming.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.name} is a second-year PES University student exploring game
        development with Unity, 3D modeling with Blender, and programming in C
        and Python. This portfolio documents learning projects and progress
        rather than professional experience.
      </>
    ),
  },
  work: {
    display: true,
    title: "Professional experience",
    experiences: [
      {
        company: "No professional experience yet",
        timeframe: "Current",
        role: "Student developer",
        achievements: [
          <>Currently focused on coursework and self-directed learning.</>,
          <>Building a foundation in Unity, Blender, C, and Python.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "PES University",
        description: <>Currently in the second year of undergraduate study.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills and learning areas",
    skills: [
      {
        title: "Game development",
        description: <>Learning to build interactive experiences with Unity.</>,
        tags: [{ name: "Unity" }],
        images: [],
      },
      {
        title: "3D modeling",
        description: <>Exploring 3D modeling workflows and asset creation with Blender.</>,
        tags: [{ name: "Blender" }],
        images: [],
      },
      {
        title: "Programming",
        description: <>Practicing problem solving and programming with C and Python.</>,
        tags: [{ name: "C" }, { name: "Python" }],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, home, about, blog, work, gallery };
