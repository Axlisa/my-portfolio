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
    id: "study",
    title: "Study",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
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
    title: "Frontend Developer", 
    icon: web,
  },
  {
    title: "Full-Stack Developer",
    icon: mobile,
  },
  {
    title: "Software Engineer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "JavaScript",
    icon: javascript,
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
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "C#",
    icon: csharp,
  },
  {
    name: "Git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Software Engineer (Intern)",
    company_name: "Mesinkira Sdn Bhd",
    icon: mesinkira,
    iconBg: "#383E56",
    date: "April 2025 - Present",
    points: [
      "Developing and maintaining backend features using Laravel PHP framework to support digital financial solutions for MSMEs (Micro, Small & Medium Enterprises).",
      "Integrating secure payment APIs for card payments (Visa/Mastercard) and e-wallet systems utilizing NFC technology for seamless transactions.",
      "Collaborating with cross-functional development team to enhance business management tools and automated accounting features.",
      "Designing and optimizing database schemas to ensure data accuracy, system performance, and scalability for growing user base.",
      "Implementing API performance optimization through strategic caching, database indexing, and advanced query optimization techniques.",
      "Participating in comprehensive testing, debugging, and deployment processes for both internal tools and client-facing services.",
      "Contributing to code reviews and following industry best practices for secure, maintainable, and scalable software development.",
    ],
  },
];

const educations = [
  {
    title: "Bachelor of Computer Science (Hons)",
    company_name: "Universiti Selangor (UNISEL)",
    icon: web, // You'll need to add UNISEL logo to assets
    iconBg: "#E6DEDD",
    date: "2022 - Present",
    points: [
      "Currently pursuing Bachelor's degree with specialization in Software Engineering and full-stack web development.",
      "Achieved 2nd place in Final Year Project (FYP) for developing Forensic Management System (FMS) for Hospital Sungai Siput (U) Perak.",
      "Participated in international study tour - Digital Economy, Art & Technology Program at Xiangsihu College, Guangxi Minzu University, China (2024).",
      "Served as Program Director for Canva: Inspire & Design Bootcamp at Sek.Men. Pengkalan Permatang, Kuala Selangor (2024).",
      "Active as Team Coordinator for Computing Day Teknosfera: Explore The World Of Computing at UNISEL (2024).",
      "Gained hands-on experience in modern development frameworks including Laravel, JavaScript, and database management systems.",
    ],
  },
  {
    title: "Foundation in Information Technology",
    company_name: "Universiti Selangor (UNISEL)",
    icon: web, // You'll need to add UNISEL logo to assets
    iconBg: "#383E56",
    date: "2021 - 2022",
    points: [
      "Built comprehensive foundation in Information Technology covering programming fundamentals and system analysis.",
      "Introduced to core computing concepts including database design, web development, and software engineering principles.",
      "Developed strong analytical and problem-solving skills through various IT-focused coursework and projects.",
      "Participated in foundational programming courses covering HTML, CSS, JavaScript, and basic database management.",
      "Successfully completed foundation requirements with strong academic performance to progress to degree program.",
      "Gained initial exposure to industry-standard development tools and methodologies.",
    ],
  },
  {
    title: "Malaysian Certificate of Education (SPM)",
    company_name: "SMK Tok Muda Abdul Aziz",
    icon: mobile, // You can replace with school logo
    iconBg: "#E6DEDD",
    date: "2021",
    points: [
      "Achieved excellent results with grades 3A 3B 1C, demonstrating strong academic performance across core subjects.",
      "Developed foundational programming skills and created an online cinema ticket booking system using Scratch, HTML, and CSS.",
      "Built strong foundation in Mathematics and Additional Mathematics, essential for logical thinking and problem-solving in programming.",
      "Participated in computer science clubs and technology-related extracurricular activities to explore programming interests.",
      "Engaged in collaborative projects that developed teamwork and communication skills essential for software development.",
      "Demonstrated early passion for technology through self-directed learning in web development and basic programming concepts.",
    ],
  },
];

// Replace testimonials with backend projects
const projects = [
  {
    name: "Forensic Management System (FMS)",
    description:
      "Award-winning Final Year Project (2nd Place) - A comprehensive forensic case management system developed for Hospital Sungai Siput (U) Perak. Features include case tracking, evidence management, report generation, and secure data handling with role-based access control.",
    tags: [
      {
        name: "laravel",
        color: "red-text-gradient",
      },
      {
        name: "php",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "green-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/Axlisa",
  },
  {
    name: "Cinema Ticket Booking System",
    description:
      "Online cinema ticket booking system developed during secondary school using fundamental web technologies. Features include movie selection, seat booking interface, and basic payment simulation - showcasing early programming skills and passion for web development.",
    tags: [
      {
        name: "html",
        color: "orange-text-gradient",
      },
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "scratch",
        color: "pink-text-gradient",
      },
      {
        name: "javascript",
        color: "yellow-text-gradient",
      },
    ],
    image: gearXpert,
    source_code_link: "https://github.com/Axlisa",
  },
  {
    name: "Digital Literacy Workshop Platform",
    description:
      "Educational platform and workshop management system developed for conducting HTML workshops for primary and secondary school students. Includes interactive tutorials, progress tracking, and resource management for effective digital literacy education.",
    tags: [
      {
        name: "html",
        color: "orange-text-gradient",
      },
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "yellow-text-gradient",
      },
      {
        name: "education",
        color: "green-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/Axlisa",
  },
];

export { services, technologies, experiences, educations, projects };
