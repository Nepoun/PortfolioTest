"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

type Skill = {
  name: string
  level: number
  category: "languages" | "gameDev" | "backendTools"
}

const skills: Skill[] = [
  { name: "C#", level: 25, category: "languages" },
  { name: "C++", level: 25, category: "languages" },
  { name: "Java", level: 25, category: "languages" },
  { name: "JavaScript/TypeScript", level: 25, category: "languages" },
  { name: "Python", level: 25, category: "languages" },
  { name: ".NET", level: 25, category: "backendTools" },
  { name: "MySQL", level: 25, category: "backendTools" },
  { name: "Git", level: 25, category: "backendTools" },
  { name: "VSCode", level: 25, category: "backendTools" },
  { name: "Unity", level: 25, category: "gameDev" },
  { name: "Godot", level: 25, category: "gameDev" },
  { name: "Blender", level: 25, category: "gameDev" },
  { name: "Aseprite", level: 25, category: "gameDev" },
]

export default function Skills() {
  const { t } = useLanguage()

  const languages = skills.filter((skill) => skill.category === "languages")
  const backendTools = skills.filter((skill) => skill.category === "backendTools")
  const gameDev = skills.filter((skill) => skill.category === "gameDev")

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
          <div className="mx-auto h-1 w-20 bg-green-400"></div>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[{ title: t("skills.languages"), data: languages },
            { title: "Backend & Tools", data: backendTools },
            { title: "Game Development", data: gameDev }].map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                className="rounded-lg bg-gray-800 p-6 shadow-lg"
              >
                <h3 className="mb-6 text-center text-2xl font-bold text-green-400">{group.title}</h3>
                <div className="space-y-4">
                  {group.data.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
