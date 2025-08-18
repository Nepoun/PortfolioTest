"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export type MediaType = "image" | "gif" | "video"

interface ProjectMediaProps {
  src: string
  type: MediaType
  alt: string
  poster?: string
}

export default function ProjectMedia({ src, type, alt, poster }: ProjectMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Função para alternar reprodução do vídeo
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Função para alternar mudo
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que o clique propague para o togglePlay
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Atualizar estado de reprodução quando o vídeo pausa ou reproduz
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("ended", handleEnded)

    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Renderizar o tipo apropriado de mídia
  if (type === "video") {
    return (
      <div
        className="group relative aspect-video w-full overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
          muted
          playsInline
          loop
          onClick={togglePlay}
          aria-label={alt}
        />

        {/* Overlay de controles */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            isHovering || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
          onClick={togglePlay}
        >
          {!isPlaying && (
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/80 text-white transition-transform hover:scale-110"
              aria-label="Play video"
            >
              <Play className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Controles de vídeo */}
        <div
          className={`absolute bottom-2 right-2 flex items-center space-x-2 transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/80 text-white transition-transform hover:bg-gray-700/80 hover:scale-110"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          {isPlaying && (
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/80 text-white transition-transform hover:bg-gray-700/80 hover:scale-110"
              onClick={togglePlay}
              aria-label="Pause"
            >
              <Pause className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    )
  } else if (type === "gif" || type === "image") {
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      </div>
    )
  }

  return null
}
