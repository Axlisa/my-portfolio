import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Define skills and education data
const skills = [
  {
    title: "Programming Languages",
    items: [
      { name: "PHP", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "Java", proficiency: 80 },
      { name: "C++", proficiency: 80 },
      { name: "C#", proficiency: 75 },
      { name: "Python", proficiency: 70 },
    ]
  },
  {
    title: "Web Development & Frameworks",
    items: [
      { name: "Laravel Framework (PHP MVC)", proficiency: 90 },
      { name: "HTML5", proficiency: 95 },
      { name: "CSS3", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 85 },
      { name: "React.js", proficiency: 75 },
      { name: "Responsive Design", proficiency: 90 },
    ]
  },
  {
    title: "Database Management",
    items: [
      { name: "MySQL", proficiency: 90 },
      { name: "phpMyAdmin", proficiency: 85 },
      { name: "SQLite", proficiency: 80 },
      { name: "SQL Server", proficiency: 75 },
      { name: "Database Design & Optimization", proficiency: 85 },
      { name: "Query Development", proficiency: 80 },
    ]
  },
  {
    title: "Development Tools & Technologies",
    items: [
      { name: "Visual Studio Code/Community", proficiency: 90 },
      { name: "Android Studio", proficiency: 75 },
      { name: "Git/GitHub", proficiency: 85 },
      { name: "Version Control & Project Management", proficiency: 85 },
      { name: "Mobile Development", proficiency: 70 },
      { name: "System Design & Problem Solving", proficiency: 80 },
    ]
  }
];

const personalSkills = [
  {
    title: "Leadership & Management",
    items: [
      { name: "Team Management", proficiency: 85 },
      { name: "Program Direction", proficiency: 80 },
      { name: "Cross-functional Coordination", proficiency: 85 },
      { name: "Project Management", proficiency: 80 },
      { name: "Time & Resource Coordination", proficiency: 85 },
      { name: "Mentorship & Student Guidance", proficiency: 80 },
    ]
  },
  {
    title: "Communication & Adaptability",
    items: [
      { name: "Public Speaking", proficiency: 80 },
      { name: "Workshop Facilitation", proficiency: 85 },
      { name: "Cross-cultural Communication", proficiency: 75 },
      { name: "Multilingual Proficiency", proficiency: 90 },
      { name: "Work Adaptability", proficiency: 85 },
      { name: "Technology Adaptation", proficiency: 80 },
    ]
  },
  {
    title: "Professional Skills",
    items: [
      { name: "Problem-Solving & Innovation", proficiency: 85 },
      { name: "Quick Learning", proficiency: 90 },
      { name: "Professional Reliability", proficiency: 95 },
      { name: "Quality Delivery", proficiency: 85 },
      { name: "Independent Work", proficiency: 80 },
      { name: "Team Collaboration", proficiency: 85 },
    ]
  }
];

const interests = [
  {
    title: "Web Development & Database Design",
    description: "Passionate about creating efficient, scalable web applications and designing optimized database architectures for complex systems.",
  },
  {
    title: "Software & Mobile Development",
    description: "Enthusiastic about developing cross-platform applications and exploring mobile development technologies for Android and iOS platforms.",
  },
  {
    title: "Open Source Development", 
    description: "Active interest in contributing to open source projects and leveraging collaborative development practices for community-driven solutions.",
  },
  {
    title: "Technology Innovation & Emerging Trends",
    description: "Continuously exploring cutting-edge technologies, AI integration, and emerging development frameworks to stay current with industry evolution.",
  },
];

const certifications = [
  {
    title: "FYP (2nd Place) - Forensic Management System",
    issuer: "Universiti Selangor (UNISEL)",
    date: "2025",
    description: "Successfully completed Forensic Management System (FMS) project for Hospital Sungai Siput (U) Perak, achieving 2nd place recognition for excellence in software engineering and practical application.",
  },
  {
    title: "Program Director - Canva: Inspire & Design Bootcamp",
    issuer: "Sek.Men. Pengkalan Permatang, Kuala Selangor",
    date: "2024",
    description: "Led and coordinated a comprehensive design bootcamp program, demonstrating leadership skills, program direction, and cross-functional coordination in educational technology initiatives.",
  },
  {
    title: "International Study Tour Participant",
    issuer: "Xiangsihu College, Guangxi Minzu University, China",
    date: "2024",
    description: "Participated in Digital Economy, Art & Technology Program, gaining international exposure to emerging technologies, cross-cultural collaboration, and global tech innovation trends.",
  },
  {
    title: "Team Coordinator - Computing Day Teknosfera",
    issuer: "Universiti Selangor (UNISEL)",
    date: "2024",
    description: "Coordinated 'Explore The World Of Computing' event, demonstrating project management skills, team leadership, and ability to organize large-scale educational technology events.",
  },
  {
    title: "Workshop Facilitator - Digital Literacy Program",
    issuer: "Program Bengkel Digital HTML",
    date: "2022",
    description: "Conducted HTML programming workshops for primary and secondary school students, sharing technical expertise and promoting digital literacy in educational communities through hands-on learning.",
  },
  {
    title: "Academic Excellence - SPM Results",
    issuer: "SMK Tok Muda Abdul Aziz",
    date: "2021",
    description: "Achieved outstanding academic results with grades 3A 3B 1C in Malaysian Certificate of Education (SPM), demonstrating strong foundation in STEM subjects and analytical thinking.",
  },
];

// Skill Card Component
const SkillCard = ({ skill }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5, 0.75)}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
    >
      <h3 className="text-white font-bold text-[24px]">{skill.title}</h3>
      <div className="mt-4">
        {skill.items.map((item, index) => (
          <div key={item.name} className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-white">{item.name}</span>
              <span className="text-secondary">{item.proficiency}%</span>
            </div>
            <div className="w-full bg-black bg-opacity-40 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                style={{ width: `${item.proficiency}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Certification Card Component
const CertificationCard = ({ certification, index }) => {
  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
    >
      <div className="mt-1">
        <h3 className="text-white font-bold text-[20px]">{certification.title}</h3>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-secondary text-[12px]">{certification.issuer}</p>
          <p className="text-white text-[12px]">{certification.date}</p>
        </div>
        <p className="text-white tracking-wider text-[14px] mt-4">{certification.description}</p>
      </div>
    </motion.div>
  );
};

// Interest Card Component
const InterestCard = ({ interest, index }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="bg-black-200 p-6 rounded-3xl xs:w-[320px] w-full"
    >
      <h3 className="text-white font-bold text-[18px] mb-4">{interest.title}</h3>
      <p className="text-secondary tracking-wider text-[14px] leading-relaxed">{interest.description}</p>
    </motion.div>
  );
};

const StudyExperience = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My technical expertise</p>
          <h2 className={styles.sectionHeadText}>Technical Skills.</h2>
        </motion.div>
      </div>
      
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>

      <div className="bg-black-100 p-8 rounded-2xl">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Professional capabilities</p>
            <h2 className={styles.sectionHeadText}>Personal Skills.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
          {personalSkills.map((skill, index) => (
            <SkillCard key={`personal-${index}`} skill={skill} />
          ))}
        </div>
      </div>

      <div className="bg-black-100 p-8 rounded-2xl">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Recognition & Leadership</p>
            <h2 className={styles.sectionHeadText}>Achievements.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
          {certifications.map((certification, index) => (
            <CertificationCard key={index} certification={certification} index={index} />
          ))}
        </div>
      </div>

      <div className="bg-black-100 p-8 rounded-2xl">
        <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What drives me</p>
            <h2 className={styles.sectionHeadText}>Interests.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
          {interests.map((interest, index) => (
            <InterestCard key={index} interest={interest} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(StudyExperience, "skills");
