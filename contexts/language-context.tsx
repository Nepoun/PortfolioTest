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
    "about.subtitle": "Programmer & Developer",
    "about.p1":
      "Hey! I'm a developer who enjoys turning ideas into things people can actually use and interact with. I'm interested in both game development and software systems, and I always aim to write clean, organized code that's easy to maintain",
    "about.p2":
      "I started programming back in 2017 and have been exploring different areas ever since — from building games in Unity and Godot to creating scalable back-ends with Java, JavaScript, and C#. I like picking the right tool for each project.",
    "about.p3":
      "To me, a great project happens when logic, purpose, and technical execution come together, that’s the balance I try to bring into every challenge I take on.",
    "about.card1.title": "Programming",
    "about.card1.desc": "System development, robust logic, and efficient integrations.",
    "about.card2.title": "Game Design",
    "about.card2.desc": "Designing engaging mechanics and interactive experiences.",
    "about.card3.title": "Problem Solving",
    "about.card3.desc": "Performance optimization and solving complex technical challenges.",

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
    "about.subtitle": "Programador & Desenvolvedor",
    "about.p1":
      "Oi! Sou desenvolvedor e gosto de transformar ideias em algo que as pessoas realmente possam usar e interagir. Tenho bastante interesse tanto em jogos quanto em sistemas de software, e sempre tento escrever código limpo e organizado, que seja fácil de manter. Quanto mais modular melhor",
    "about.p2":
      "Comecei a programar em 2017 e, desde então, venho explorando bastante coisa: já criei jogos em Unity e Godot, além de trabalhar em back-ends escaláveis com linguagens como Java, JavaScript e C#. Gosto de escolher a ferramenta certa para cada projeto.",
    "about.p3":
      "Pra mim, um bom trabalho nasce quando lógica, propósito e execução técnica andam juntos, é isso que procuro alcançar em cada projeto em que me envolvo.",
    "about.card1.title": "Programação",
    "about.card1.desc": "Desenvolvimento de sistemas, lógicas robustas e integrações eficientes.",
    "about.card2.title": "Game Design",
    "about.card2.desc": "Criação de mecânicas envolventes e experiências interativas.",
    "about.card3.title": "Resolução de Problemas",
    "about.card3.desc": "Otimização de performance e solução de desafios técnicos complexos.",

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
