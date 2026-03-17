# Design System

## Fuente oficial

- Figma Mobile: https://www.figma.com/design/n1G7UWL7CRogh0mLPsnwdv/TAU-2025-26-Mobile-Compartido?t=5vw33NLHcxm5om0c-0
- Figma Desktop: https://www.figma.com/design/yFakJGSPSTCjm7JbkezVrr/TAU-2026-Desktop?t=rPqpkfANNFgHJMO5-0

## Criterios de implementación

- Toda UI nueva debe basarse en Figma oficial.
- Si hay diferencias entre mobile y desktop, se prioriza mobile-first.
- No crear variantes visuales fuera del sistema acordado sin validación.
- La implementación responsiva se maneja con utilidades de Tailwind.

## Tokens y estilos activos

- La fuente de verdad de tokens y estilos globales es `app/globals.css`.
- Ahí viven colores semánticos, variantes light/dark y estilos base de tablas.
- Si se agrega o modifica un token en código, actualizar este documento en el mismo sprint.

## Tipografía

- Fuente principal: `Montserrat`, sans-serif.
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.
- Pesos usados: 400, 500, 600 y 700.
