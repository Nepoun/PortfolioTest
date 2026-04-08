"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

type Skill = {
  name: string
  category: "languages" | "backend" | "frontendMobile" | "databases" | "gameDev" | "tools"
}

const skills: Skill[] = [
  // Languages
  { name: "C#",             category: "languages" },
  { name: "C++",            category: "languages" },
  { name: "TypeScript",     category: "languages" },
  { name: "JavaScript",     category: "languages" },
  { name: "Python",         category: "languages" },
  { name: "Java",           category: "languages" },
  { name: "Lua",            category: "languages" },
  { name: "GDScript",       category: "languages" },

  // Backend & APIs
  { name: "Node.js",        category: "backend" },
  { name: "Spring Boot",    category: "backend" },
  { name: "PHP",            category: "backend" },
  { name: "Ruby on Rails",  category: "backend" },
  { name: "REST APIs",      category: "backend" },
  { name: "Web Scraping",   category: "backend" },
  { name: "CI/CD",          category: "backend" },

  // Frontend & Mobile
  { name: "React",          category: "frontendMobile" },
  { name: "React Native",   category: "frontendMobile" },
  { name: "HTML",           category: "frontendMobile" },
  { name: "CSS",            category: "frontendMobile" },

  // Databases
  { name: "MySQL",          category: "databases" },
  { name: "MongoDB",        category: "databases" },
  { name: "Firebase",       category: "databases" },
  { name: "Cassandra",      category: "databases" },

  // Game Dev
  { name: "Unity3D",        category: "gameDev" },
  { name: "Godot",          category: "gameDev" },
  { name: "Custom Engine",  category: "gameDev" },
  { name: "Vulkan",         category: "gameDev" },
  { name: "Blender",        category: "gameDev" },
  { name: "Aseprite",       category: "gameDev" },

  // Tools
  { name: "Git",            category: "tools" },
  { name: "GitHub",         category: "tools" },
  { name: "Arduino",        category: "tools" },
  { name: "DevOps",         category: "tools" },
  { name: "Linux",          category: "tools" },
]

export default function Skills() {
  const { t, language } = useLanguage()

  const groups = [
    {
      title: t("skills.languages"),
      data: skills.filter((s) => s.category === "languages"),
    },
    {
      title: language === "pt" ? "Backend & APIs" : "Backend & APIs",
      data: skills.filter((s) => s.category === "backend"),
    },
    {
      title: language === "pt" ? "Frontend & Mobile" : "Frontend & Mobile",
      data: skills.filter((s) => s.category === "frontendMobile"),
    },
    {
      title: language === "pt" ? "Banco de Dados" : "Databases",
      data: skills.filter((s) => s.category === "databases"),
    },
    {
      title: "Game Development",
      data: skills.filter((s) => s.category === "gameDev"),
    },
    {
      title: language === "pt" ? "Ferramentas" : "Tools",
      data: skills.filter((s) => s.category === "tools"),
    },
  ]

  return (
    <section id="skills" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">
            <span className="text-green-400">function</span> {t("skills.title")}
            <span className="text-green-400">()</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-green-400" />
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="rounded-lg bg-gray-800 p-6 shadow-lg"
            >
              <h3 className="mb-5 text-center text-xl font-bold text-green-400">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.data.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    viewport={{ once: true }}
                    className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-300"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}