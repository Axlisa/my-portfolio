import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Complete skills data based on CV
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
    title: "Development Tools",
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

const achievements = [
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

const SkillCard = ({ skill, index }) => (
  <div className="bg-tertiary p-6 rounded-2xl w-full max-w-sm">
    <h3 className="text-white font-bold text-xl mb-4">{skill.title}</h3>
    <div className="space-y-3">
      {skill.items.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between mb-2">
            <span className="text-white text-sm">{item.name}</span>
            <span className="text-secondary text-xs">{item.proficiency}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${item.proficiency}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AchievementCard = ({ achievement, index }) => (
  <div className="bg-black-200 p-6 rounded-3xl w-full max-w-sm">
    <h3 className="text-white font-bold text-lg mb-2">{achievement.title}</h3>
    <div className="flex justify-between items-center mb-3">
      <p className="text-secondary text-xs">{achievement.issuer}</p>
      <p className="text-white text-xs">{achievement.date}</p>
    </div>
    <p className="text-white text-sm leading-relaxed">{achievement.description}</p>
  </div>
);

const InterestCard = ({ interest, index }) => (
  <div className="bg-black-200 p-6 rounded-3xl w-full max-w-sm">
    <h3 className="text-white font-bold text-lg mb-4">{interest.title}</h3>
    <p className="text-secondary text-sm leading-relaxed">{interest.description}</p>
  </div>
);

const StudyExperience = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px] p-8">
      {/* Technical Skills Section */}
      <div className="bg-tertiary rounded-2xl p-8 mb-8">
        <div className="text-center">
          <p className={`${styles.sectionSubText}`}>My technical expertise</p>
          <h2 className={`${styles.sectionHeadText}`}>Technical Skills.</h2>
        </div>
      </div>
      
      
      <div className="flex flex-wrap gap-6 justify-center mb-12 -mt-20 pt-20">
        {personalSkills.map((skill, index) => (
          <SkillCard key={`personal-${index}`} skill={skill} index={index} />
        ))}
      </div>

      {/* Achievements Section */}
      <div className="bg-tertiary rounded-2xl p-8 mb-8">
        <div className="text-center">
          <p className={`${styles.sectionSubText}`}>Recognition & Leadership</p>
          <h2 className={`${styles.sectionHeadText}`}>Achievements.</h2>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 justify-center -mt-20 pt-20">
        {achievements.map((achievement, index) => (
          <AchievementCard key={`achievement-${index}`} achievement={achievement} index={index} />
        ))}
      </div>

      {/* Interests Section */}
      <div className="bg-tertiary rounded-2xl p-8 mb-8 mt-12">
        <div className="text-center">
          <p className={`${styles.sectionSubText}`}>What drives me</p>
          <h2 className={`${styles.sectionHeadText}`}>Interests.</h2>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 justify-center -mt-20 pt-20">
        {interests.map((interest, index) => (
          <InterestCard key={`interest-${index}`} interest={interest} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(StudyExperience, "skills");
