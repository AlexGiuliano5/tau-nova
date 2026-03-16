# Sprint 26Q1-3A

## Objetivo

Dejar una primera versión visual del Home FTTH mobile, con estructura base reutilizable y sin integración de datos.

## Alcance implementado

- Se creó la ruta de feature en `app/ftth`.
- Se definió layout específico de FTTH con header y footer.
- Se implementó Home FTTH mobile v1 con bloque de bienvenida.
- Se agregaron componentes UI base para header, footer y botones de acceso visual.
- Se unificaron estilos iniciales en `app/globals.css` con tokens de color para la primera iteración.

## Decisiones tomadas

- Se trabajó mobile-first, alineado al diseño oficial.
- Esta etapa es UI-only para poder mostrar avance de experiencia visual.
- Se mantuvo separación por feature (`app/ftth`) y componentes reutilizables (`components/ui`).

## Pendientes próximos

- Definir navegación y destinos de cada acceso del Home FTTH.
- Implementar sección de gráficos y filtros visuales.
- Conectar datos mediante `actions` + `services` (vía BFF).
- Ajustar tema claro/oscuro de forma completa (tokens y comportamiento).
- Cubrir casos de loading/error y estados de interacción.
- Construir versión desktop del Home FTTH.

