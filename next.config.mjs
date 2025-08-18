// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // necessário para GitHub Pages
  basePath: isProd ? '/PortfolioTest' : '',
  assetPrefix: isProd ? '/PortfolioTest/' : '',
  images: {
    unoptimized: true, // GitHub Pages não suporta otimizador de imagens
  },
  trailingSlash: true, // gera URLs com barra no final (evita 404 no Pages)
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/PortfolioTest' : '',
  },
}

export default nextConfig
