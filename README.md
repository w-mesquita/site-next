# Projeto - Site Empresarial

Projeto Next.js com TypeScript, Tailwind CSS e SCSS, seguindo boas práticas de arquitetura.

## Estrutura

```
PROJETO/
├── app/                    # App Router (Next.js)
│   ├── layout.tsx          # Layout raiz e metadata SEO
│   ├── page.tsx            # Home page
│   └── globals.scss        # Import dos estilos globais
├── components/
│   └── layout/             # Componentes de layout
│       └── Header/
├── styles/
│   ├── globals.scss        # Reset, Tailwind, estilos base
│   └── tokens/             # Design tokens (cores, espaçamento)
│       ├── _variables.scss
│       └── _index.scss
├── lib/                    # Utilitários
│   └── utils.ts
├── types/                  # Tipos TypeScript globais
├── public/                 # Assets estáticos
└── ...configs
```

## Design tokens

Altere as variáveis em `styles/tokens/_variables.scss` para customizar cores, espaçamentos e tipografia do site sem mexer nos componentes.

## Comandos

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — rodar build de produção
- `npm run lint` — ESLint

## Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Sass (SCSS)
