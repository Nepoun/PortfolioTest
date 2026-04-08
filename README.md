# Game Developer Portfolio

Um portfólio moderno e interativo para desenvolvedores de jogos, com foco em programação e desenvolvimento. Este projeto apresenta um design temático de desenvolvimento de jogos com elementos 3D interativos.

![Preview do Portfólio](./public/preview.png)


## 🎮 Características

- **Modelo 3D Interativo**: Exibição de um computador 3D na seção hero
- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Animações Suaves**: Transições e animações para uma experiência de usuário agradável
- **Seções Completas**: Hero, Sobre, Projetos, Habilidades e Contato
- **Estética de Jogos**: Design visual inspirado no mundo dos jogos e programação

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) - Framework React
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - Biblioteca React para Three.js
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [Shadcn/UI](https://ui.shadcn.com/) - Componentes de UI

## 📋 Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou pnpm ou yarn

## 🛠️ Instalação

1. Clone o repositório
   \`\`\`bash
   git clone https://github.com/seu-usuario/game-dev-portfolio.git
   \`\`\`

2. Navegue até o diretório do projeto
   \`\`\`bash
   cd game-dev-portfolio
   \`\`\`

3. Instale as dependências
   \`\`\`bash
   npm install
   # ou
   pnpm install
   # ou
   yarn install
   \`\`\`

4. Inicie o servidor de desenvolvimento
   \`\`\`bash
   npm run dev
   # ou
   pnpm dev
   # ou
   yarn dev
   \`\`\`

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🎨 Personalização

### Projetos

Edite o arquivo `components/projects.tsx` para adicionar seus próprios projetos:

\`\`\`typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Seu Projeto",
    description: "Descrição do seu projeto",
    image: "/caminho/para/imagem.jpg",
    tags: ["Unity", "C#", "3D"],
    demoLink: "https://link-para-demo.com",
    githubLink: "https://github.com/seu-usuario/seu-projeto",
  },
  // Adicione mais projetos aqui
];
\`\`\`
## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Three.js](https://threejs.org/) pela biblioteca 3D
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) pela integração com React
- [Vercel](https://vercel.com/) pela hospedagem
\`\`\`

```gitignore file=".gitignore" type="code"
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
