import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Define skills and education data
const skills = [
  {
    title: "Backend Development",
    items: [
      { name: "Node.js", proficiency: 90 },
      { name: "Express.js", proficiency: 85 },
      { name: "MongoDB", proficiency: 80 },
      { name: "MySQL", proficiency: 85 },
      { name: "RESTful APIs", proficiency: 90 },
      { name: "GraphQL", proficiency: 75 },
    ]
  },
  {
    title: "DevOps & Tools",
    items: [
      { name: "Docker", proficiency: 80 },
      { name: "AWS", proficiency: 75 },
      { name: "Git", proficiency: 85 },
      { name: "CI/CD", proficiency: 70 },
      { name: "Linux", proficiency: 80 },
    ]
  },
  {
    title: "Programming Languages",
    items: [
      { name: "JavaScript", proficiency: 90 },
      { name: "TypeScript", proficiency: 75 },
      { name: "Python", proficiency: 70 },
      { name: "Java", proficiency: 60 },
    ]
  }
];

const certifications = [
  {
    title: "AWS Certified Developer Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Validation of understanding cloud architecture and developing AWS-based applications.",
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    description: "Certified expertise in building applications using MongoDB, including schema design and optimization.",
  },
  {
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2022",
    description: "Professional certification focused on building server-side applications with Node.js.",
  }
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

const StudyExperience = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I've learned</p>
          <h2 className={styles.sectionHeadText}>Skills & Certifications.</h2>
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
            <p className={styles.sectionSubText}>Credentials</p>
            <h2 className={styles.sectionHeadText}>Certifications.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
          {certifications.map((certification, index) => (
            <CertificationCard key={index} certification={certification} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(StudyExperience, "study");
