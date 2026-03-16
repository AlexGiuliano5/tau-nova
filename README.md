# TAU Nova Frontend

Frontend de nueva generación para TAU, en proceso de migración desde `portalredes` (Angular) a Next.js.

## ¿Qué es esta aplicación?

TAU Nova es el portal web para la recolección de métricas para los elementos de red.

## Contexto rápido

- Proyecto nuevo en Next.js (no convivencia con `ppf` de proyecto angular).
- La persistencia y datos de negocio se resuelven vía BFF.
- Este repo contiene la UI y la lógica de frontend/server-side de Next.

## Stack principal

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- PrimeReact
- Recharts
- Zustand
- React Hook Form + Zod
- Biome

## Primeros pasos (local)

1. Clonar el repositorio
2. Instalar dependencias:

```npm install```

3. Levantar el proyecto:

```npm run dev```