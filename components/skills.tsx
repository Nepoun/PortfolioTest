"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

type Skill = {
  name: string
  category: "languages" | "gameDev" | "backendTools"
}

const skills: Skill[] = [
  { name: "C#",                    category: "languages" },
  { name: "C++",                   category: "languages" },
  { name: "Java",                  category: "languages" },
  { name: "JavaScript/TypeScript", category: "languages" },
  { name: "Python",                category: "languages" },
  { name: ".NET",                  category: "backendTools" },
  { name: "MySQL",                 category: "backendTools" },
  { name: "Git",                   category: "backendTools" },
  { name: "VSCode",                category: "backendTools" },
  { name: "Unity",                 category: "gameDev" },
  { name: "Godot",                 category: "gameDev" },
  { name: "Blender",               category: "gameDev" },
  { name: "Aseprite",              category: "gameDev" },
]

export default function Skills() {
  const { t } = useLanguage()

  const languages    = skills.filter((s) => s.category === "languages")
  const backendTools = skills.filter((s) => s.category === "backendTools")
  const gameDev      = skills.filter((s) => s.category === "gameDev")

  const groups = [
    { title: t("skills.languages"), data: languages },
    { title: "Backend & Tools",     data: backendTools },
    { title: "Game Development",    data: gameDev },
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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