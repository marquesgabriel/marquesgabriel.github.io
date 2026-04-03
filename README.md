# Gabriel Marques — Portfolio

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-RLS%20enabled-3ECF8E?logo=supabase&logoColor=white&style=flat-square)
![SCSS](https://img.shields.io/badge/SCSS-multi--theme-CC6699?logo=sass&logoColor=white&style=flat-square)
![Deployed on GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-222?logo=github&logoColor=white&style=flat-square)

---

> 🇧🇷 [Português](#português) · 🇺🇸 [English](#english)

---

## Português

### Olá! 👋

Seja bem-vindo ao código-fonte do meu portfólio pessoal.

Este projeto é mais do que uma página de apresentação — é também uma vitrine técnica. Aqui você vai encontrar uma aplicação React com múltiplos temas visuais trocados dinamicamente, conteúdo servido pelo Supabase com políticas de RLS, e uma estrutura de código que espero que demonstre cuidado com organização, qualidade e boas práticas.

Se você caiu aqui por curiosidade, fique à vontade para explorar. Se encontrar algo interessante (ou algo que eu poderia melhorar), pode abrir uma issue ou me chamar.

---

### Funcionalidades

- **Multi-tema**: ao abrir a página, um tema visual é escolhido aleatoriamente entre vários disponíveis (`win98`, `gothic`, `cyberpunk`, `detective`, `vaporwave`, `synthwave`, `flat`). É possível trocar o tema a qualquer momento pelo link no topo da página.
- **Multi-idioma**: o idioma é detectado automaticamente pelo navegador, com opção de troca manual.
- **Conteúdo dinâmico**: todos os textos e dados são carregados do Supabase em tempo real, com cache local para reduzir requests.
- **Mobile-first**: menu hambúrguer com sidebar em telas pequenas, barra fixa em telas maiores.

---

### Estrutura do Projeto

```
/
├── .husky/                  # Hooks de Git (pre-commit com lint-staged)
├── public/                  # Assets estáticos
└── src/
    ├── components/          # Componentes React reutilizáveis
    │   ├── tests/           # Testes dos componentes
    │   ├── Container.tsx    # Wrapper de "janela" — muda visual por tema
    │   ├── index.tsx        # Barrel export dos componentes
    │   ├── LanguageSelect.tsx # Barra de controles (idioma + troca de tema)
    │   ├── Timeline.tsx     # Lista ordenada de experiências
    │   └── TimelineItem.tsx # Item individual da timeline
    │
    ├── styles/              # Folhas de estilo SCSS por tema
    │   ├── base.scss        # Estilos base, spinner de loading, menu mobile
    │   ├── cyberpunk.scss   # Tema cyberpunk — painéis neon, chanfros, HUD
    │   ├── detective.scss   # Tema noir — papel envelhecido, datilografia
    │   ├── flat.scss        # Tema corporativo flat — sóbrio e direto
    │   ├── gothic.scss      # Tema gótico — tipografia serifada, escuro
    │   ├── synthwave.scss   # Tema synthwave — outrun, grid 80s, neon
    │   ├── vaporwave.scss   # Tema vaporwave — pastéis, colunas, sol
    │   └── win98.scss       # Tema Windows 98 — UI clássica, botões biselados
    │
    ├── types/               # Definições de tipos TypeScript
    ├── utils/               # Utilitários (cliente Supabase)
    │
    ├── App.test.tsx         # Testes de integração do App
    ├── App.tsx              # Componente raiz — lógica de estado principal
    ├── declarations.d.ts    # Declarações de módulos
    ├── index.scss           # Entry point dos estilos (importa todos os temas)
    ├── index.tsx            # Entry point React
    ├── reportWebVitals.ts   # Métricas de performance
    └── setupTests.ts        # Configuração do ambiente de testes
```

---

### Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run test` | Testes em modo watch |
| `npm run test:coverage` | Cobertura de testes (threshold 80%) |
| `npm run lint` | Verifica erros de lint |
| `npm run lint:fix` | Corrige erros de lint automaticamente |
| `npm run format` | Formata o código com Prettier |
| `npm run deploy` | Build + deploy no GitHub Pages |

---

### Gostou do projeto?

Se este código foi útil, te inspirou ou simplesmente te fez sorrir com algum dos temas malucos, considere me pagar um café ☕

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-apoiar-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/marquesgabriel)

---

## English

### Hello! 👋

Welcome to the source code of my personal portfolio.

This project is more than a presentation page — it's also a technical showcase. Here you'll find a React application with multiple visual themes switched dynamically, content served by Supabase with RLS policies, and a codebase that I hope demonstrates care for organization, quality, and good practices.

If you landed here out of curiosity, feel free to explore. If you find something interesting (or something I could improve), feel free to open an issue or reach out.

---

### Features

- **Multi-theme**: when the page loads, a visual theme is randomly chosen from several available (`win98`, `gothic`, `cyberpunk`, `detective`, `vaporwave`, `synthwave`, `flat`). The theme can be changed at any time via the link at the top of the page.
- **Multi-language**: the language is automatically detected by the browser, with a manual switch option.
- **Dynamic content**: all text and data is loaded from Supabase at runtime, with local caching to reduce requests.
- **Mobile-first**: hamburger menu with a sidebar on small screens, fixed bar on larger screens.

---

### Project Structure

```
/
├── .husky/                  # Git hooks (pre-commit with lint-staged)
├── public/                  # Static assets
└── src/
    ├── components/          # Reusable React components
    │   ├── tests/           # Component tests
    │   ├── Container.tsx    # "Window" wrapper — visual changes per theme
    │   ├── index.tsx        # Barrel export for components
    │   ├── LanguageSelect.tsx # Controls bar (language + theme switch)
    │   ├── Timeline.tsx     # Sorted list of experiences
    │   └── TimelineItem.tsx # Individual timeline entry
    │
    ├── styles/              # Per-theme SCSS stylesheets
    │   ├── base.scss        # Base styles, loading spinner, mobile menu
    │   ├── cyberpunk.scss   # Cyberpunk theme — neon panels, chamfers, HUD
    │   ├── detective.scss   # Noir theme — aged paper, typewriter font
    │   ├── flat.scss        # Flat corporate theme — sober and direct
    │   ├── gothic.scss      # Gothic theme — serif typography, dark
    │   ├── synthwave.scss   # Synthwave theme — outrun, 80s grid, neon
    │   ├── vaporwave.scss   # Vaporwave theme — pastels, columns, sun
    │   └── win98.scss       # Windows 98 theme — classic UI, beveled buttons
    │
    ├── types/               # TypeScript type definitions
    ├── utils/               # Utilities (Supabase client)
    │
    ├── App.test.tsx         # App integration tests
    ├── App.tsx              # Root component — main state logic
    ├── declarations.d.ts    # Module declarations
    ├── index.scss           # Style entry point (imports all themes)
    ├── index.tsx            # React entry point
    ├── reportWebVitals.ts   # Performance metrics
    └── setupTests.ts        # Test environment setup
```

---

### Available Scripts

| Command | Description |
|---|---|
| `npm start` | Development server (Vite) |
| `npm run build` | Production build |
| `npm run test` | Tests in watch mode |
| `npm run test:coverage` | Test coverage (80% threshold) |
| `npm run lint` | Check for lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format code with Prettier |
| `npm run deploy` | Build + deploy to GitHub Pages |

---

### Did you enjoy the project?

If this code was useful, inspired you, or just made you smile with one of the wild themes, consider buying me a coffee ☕

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/marquesgabriel)