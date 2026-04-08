"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Star,
  Gamepad2,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ProjectMedia, { type MediaType } from "@/components/project-media"

type MediaItem = {
  src: string
  type: MediaType
  poster?: string
  label?: string
}

type Project = {
  id: number
  title: string
  priority?: boolean
  badge?: {
    label: string
    color: string
  }
  description: {
    en: string
    pt: string
  }
  media: MediaItem | MediaItem[]
  tags: string[]
  demoLink?: string
  githubLink?: string
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const projects: Project[] = [
  // ─── SHOWCASE ───────────────────────────────────────────────────────────────
  {
    id: 1,
    priority: true,
    title: "Ultimate Jello Party",
    badge: { label: "Publicado na Steam", color: "from-blue-500 to-cyan-400" },
    description: {
      en: "Party game published on Steam that I contributed to as part of a team. I worked on several minigames, the main board logic, the online multiplayer infrastructure, and the overall game feel.",
      pt: "Party game publicado na Steam que contribui no desenvolvimento como parte de uma equipe. Trabalhei em vários minigames, na lógica do tabuleiro principal, na infraestrutura de multiplayer online e no game feel geral do jogo.",
    },
    media: [
      { src: `${basePath}/ultimatejelloparty.png`, type: "image", label: "Key Art" },
    ],
    tags: ["Godot", "Online", "Steam", "GameDev"],
    demoLink: "https://store.steampowered.com/app/2972760/Ultimate_Jello_Party/",
  },
  {
    id: 2,
    priority: true,
    title: "FRAGMOS",
    badge: { label: "Em Desenvolvimento", color: "from-yellow-500 to-orange-400" },
    description: {
      en: "Roguelike deckbuilder with investigation elements, developed solo in Godot. Being a solo project, I was responsible for all aspects of development, from the modular card, item and room systems and game feel to the overall code architecture that keeps all the mechanics running together smoothly.",
      pt: "Roguelike deckbuilder com elementos de investigação, desenvolvido solo em Godot. Por ser um projeto solo, fui responsável por todos os aspectos do desenvolvimento, desde o sistema modular de cartas, itens e salas e os sistemas de game feel até a arquitetura de código que mantém todas as mecânicas funcionando juntas de forma fluída.",
    },
    media: [
      { src: `${basePath}/fragmos_gif_preview.gif`, type: "gif", label: "Gameplay" },
    ],
    tags: ["Godot", "Roguelike", "GameDev", "Em desenvolvimento"],
  },
  {
    id: 3,
    priority: true,
    title: "DomRock Business Insights",
    badge: { label: "Full-Stack", color: "from-purple-500 to-pink-400" },
    description: {
      en: "Full-stack system developed for DomRock as a college capstone project. Ingests CSV files, processes and stores everything in SQL, and lets users query the data in natural language via LLMs. Generates automatic executive reports with sales and inventory insights, deployed on AWS for web and mobile.",
      pt: "Sistema full-stack desenvolvido para a DomRock no projeto integrador da faculdade. Ingere arquivos CSV, processa e armazena tudo em SQL e permite consultas em linguagem natural via LLMs. Gera boletins executivos automáticos com insights de vendas e estoque, com deploy na AWS para web e mobile.",
    },
    media: [
      { src: `${basePath}/domrock_preview.png`, type: "image", label: "Dashboard" },
    ],
    tags: ["Front-end", "Back-end", "SQL", "LLM", "API", "AWS"],
    demoLink: "https://github.com/BananaScripts/API_6-Semestre",
    githubLink: "https://github.com/BananaScripts/API_6-Semestre",
  },

  // ─── REGULAR ────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "The Triangulo",
    description: {
      en: "A simple roguelike created in just 3 days for a game jam. The goal is to survive as long as possible. I still plan to revisit and improve parts of the project.",
      pt: "Um roguelike simples criado em apenas 3 dias para uma game jam. Seu objetivo é sobreviver o maior tempo possível. Ainda planejo refazer algumas coisas do projeto.",
    },
    media: { src: `${basePath}/triangulo_preview.png`, type: "image" },
    tags: ["Godot", "GDScript", "2D", "Pixel Art"],
    demoLink: "https://nepoun.itch.io/the-triangulo",
  },
  {
    id: 5,
    title: "Collection of Old Projects",
    description: {
      en: "A collection of older projects I worked on for learning purposes. Most are not fully playable or complete prototypes. You can check them out by clicking 'Demo'.",
      pt: "Uma coleção de antigos projetos que trabalhei com foco em estudo. Quase nenhum deles é um protótipo completo ou jogável. Você pode ver mais pelo botão 'Demo'.",
    },
    media: { src: `${basePath}/portfoliosnippets.gif`, type: "gif" },
    tags: ["Godot", "Unity"],
    demoLink: "https://youtu.be/OcGCy0PRB6E?si=NWFVKHWrVbJPriP5",
  },
  {
    id: 6,
    title: "Meteorological Data API",
    description: {
      en: "Back-end for a meteorological data collection system, developed alongside simple data-collection stations.",
      pt: "Back-end para um projeto de coleta de dados meteorológicos utilizando estações de coleta de dados.",
    },
    media: { src: `${basePath}/tecsus.jpg`, type: "image" },
    tags: ["JavaScript", "Typescript", "Mysql", "API", "Web"],
    demoLink: "https://theachievers-front-end.vercel.app",
    githubLink: "https://github.com/TheAchieversDSM/API-2023.1-Back-End-System",
  },
  {
    id: 7,
    title: "TV Vanguarda – Electoral Data Analysis",
    description: {
      en: "Developed for TV Vanguarda, this API provides a data analysis website showing statistics of the electorate within its coverage area in São Paulo, including marital status, education, age group, income, and growth over time.",
      pt: "Desenvolvido para a TV Vanguarda, esse projeto fornece um site de análise de dados exibindo estatísticas do eleitorado dentro de sua área de cobertura no Estado de São Paulo.",
    },
    media: { src: `${basePath}/dsm1-preview.gif`, type: "gif" },
    tags: ["Python", "Flask", "JavaScript", "Web"],
  },
  {
    id: 8,
    title: "UOL Cross-Selling Website",
    description: {
      en: "Developed in partnership with UOL, this project focuses on cross-selling: recommending similar products when a user views an item, encouraging purchases and supporting revenue growth.",
      pt: "Desenvolvido em parceria com a UOL, foca em venda cruzada (cross-selling), recomendando produtos semelhantes para incentivar o consumo e aumentar a receita.",
    },
    media: { src: `${basePath}/portfoliodsm-3.png`, type: "image" },
    tags: ["Java", "React", "Web"],
  },
  {
    id: 9,
    title: "Corporate AI Agents Platform",
    description: {
      en: "A mobile and back-end solution for creating and managing customized AI agents for internal support. Administrators can configure multiple virtual agents trained with internal documentation and business rules, with a permissions system and secure cloud chat storage.",
      pt: "Aplicação mobile e back-end para criação e gerenciamento de agentes de IA corporativos. Administradores configuram múltiplos agentes com documentações internas, controle de permissões e chat em nuvem seguro.",
    },
    media: { src: `${basePath}/aiagents_preview.png`, type: "image" },
    tags: ["Front-end", "Back-end", "Mobile", "AI Agents", "LLM", "Cloud"],
  },
]

// ─── SHOWCASE CARD ───────────────────────────────────────────────────────────

function ShowcaseCard({
  project,
  language,
  t,
  index,
}: {
  project: Project
  language: "en" | "pt"
  t: (k: string) => string
  index: number
}) {
  const mediaList: MediaItem[] = Array.isArray(project.media) ? project.media : [project.media]
  const [activeMedia, setActiveMedia] = useState(0)

  return (
    // Uses animate (not whileInView) so it always fires even when already in the viewport.
    // whileInView can silently stay at opacity:0 if the element mounts while already visible.
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-green-500/20 bg-gray-900 shadow-xl shadow-black/40 hover:shadow-green-500/10 hover:border-green-500/40 transition-all duration-500"
    >
      {/* Media */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-gray-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full"
          >
            <ProjectMedia
              src={mediaList[activeMedia].src}
              type={mediaList[activeMedia].type}
              alt={`${project.title} – ${mediaList[activeMedia].label ?? ""}`}
              poster={mediaList[activeMedia].poster}
            />
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        {project.badge && (
          <div
            className={`absolute top-3 left-3 rounded-full bg-gradient-to-r ${project.badge.color} px-3 py-1 text-xs font-bold text-white shadow-lg`}
          >
            {project.badge.label}
          </div>
        )}

        {/* Media switcher pills — only when multiple */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {mediaList.map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveMedia(i)}
                className={`rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-200 ${
                  i === activeMedia
                    ? "bg-green-500 text-white"
                    : "bg-gray-800/80 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {m.label ?? i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-2xl font-bold text-green-400 leading-tight">{project.title}</h3>
          <Star className="h-5 w-5 text-green-400/40 shrink-0 mt-0.5" />
        </div>

        {/* Description — fixed height container so all 3 cards align below it.
            h-[5.5rem] fits ~4 lines of text-sm/leading-relaxed. Adjust if needed. */}
        <div className="mb-5 h-[10rem] overflow-hidden">
          <p className="text-gray-300 leading-relaxed text-sm">{project.description[language]}</p>
        </div>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs text-green-400 font-medium whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links — always at the bottom */}
        <div className="flex gap-3 mt-auto">
          {project.demoLink && (
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black font-semibold shadow" asChild>
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {project.tags.includes("Steam") ? "Steam Page" : t("projects.demo")}
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
      </div>
    </motion.div>
  )
}

// ─── REGULAR CARD ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  language,
  t,
  index,
}: {
  project: Project
  language: "en" | "pt"
  t: (k: string) => string
  index: number
}) {
  const media = Array.isArray(project.media) ? project.media[0] : project.media

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
    >
      <Card className="flex flex-col h-full overflow-hidden bg-gray-800 border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500/30">
        <ProjectMedia src={media.src} type={media.type} alt={project.title} poster={media.poster} />
        <CardContent className="flex flex-col flex-grow p-6">
          <h3 className="mb-2 text-xl font-bold text-green-400">{project.title}</h3>
          <p className="mb-4 text-gray-300 text-sm leading-relaxed">{project.description[language]}</p>
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
  )
}

// ─── MAIN SECTION ────────────────────────────────────────────────────────────

export default function Projects() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"showcase" | "all">("showcase")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  const filters = ["Todos", "Unity", "Godot", "Web", "API"]
  const showcaseProjects = projects.filter((p) => p.priority)
  const regularProjects = projects.filter((p) => !p.priority)

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth < 1024 ? 2 : 4)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filteredProjects =
    activeFilter === "Todos"
      ? regularProjects
      : regularProjects.filter((p) => p.tags.some((tag) => tag.includes(activeFilter)))

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const currentProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, activeTab])

  return (
    <section id="projects" className="bg-gray-950 py-20 scroll-mt-16">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">
            <span className="text-green-400">{"{"}</span> {t("projects.title")}{" "}
            <span className="text-green-400">{"}"}</span>
          </h2>
          <div className="mx-auto h-1 w-20 bg-green-400 rounded-full" />
        </motion.div>

        {/* Tab switcher */}
        <div className="mb-10 flex justify-center">
          <div className="flex rounded-xl border border-green-500/30 bg-gray-900 p-1 gap-1">
            <button
              onClick={() => setActiveTab("showcase")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "showcase" ? "bg-green-500 text-black shadow" : "text-gray-400 hover:text-green-400"
              }`}
            >
              <Star className="h-4 w-4" />
              Showcase
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "all" ? "bg-green-500 text-black shadow" : "text-gray-400 hover:text-green-400"
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              {language === "pt" ? "Todos os Projetos" : "All Projects"}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ── SHOWCASE ── */}
          {activeTab === "showcase" && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-8 text-center text-sm text-gray-500">
                {language === "pt"
                  ? "Projetos selecionados — os que mais curti fazer ou ainda estou desenvolvendo"
                  : "Handpicked projects — the ones I'm most proud of or still building"}
              </p>

              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                {showcaseProjects.map((project, i) => (
                  <ShowcaseCard
                    key={project.id}
                    project={project}
                    language={language as "en" | "pt"}
                    t={t}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── ALL PROJECTS ── */}
          {activeTab === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Filters */}
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    className={
                      activeFilter === filter
                        ? "bg-green-500 hover:bg-green-600 text-black font-semibold"
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
                  key={`${activeFilter}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                >
                  {currentProjects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      language={language as "en" | "pt"}
                      t={t}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline" size="icon"
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline" size="icon"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="flex h-9 min-w-[60px] items-center justify-center rounded-md border border-green-500 bg-gray-800 px-3 text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline" size="icon"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline" size="icon"
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9 border-green-500 text-green-500 hover:bg-green-500/10 disabled:opacity-50"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">
                    {t("projects.pagination.showing")} {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, filteredProjects.length)}{" "}
                    {t("projects.pagination.of")} {filteredProjects.length}{" "}
                    {t("projects.pagination.projects")}
                  </p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}