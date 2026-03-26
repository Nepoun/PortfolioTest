"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

type Level = "Familiar" | "Proficient" | "Advanced" | "Expert"

type Skill = {
  name: string
  level: Level
  category: "languages" | "gameDev" | "backendTools"
}

const levelWidth: Record<Level, string> = {
  Familiar:   "25%",
  Proficient: "50%",
  Advanced:   "75%",
  Expert:     "95%",
}

const levelColor: Record<Level, string> = {
  Familiar:   "bg-green-800",
  Proficient: "bg-green-600",
  Advanced:   "bg-green-500",
  Expert:     "bg-green-400",
}

const skills: Skill[] = [
  { name: "C#",                   level: "Advanced",   category: "languages" },
  { name: "C++",                  level: "Familiar",   category: "languages" },
  { name: "Java",                 level: "Proficient", category: "languages" },
  { name: "JavaScript/TypeScript",level: "Proficient", category: "languages" },
  { name: "Python",               level: "Familiar",   category: "languages" },
  { name: ".NET",                 level: "Proficient", category: "backendTools" },
  { name: "MySQL",                level: "Proficient", category: "backendTools" },
  { name: "Git",                  level: "Advanced",   category: "backendTools" },
  { name: "VSCode",               level: "Expert",     category: "backendTools" },
  { name: "Unity",                level: "Expert",     category: "gameDev" },
  { name: "Godot",                level: "Advanced",   category: "gameDev" },
  { name: "Blender",              level: "Familiar",   category: "gameDev" },
  { name: "Aseprite",             level: "Proficient", category: "gameDev" },
]

export default function Skills() {
  const { t } = useLanguage()

  const languages    = skills.filter((s) => s.category === "languages")
  const backendTools = skills.filter((s) => s.category === "backendTools")
  const gameDev      = skills.filter((s) => s.category === "gameDev")

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

        {/* Legenda */}
        <div className="mb-8 flex justify-center gap-6 text-sm text-gray-400">
          {(["Familiar", "Proficient", "Advanced", "Expert"] as Level[]).map((l) => (
            <span key={l} className="flex items-center gap-2">
              <span className={`inline-block h-2 w-4 rounded-full ${levelColor[l]}`} />
              {l}
            </span>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: t("skills.languages"), data: languages },
            { title: "Backend & Tools",     data: backendTools },
            { title: "Game Development",    data: gameDev },
          ].map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="rounded-lg bg-gray-800 p-6 shadow-lg"
            >
              <h3 className="mb-6 text-center text-2xl font-bold text-green-400">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.data.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                      <motion.div
                        className={`h-full rounded-full ${levelColor[skill.level]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: levelWidth[skill.level] }}
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