"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import type * as THREE from "three"
import { useLanguage } from "@/contexts/language-context"

// Componente para o computador
function Computer(props: any) {
  const computerRef = useRef<THREE.Group>(null)
  // Carregando o modelo GLB
  const { scene } = useGLTF("/assets/3d/computer.glb")

  // Clonamos a cena para evitar problemas com múltiplas instâncias
  const clonedScene = scene.clone()

  useFrame((state) => {
    if (computerRef.current) {
      // Aplicando rotação apenas no eixo Y do próprio modelo
      computerRef.current.rotation.y = state.clock.getElapsedTime() * 0.5

      // Mantendo apenas a flutuação suave no eixo Y
      computerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={computerRef} {...props}>
      <primitive object={clonedScene} scale={1} position={[0, -0.28, 0]} rotation={[0, 0, 0]} />
    </group>
  )
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para rolar suavemente para uma seção
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Calcular a posição de rolagem considerando o cabeçalho fixo (se houver)
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 20

      // Rolar suavemente para a seção
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Pré-carregamento do modelo
  useGLTF.preload("/assets/3d/computer.glb")

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Computer />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="glitch-container mb-4">
          <h1 className="glitch-text text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-green-400">Antonio </span>Alexandre
          </h1>
        </div>

        {/* Texto com efeito melhorado para legibilidade */}
        <p className="mb-8 max-w-2xl text-xl font-medium">
          <span className="typewriter-text bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-2 leading-relaxed backdrop-blur-sm">
            {t("hero.subtitle")}
          </span>
        </p>

        <div className="flex gap-4">
          <Button className="bg-green-500 hover:bg-green-600" onClick={() => scrollToSection("projects")}>
            {t("hero.cta.projects")}
          </Button>
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10"
            onClick={() => scrollToSection("contact")}
          >
            {t("hero.cta.contact")}
          </Button>
        </div>
      </div>

      {/* Scroll indicator - também com funcionalidade de rolagem para a próxima seção */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => scrollToSection("about")}
      >
        <ArrowDown className="h-8 w-8 animate-bounce text-green-400" />
      </div>
    </section>
  )
}
