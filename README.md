# Projeto - Site Empresarial

Projeto Next.js com TypeScript, Tailwind CSS e SCSS, seguindo boas práticas de arquitetura.

## Estrutura

```
PROJETO/
├── .cursor/
│   └── rules/              # Regras do Cursor (premissas do projeto)
│       ├── project-premises.mdc
│       ├── section-variants-architecture.mdc
│       ├── responsive-breakpoints.mdc
│       ├── scss-design-tokens.mdc
│       └── next-components.mdc
├── app/                    # App Router (Next.js)
│   ├── layout.tsx          # Layout raiz e metadata SEO
│   ├── page.tsx            # Home page
│   └── globals.scss        # Import dos estilos globais
├── config/
│   └── sections.json      # Variantes por seção (header, hero, footer)
├── components/
│   └── sections/          # Seções com variantes (Header, Hero, Footer)
│       ├── header/
│       ├── hero/
│       └── footer/
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

## Seções dinâmicas

Header, hero e footer têm **três variantes cada** (v1, v2, v3). A combinação usada no site é definida em `config/sections.json` (ex.: `"header": "v1", "hero": "v3", "footer": "v2"`). Para mudar a combinação, edite esse arquivo. No futuro, uma página de parâmetros poderá alterar a mesma estrutura via API. Cada seção fica em `components/sections/<secao>/` com `<Secao>V1.tsx`, `V2`, `V3` e um componente `*Section` que recebe `variant`. Ver regra `.cursor/rules/section-variants-architecture.mdc`.

## Responsividade

Três breakpoints (mobile-first): **celular** (estilos base), **tablet** (`md:` 768px), **desktop** (`lg:` 1024px). Em SCSS use `var(--breakpoint-tablet)` e `var(--breakpoint-desktop)`. Ver `.cursor/rules/responsive-breakpoints.mdc`.

## Design tokens

Altere as variáveis em `styles/tokens/_variables.scss` para customizar cores, espaçamentos, tipografia e breakpoints do site sem mexer nos componentes. A definição canônica está em `styles/tokens/design-tokens.json`. Alterações de UI/design devem ser documentadas em `docs/DESIGN-SYSTEM.md` (ver regra `.cursor/rules/design-system-and-documentation.mdc`).

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
