"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)

  // Mostrar tooltip brevemente ao carregar a página
  useEffect(() => {
    setShowTooltip(true)
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Efeito quando o idioma é alterado
  useEffect(() => {
    if (hasChanged) {
      const timer = setTimeout(() => {
        setHasChanged(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [hasChanged])

  const handleLanguageChange = (newLanguage: "en" | "pt") => {
    setLanguage(newLanguage)
    setHasChanged(true)
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`flex items-center gap-2 rounded-full border-2 bg-gray-900/80 px-3 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-green-500/20 ${
              hasChanged ? "border-green-400 ring-2 ring-green-400/50" : "border-green-500"
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Globe className={`h-5 w-5 ${hasChanged ? "text-green-400" : "text-green-500"}`} />
            <span className={`uppercase ${hasChanged ? "text-green-400" : "text-white"}`}>
              {language === "en" ? "English" : "Português"}
            </span>
            <div
              className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white ${
                hasChanged ? "animate-pulse" : ""
              }`}
            >
              {language === "en" ? "EN" : "PT"}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] bg-gray-800 text-white">
          <DropdownMenuItem
            onClick={() => handleLanguageChange("en")}
            className={`flex cursor-pointer items-center gap-2 hover:bg-gray-700 ${
              language === "en" ? "text-green-400" : ""
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-600 text-[10px] font-bold">
              EN
            </span>
            <span>English</span>
            {language === "en" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLanguageChange("pt")}
            className={`flex cursor-pointer items-center gap-2 hover:bg-gray-700 ${
              language === "pt" ? "text-green-400" : ""
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-600 text-[10px] font-bold">
              PT
            </span>
            <span>Português</span>
            {language === "pt" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-48 rounded-md bg-gray-800 p-2 text-center text-sm text-white shadow-lg"
          >
            {language === "en" ? "Change language" : "Alterar idioma"}
            <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
