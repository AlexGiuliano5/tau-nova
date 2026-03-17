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

3. Crear archivo de entorno local a partir del ejemplo:

```bash
# Opcion 1 (si tu shell soporta cp)
cp .env.example .env.local

# Opcion 2
# duplicar .env.example y renombrarlo a .env.local
```

4. Completar `BFF_API_BASE_URL` en `.env.local` con la URL del ambiente que corresponda.

5. Levantar el proyecto:

```npm run dev```

## Variables de entorno

- `BFF_API_BASE_URL`: URL base del BFF (ej: `https://tau-bff.telecom.com.ar/`)

## Notas

- `.env.local` es local de cada desarrollador y no se versiona.
- `.env.example` se versiona como plantilla para el equipo.