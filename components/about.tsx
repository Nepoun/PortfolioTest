"use client"

import { motion } from "framer-motion"
import { Code2, Gamepad2, Brain } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">
            <span className="text-green-400">&lt;</span> {t("about.title")}{" "}
            <span className="text-green-400">/&gt;</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-green-400"></div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="mb-4 text-2xl font-bold text-green-400">{t("about.subtitle")}</h3>
            <p className="mb-6 text-gray-300">{t("about.p1")}</p>
            <p className="mb-6 text-gray-300">{t("about.p2")}</p>
            <p className="text-gray-300">{t("about.p3")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
              <Code2 className="mb-4 h-10 w-10 text-green-400" />
              <h4 className="mb-2 text-xl font-bold">{t("about.card1.title")}</h4>
              <p className="text-gray-300">{t("about.card1.desc")}</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
              <Gamepad2 className="mb-4 h-10 w-10 text-green-400" />
              <h4 className="mb-2 text-xl font-bold">{t("about.card2.title")}</h4>
              <p className="text-gray-300">{t("about.card2.desc")}</p>
            </div>

            <div className="col-span-2 rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
              <Brain className="mb-4 h-10 w-10 text-green-400" />
              <h4 className="mb-2 text-xl font-bold">{t("about.card3.title")}</h4>
              <p className="text-gray-300">{t("about.card3.desc")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
