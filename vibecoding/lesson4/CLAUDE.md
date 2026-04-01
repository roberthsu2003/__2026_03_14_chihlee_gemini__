# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Start development server with HMR (default: http://localhost:5173)
- `npm run build` - Type-check with TypeScript compiler, then build for production
- `npm run preview` - Preview the production build locally

## TypeScript Configuration

- Uses ES2023 target with DOM libraries
- Strict mode enabled with additional checks:
  - `noUnusedLocals: true` - Unused local variables are errors
  - `noUnusedParameters: true` - Unused function parameters are errors
  - `verbatimModuleSyntax: true` - Requires explicit `type` imports for types
  - `noUncheckedSideEffectImports: true` - Import side effects must be explicit
- Module resolution: "bundler" mode with `noEmit: true`
- Source files located in `src/` directory

## Architecture

This is a vanilla TypeScript + Vite starter template:

- **Entry point**: `src/main.ts` (loaded from `index.html`)
- **Assets**: Images and SVGs in `src/assets/`, referenced via ES module imports
- **Styling**: CSS in `src/style.css`, imported in `main.ts`
- **Counter component**: `src/counter.ts` exports `setupCounter()` for button elements
- **Public files**: Static files in `public/` directory served at root path

## Asset Handling

- Static assets (images, SVGs) should be imported as ES modules: `import heroImg from './assets/hero.png'`
- Vite handles asset references in HTML template strings
- SVG icons in `public/icons.svg` accessed via `<use href="/icons.svg#icon-name">`

## Development Notes

- TypeScript files use `.ts` extension in imports (e.g., `import { foo } from './counter.ts'`)
- Vite provides Hot Module Replacement (HMR) during development
- No test framework configured; this is a learning/exercise project

## Communication Preferences

- 所有回覆使用繁體中文
