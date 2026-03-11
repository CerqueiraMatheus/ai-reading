# Copilot Instructions — AI Reading

## Build, test, and lint

```sh
npm run dev          # Dev server with HMR
npm run build        # Production build (static output to build/)
npm run check        # TypeScript + Svelte type-checking
npm run preview      # Preview production build locally
```

There is no test suite. To type-check during development, run `npm run check`.

## Architecture

This is a **SvelteKit** static site (GitHub Pages) for weekly AI paper reading lists with Portuguese deep dives.

**Content system (file-based, no source code edits to add content):**
```
content/
  semana-01/
    week.json           # Week metadata + paper list
    paper-01.md         # Deep dive markdown (Portuguese)
    paper-02.md
  semana-02/
    week.json
    ...
```

- `src/lib/content/index.ts` — Content loader. Uses `import.meta.glob` to discover all `content/*/week.json` and `content/*/*.md` at build time. Exports `weeks`, `getCurrentWeek()`, `getWeek()`, `getPaper()`, `getDeepDive()`.
- `src/lib/stores/progress.ts` — Svelte writable store backed by `localStorage` (key: `ai-reading-progress`). Tracks completed papers using composite keys `weekSlug/paperId`. Exposes helpers for paper/week unlock and completion checks.
- `src/lib/types/index.ts` — `Week` and `Paper` interfaces.

**Route structure:**
- `/` — Redirects (302) to the current week (latest by `publishedAt`)
- `/semana/[slug]` — Week page: sequential paper list with unlock logic
- `/semana/[slug]/[paper]` — Paper page: embedded arXiv PDF + mdsvex deep dive + "Marcar como lido" button

Dynamic routes export `entries()` for static prerendering.

**Sequential unlock logic:** Paper N+1 requires paper N completed. Week N+1 requires all papers in week N completed. Progress persisted in `localStorage`.

**Navigation:** Sticky header with dropdown menu listing all weeks. Current week highlighted. Locked weeks shown with 🔒.

## Key conventions

- **Language:** All UI and content in **Portuguese (pt-BR)**. `app.html` sets `lang="pt-BR"`.
- **Adding a new week:** Create a new `content/semana-NN/` folder with `week.json` + `paper-NN.md` files. No source code changes needed. The content loader auto-discovers new weeks.
- **Paper IDs:** Use `paper-NN` format in `week.json` (e.g., `paper-01`). These become URL segments and deep dive filenames. Progress keys are scoped as `weekSlug/paperId` internally.
- **week.json schema:** `{ number, title, description, publishedAt, papers: [{ id, title, authors, arxivId, abstract, order }] }`. Papers must have sequential `order` values starting at 1.
- **Deep dives:** Markdown files in the week folder, processed by **mdsvex**. Target readers unfamiliar with AI — explain from the ground up.
- **arXiv:** Papers always from arXiv. `arxivId` (e.g., `2301.12345`) builds PDF/abstract URLs.
- **Svelte 5 runes:** Uses `$props()`, `$derived`, `$state`. No legacy `export let` or `$:` syntax.
- **Styling:** All in `src/app.css` with CSS custom properties. No framework.
- **Google Ads:** AdSense script in `app.html`, ad unit in `+layout.svelte`. Client ID: `ca-pub-2205226114982087`.
- **GitHub Pages deploy:** Push to `main` triggers `.github/workflows/deploy.yml`. Sets `BASE_PATH=/<repo-name>` automatically.
