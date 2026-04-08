"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dicionários de tradução
const translations = {
  en: {
    // Navigation
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.subtitle": "A developer creating efficient solutions and immersive experiences",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact",

    // About
    "about.title": "About Me",
    "about.subtitle": "Developer · São Paulo, Brazil",
    "about.p1": "Hey! I'm a developer who enjoys turning ideas into things people can actually use and interact with. I work across game development and software systems, and I always aim to write clean, organized code that's easy to maintain.",
    "about.p2": "I started programming in 2017 and have been exploring a lot of different areas since, from building games in Unity and Godot to backend work with Java, Node.js, and C#. I recently graduated in Software Development from FATEC.",    
    "about.p3": " ",
    "about.card1.title": "Backend & APIs",
    "about.card1.desc": "REST APIs, automation scripts, web scrapers, and large-scale database management.",
    "about.card2.title": "Game Development",
    "about.card2.desc": "Gameplay systems, game feel, and a custom engine built from scratch in C++ and Vulkan.",
    "about.card3.title": "Fullstack",
    "about.card3.desc": "React, React Native, Node.js, Spring Boot, comfortable across the whole stack.",

    // Projects
    "projects.title": "Projects",
    "projects.filter.all": "All",
    "projects.demo": "Demo",
    "projects.code": "Code",
    "projects.pagination.showing": "Showing",
    "projects.pagination.of": "of",
    "projects.pagination.projects": "projects",
    "projects.pagination.first": "First page",
    "projects.pagination.prev": "Previous page",
    "projects.pagination.next": "Next page",
    "projects.pagination.last": "Last page",

    // Skills
    "skills.title": "Skills",
    "skills.languages": "Languages",
    "skills.engines": "Engines",
    "skills.tools": "Tools",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Let's Talk",
    "contact.desc":
      "Interested in working together? Have a question about software or game development? Fill out the form or get in touch through the channels below.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.success": "Message sent successfully!",
  },
  pt: {
    // Navegação
    "nav.projects": "Projetos",
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",

    // Hero
    "hero.subtitle": "Um desenvolvedor criando soluções eficientes e experiências imersivas",
    "hero.cta.projects": "Ver Projetos",
    "hero.cta.contact": "Contato",

    // About
    "about.title": "Sobre Mim",
    "about.subtitle": "Desenvolvedor · São Paulo, Brasil",
    "about.p1": "Opa! Sou desenvolvedor e gosto de transformar ideias em algo que as pessoas realmente possam usar e interagir. Trabalho tanto com jogos quanto com sistemas de software, e sempre tento escrever código limpo e organizado, fácil de manter.",
    "about.p2": "Comecei a programar em 2017 e fui explorando bastante coisa desde então, de jogos em Unity e Godot até backend com Java, Node.js e C#. Me formei recentemente em Desenvolvimento de Software pela FATEC.",
    "about.p3": " ",
    "about.card1.title": "Backend & APIs",
    "about.card1.desc": "APIs REST, scripts de automação, web scrapers e gerenciamento de bancos de dados em larga escala.",
    "about.card2.title": "Game Development",
    "about.card2.desc": "Sistemas de gameplay, game feel e uma engine própria desenvolvida do zero em C++ e Vulkan.",
    "about.card3.title": "Fullstack",
    "about.card3.desc": "React, React Native, Node.js, Spring Boot, confortável em toda a stack.",

    // Projects
    "projects.title": "Projetos",
    "projects.filter.all": "Todos",
    "projects.demo": "Demo",
    "projects.code": "Código",
    "projects.pagination.showing": "Mostrando",
    "projects.pagination.of": "de",
    "projects.pagination.projects": "projetos",
    "projects.pagination.first": "Primeira página",
    "projects.pagination.prev": "Página anterior",
    "projects.pagination.next": "Próxima página",
    "projects.pagination.last": "Última página",

    // Skills
    "skills.title": "Habilidades",
    "skills.languages": "Linguagens",
    "skills.engines": "Engines",
    "skills.tools": "Ferramentas",

    // Contact
    "contact.title": "Contato",
    "contact.subtitle": "Vamos Conversar",
    "contact.desc":
      "Interessado em trabalhar juntos? Tem alguma pergunta sobre desenvolvimento de software ou jogos? Preencha o formulário ou entre em contato pelos canais abaixo.",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.submit": "Enviar Mensagem",
    "contact.success": "Mensagem enviada com sucesso!",
  }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Definir inglês como padrão, mas verificar localStorage
  const [language, setLanguageState] = useState<Language>("en")

  // Função de tradução
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // Função para alterar o idioma e salvar no localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("portfolio-language", newLanguage)
  }

  // Carregar preferência de idioma do localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Hook personalizado para usar o contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
