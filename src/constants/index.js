import {
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  project2,
  project3,
  mysql,
  express,
  laravel,
  java,
  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  php,
  nodejs,
  reactjs,
  cplusplus,
  tailwind,
  csharp,
  // Remove testimonial images references
} from '../assets'

// Import Tekisky separately
import mesinkira from "../assets/company/mesinkira.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "study",
    title: "Skills",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Web Developer",
    icon: mobile,
  },
  {
    title: "Software Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Php",
    icon: php,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C#",
    icon: csharp,
  },
];

const experiences = [
  {
    title: "Software Engineer (Intern)",
    company_name: "Mesinkira Sdn Bhd",
    icon: mesinkira,
    iconBg: "#383E56",
    date: "April 2025 - present",
    points: [
      "Developed and maintained backend features using Laravel PHP to support digital financial solutions for MSMEs.",
      "Integrated APIs for card payments (Visa/Mastercard) and e-wallet systems using NFC technology.",
      "Collaborated with the development team to improve business management tools and accounting features.",
      "Assisted in database design and optimization to ensure data accuracy and system performance.",
      "Optimizing API performance through caching strategies, database indexing, and query optimization.Participated in testing, debugging, and deployment processes for internal tools and client-facing services.",
    ],
  },
];

// Replace testimonials with backend projects
const projects = [
  {
    name: "Tekisky Mart API",
    description:
      "A comprehensive RESTful API built with Node.js and Express that powers an e-commerce platform. Features include user authentication, product management, order processing, and payment integration.",
    tags: [
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "express",
        color: "white-text-gradient",
      },
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "jwt",
        color: "blue-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/",
  },
  {
    name: "GearXpert Backend",
    description:
      "A scalable backend system for an automotive parts marketplace with features like inventory management, vendor API integration, and real-time stock updates using WebSockets.",
    tags: [
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "blue-text-gradient",
      },
      {
        name: "redis",
        color: "pink-text-gradient",
      },
      {
        name: "docker",
        color: "blue-text-gradient",
      },
    ],
    image: gearXpert,
    source_code_link: "https://github.com/",
  },
  {
    name: "GoGroove API Gateway",
    description:
      "A microservices API gateway that handles routing, authentication, rate limiting, and load balancing for multiple backend services, enabling a scalable architecture for an e-commerce platform.",
    tags: [
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "express",
        color: "white-text-gradient",
      },
      {
        name: "laravel",
        color: "blue-text-gradient",
      },
      {
        name: "microservices",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };
