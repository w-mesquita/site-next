# Design system

Referência dos tokens e padrões visuais do projeto. Alterações de UI/design devem ser registradas na seção **Registro de alterações** e refletidas nos tokens quando aplicável.

## Fontes dos tokens

| Fonte | Uso |
|-------|-----|
| `styles/tokens/design-tokens.json` | Definição canônica (formato DTCG). |
| `styles/tokens/_variables.scss` | Variáveis CSS consumidas pelos componentes (`:root` e `.dark`). |

Regras: `.cursor/rules/scss-design-tokens.mdc`, `.cursor/rules/design-system-and-documentation.mdc`.

## Tokens principais

- **Cores:** `--color-primary`, `--color-primary-hover`, `--color-primary-active`, `--color-primary-light`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`.
- **Primary em cadeia:** Apenas `--color-primary` é a cor primitiva. As demais são derivadas em `_variables.scss` com `color-mix()`: `--color-primary-hover` (primary + black), `--color-primary-active` (primary mais escuro), `--color-primary-light` (primary + white). Para mudar a cor principal do site, altere só `--color-primary`; hover, active e light atualizam em cascata.
- **Header:** `--header-height`, `--header-bg`, `--header-bg-scrolled`, `--header-text`.
- **Espaçamento:** `--spacing-xs` a `--spacing-2xl`.
- **Breakpoints:** `--breakpoint-tablet` (768px), `--breakpoint-desktop` (1024px).

## Registro de alterações

### 2025-03-06

- **Configurações globais (cor primária e logo):** Nova seção em Configurações permite ao usuário escolher a cor primária (color picker + hex) e o logo (URL ou caminho, ex.: /logo.svg). Valores persistidos no localStorage; cor aplicada em tempo real via `document.documentElement.style.setProperty("--color-primary", …)`. Logo consumido por `AppLogo` em header e footer (se vazio, exibe texto "Logo"). Tipos em `types/global-config.ts`, context em `lib/global-config-context.tsx`, leitura server em `lib/global-config.ts` e `config/global.json`.

- **Primary como cor primitiva (cascade):** Em `_variables.scss`, `--color-primary-hover`, `--color-primary-active` e `--color-primary-light` passam a ser derivadas de `--color-primary` via `color-mix()` (hover/active mais escuros, light mais claro). Basta alterar `--color-primary` para atualizar toda a família em cadeia. Em `.dark` é opcional definir outro `--color-primary`; as derivadas seguem.

- **Componente Button:** Novo componente reutilizável em `components/ui/Button.tsx`. Variantes: `primary` (fundo primary, texto branco) e `neutral` (borda, texto, estilo secundário/contato). Tamanhos: `sm`, `md`, `lg`. Estados: hover (`--color-primary-hover`), active/click (`--color-primary-active`), focus-visible (outline), disabled. Pode ser usado como `<Button href="...">` (renderiza Next.js Link) ou `<Button type="submit">` (renderiza button). Tokens adicionados: `--color-primary-active` em `_variables.scss` e `design-tokens.json` (primary.800 / action.primaryActive).

### 2025-03-05

- **Seção CTA parametrizável (CTA1):** Nova seção CTA com conteúdo editável (título, texto, action com label e link). Três variantes: CtaV1 (bloco centralizado, fundo surface, botão primary), CtaV2 (fundo primary, layout em linha com botão outline), CtaV3 (card com borda). Conteúdo em `CtaContent` (`types/sections-content.ts`), consumido via `useSectionsContent().content.cta`. Suporte em context, storage (localStorage) e leitura server-side em `getSectionsContent()`. Referência visual: estilo "Boost Your Traffic With Us" do demo Royal Elementor.

- **CTA – fundo parametrizável:** `CtaContent` ganha `backgroundImage?` e `backgroundColor?`. **V1 e V2:** fundo aplicado à seção inteira; se houver imagem, overlay para legibilidade. **V3:** fundo aplicado dentro do card; se não houver imagem nem cor, usa padrão com cor de fundo (`var(--color-surface)`) e detalhes em SVG (círculos suaves, arco, pontos) via componente `CtaDefaultBackground`. Formulário de conteúdo da CTA: nova seção "Fundo" com campos Imagem de fundo e Cor de fundo.

### 2025-03-03

- **Header ao rolar:** Ajuste do fundo do header quando a página está com scroll. Antes: aspecto de vidro (backdrop-blur). Agora: fundo branco com leve transparência (light) e superfície escura com leve transparência (dark), sem blur. Novo token `--header-bg-scrolled` em `_variables.scss` e `header.backgroundScrolled` em `design-tokens.json`. Light: `rgba(255,255,255,0.9)`; dark: `rgba(23,23,23,0.95)`. Componentes: HeaderV1, HeaderV2, HeaderV3 passam a usar `var(--header-bg-scrolled)` quando `isScrolled`.

- **Hero – fundo (Hero 1 e 2):** Inclusão de propriedades de fundo parametrizáveis no conteúdo do hero. Novos campos em `HeroContent`: `backgroundImage?: string` (imagem de fundo) e `backgroundColor?: string` (cor de fundo). Usados em HeroV1 e HeroV2. Formulário de conteúdo: seção "Imagem destaque mostrada no Hero 1" (renomeada) e nova seção "Fundo (Hero 1 e 2)" com campos "Imagem de fundo" e "Cor de fundo".

- **Hero V3 e SlideHero:** Hero V3 com slide em tela cheia e texto em overlay (estilo Hero V1). Novo componente `SlideHero` (carrossel de 3 imagens, auto-play). Conteúdo do hero ganha `slides?: { imageSrc: string }[]` para as 3 imagens do slide. Formulário: seção "Imagens do slide (Hero V3)" com 3 inputs.

- **Hero V1 – imagem destaque opcional:** Se não houver imagem de destaque (`imageSrc` vazio) ou a imagem falhar ao carregar, o bloco da imagem à direita deixa de ser exibido. O layout passa a uma única coluna (apenas texto e ações); com imagem válida mantém as duas colunas.

- **Hero 1 e 2 – imagem de fundo com overlay:** A imagem de fundo fica atrás de todos os itens (texto, decorações). Quando há `backgroundImage`, é exibida uma camada de overlay esmaecida (`color-mix(in srgb, var(--color-background) 65%, transparent)`) sobre a imagem para manter o texto legível. As decorações (blur orbs no Hero V1) permanecem visíveis entre o fundo e o overlay (z-[1]); overlay em z-[2]; conteúdo em z-10.

- **Hero – variante V3 renomeada para Slide:** A variante do hero que exibe o slide (carrossel) em tela cheia passou a se chamar **Slide** na UI e no tipo `HeroVariant` (`"v1" | "v2" | "slide"`). Em `types/sections.ts`: `SectionVariant` inclui `"slide"`; `HeroVariant` usa `"slide"` em vez de `"v3"`; criados `HERO_VARIANTS`, `SECTION_VARIANT_LABELS` e `getVariantsForSectionType()`. No formulário de configuração de páginas, ao escolher Hero a variante aparece como "Slide"; header e footer continuam com V1, V2, V3. Config antiga com hero `variant: "v3"` continua funcionando (tratada como "slide" no componente).
