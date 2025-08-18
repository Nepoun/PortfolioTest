"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://formspree.io/f/xgvkldra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(t("contact.success"))
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        alert("Erro ao enviar. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro no envio:", error)
      alert("Erro ao enviar. Tente novamente.")
    }
  }


  return (
    <section id="contact" className="bg-gray-950 py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">
            <span className="text-green-400">console.log</span>("{t("contact.title")}"
            <span className="text-green-400">)</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-green-400"></div>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-2xl font-bold text-green-400">{t("contact.subtitle")}</h3>
            <p className="mb-8 text-gray-300">{t("contact.desc")}</p>

            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <Mail className="mr-4 h-5 w-5 text-green-400" />
                <span className="text-gray-300">nepoun.dev@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-4 h-5 w-5 text-green-400" />
                <span className="text-gray-300">+55 (12) 98274-2822</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-4 h-5 w-5 text-green-400" />
                <span className="text-gray-300">São Paulo, Brasil</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://github.com/Nepoun"
                className="rounded-full bg-gray-800 p-3 text-green-400 transition-colors hover:bg-green-500 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="www.linkedin.com/in/antonio-nepomuceno"
                className="rounded-full bg-gray-800 p-3 text-green-400 transition-colors hover:bg-green-500 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://nepoun.itch.io"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-3 text-green-400 transition-colors hover:bg-green-500 hover:text-white"
              >
                <span className="text-sm font-semibold">itch.io</span>
              </a>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                    {t("contact.form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    {t("contact.form.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-700 bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                  {t("contact.form.subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-gray-700 bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-gray-700 bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                {t("contact.form.submit")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
