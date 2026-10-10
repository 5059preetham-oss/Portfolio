import { About, Blog, Gallery, Home, Person, Social, Work } from "@/types";
import { Row } from "@once-ui-system/core";

const person: Person = {
  firstName: "Preetham",
  lastName: "",
  name: "Preetham",
  role: "Developer",
  avatar: "",
  email: "",
  location: "UTC",
  languages: [],
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
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building useful things for the web</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured project</strong>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} building and learning in public. This portfolio is a work in progress; projects and experience will be added here.
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
        {person.firstName} is a {person.role.toLowerCase()} building and learning in public. This page will be updated with verified experience, education, and skills as the portfolio grows.
      </>
    ),
  },
  work: {
    display: false, // Add verified experience here when ready
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // Add verified education here when ready
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // Add verified skills here when ready
    title: "Technical skills",
    skills: [],
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
