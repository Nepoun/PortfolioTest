"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ProjectMedia, { type MediaType } from "@/components/project-media"

type Project = {
  id: number
  title: string
  description: {
    en: string
    pt: string
  }
  media: {
    src: string
    type: MediaType
    poster?: string
  }
  tags: string[]
  demoLink?: string
  githubLink?: string
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const projects: Project[] = [
  {
    id: 1,
    title: "FRAGMOS",
    description: {
      en: "Currently in development! A roguelike focused on achieving high scores with a retro-inspired visual style.",
      pt: "Sendo desenvolvido atualmente! Um roguelike com foco em atingir a maior pontuação alta com um visual focado em relembrar jogos antigos",
    },
    media: {
      src: `${basePath}/fragmos_gif_preview.gif`,
      type: "gif",
    },
    tags: ["Unity", "Godot"],
    demoLink: "https://www.youtube.com/watch?v=vAExNruPsa8",
  },
  {
    id: 2,
    title: "The Triangulo",
    description: {
      en: "A simple roguelike created in just 3 days for a game jam. The goal is to survive as long as possible. I still plan to revisit and improve parts of the project.",
      pt: "Um roguelike simples criado em apenas 3 dias para uma game jam. Seu objetivo é sobreviver o maior tempo possível. Ainda planejo refazer algumas coisas do projeto",
    },
    media: {
      src: `${basePath}/triangulo_preview.png`,
      type: "image",
    },
    tags: ["Godot", "GDScript", "2D", "Pixel Art"],
    demoLink: "https://nepoun.itch.io/the-triangulo"
  },
  {
    id: 3,
    title: "Collection of old projects",
    description: {
      en: "A collection of older projects I worked on for learning purposes. Most are not fully playable or complete prototypes. You can check them out by clicking 'Demo'.",
      pt: "Uma coleção de antigos projetos que trabalhei com foco em estudo. Quase nenhum deles é um prototipo completo ou jogavel. Você pode ver mais pelo botão 'Demo'",
    },
    media: {
      src:  `${basePath}/portfoliosnippets.gif`,
      type: "gif"
    },
    tags: ["Godot", "Unity"],
    demoLink: "https://youtu.be/OcGCy0PRB6E?si=NWFVKHWrVbJPriP5"
  },
  {
    id: 4,
    title: "Meteorological data API",
    description: {
      en: "Back-end for a meteorological data collection system, developed alongside simple data-collection stations.",
      pt: "Back-end para um projeto de coleta de dados meteorologicos utilizando estações de coleta de dados(Junto do desenvolvimento de algumas estações simples dessas).",
    },
    media: {
      src:  `${basePath}/tecsus.jpg`,
      type: "image",
    },
    tags: ["JavaScript", "Typescript", "Mysql", "API", "Web"],
    demoLink: "https://theachievers-front-end.vercel.app",
    githubLink: "https://github.com/TheAchieversDSM/API-2023.1-Back-End-System",
  }
]

export default function Projects() {
  const { t, language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const filters = ["Todos", "Unity", "Godot", "Web", "API"]

  // Ajustar itens por página com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(4)
      }
    }

    // Definir o valor inicial
    handleResize()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", handleResize)

    // Limpar listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filtrar projetos com base no filtro ativo
  const filteredProjects =
    activeFilter === "Todos"
      ? projects
      : projects.filter((project) => project.tags.some((tag) => tag.includes(activeFilter)))

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

  // Obter projetos para a página atual
  const currentProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Funções de navegação
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    // Scroll suave para o topo da seção de projetos
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)
  const firstPage = () => goToPage(1)
  const lastPage = () => goToPage(totalPages)

  // Resetar para a primeira página quando o filtro mudar
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  return (
    <section id="projects" className="bg-gray-950 py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">
            <span className="text-green-400">{"{"}</span> {t("projects.title")}{" "}
            <span className="text-green-400">{"}"}</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-green-400"></div>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={
                activeFilter === filter
                  ? "bg-green-500 hover:bg-green-600"
                  : "border-green-500 text-green-500 hover:bg-green-500/10"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "Todos" ? t("projects.filter.all") : filter}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          >
            {currentProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="flex flex-col h-full overflow-hidden bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                  <ProjectMedia
                    src={project.media.src}
                    type={project.media.type}
                    alt={project.title}
                    poster={project.media.poster}
                  />

                  <CardContent className="flex flex-col flex-grow p-6">
                    <h3 className="mb-2 text-2xl font-bold text-green-400">{project.title}</h3>
                    <p className="mb-4 text-gray-300">{project.description[language]}</p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-3">
                      {project.demoLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-500 hover:bg-green-500/10"
                          asChild
                        >
                          <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("projects.demo")}
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-500 hover:bg-green-500/10"
                          asChild
                        >
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            {t("projects.code")}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={firstPage}
                disabled={currentPage === 1}
                className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                aria-label={t("projects.pagination.first")}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">{t("projects.pagination.first")}</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                aria-label={t("projects.pagination.prev")}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">{t("projects.pagination.prev")}</span>
              </Button>

              <span className="flex h-9 min-w-[60px] items-center justify-center rounded-md border border-green-500 bg-gray-800 px-3 text-sm">
                {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                aria-label={t("projects.pagination.next")}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">{t("projects.pagination.next")}</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={lastPage}
                disabled={currentPage === totalPages}
                className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                aria-label={t("projects.pagination.last")}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">{t("projects.pagination.last")}</span>
              </Button>
            </div>

            <p className="text-sm text-gray-400">
              {t("projects.pagination.showing")} {(currentPage - 1) * itemsPerPage + 1} {t("projects.pagination.of")}{" "}
              {Math.min(currentPage * itemsPerPage, filteredProjects.length)} {t("projects.pagination.of")}{" "}
              {filteredProjects.length} {t("projects.pagination.projects")}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
