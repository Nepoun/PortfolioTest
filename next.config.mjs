// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // gera build estático (para usar no GitHub Pages)
  basePath: isProd ? '/PortfolioTest' : '',
  assetPrefix: isProd ? '/PortfolioTest/' : '',
  images: {
    unoptimized: true, // necessário porque GitHub Pages não suporta otimizador de imagens
  },
}

export default nextConfig
