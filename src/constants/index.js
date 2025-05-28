import {
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  blackpink,
  anh,
  fms,
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
    name: "Blackpink Fansite",
    description:
      "A comprehensive university test project showcasing foundational web development skills learned in HTML, CSS, and modern web technologies. This responsive fansite demonstrates clean UI design, interactive elements, and mobile-friendly layouts while celebrating the K-pop group Blackpink. Features include detailed member profiles, complete discography sections, modern CSS animations, smooth navigation systems, and responsive design principles optimized for seamless viewing across all devices and screen sizes.",
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
        name: "responsive",
        color: "green-text-gradient",
      },
    ],
    image: blackpink,
    source_code_link: "https://axlisa.github.io/fansite-blackpink/",
  },
  {
    name: "AnH App & Tetriz Game Collection",
    description:
      "A dual-purpose application combining entertainment and utility features with modern programming techniques. The project includes a classic Tetris game implementation featuring advanced gameplay mechanics, dynamic scoring systems, and intuitive user controls, alongside additional app functionalities. Built to demonstrate game development skills, algorithmic thinking, user interface design, and interactive programming concepts using contemporary web technologies.",
    tags: [
      {
        name: "javascript",
        color: "yellow-text-gradient",
      },
      {
        name: "game-dev",
        color: "pink-text-gradient",
      },
      {
        name: "html5",
        color: "orange-text-gradient",
      },
      {
        name: "css3",
        color: "blue-text-gradient",
      },
    ],
    image: anh,
    source_code_link: "https://github.com/Axlisa/AnH-App-and-Tetriz-Game-App",
  },
  {
    name: "Forensic Management System (FMS)",
    description:
      "Award-winning Final Year Project (2nd Place) - A comprehensive forensic case management system developed for Hospital Sungai Siput (U) Perak using modern web technologies. Features include advanced case tracking, evidence management, detailed report generation, and secure data handling with role-based access control. The system streamlines forensic workflow processes, enhances data security, and provides intuitive interfaces for medical professionals and administrative staff with responsive design implementation.",
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
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "yellow-text-gradient",
      },
    ],
    image: fms,
    source_code_link: "https://github.com/Axlisa",
  },
];

export { services, technologies, experiences, educations, projects };
