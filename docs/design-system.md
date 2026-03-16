## Fuente oficial de diseño

- Figma Mobile: https://www.figma.com/design/n1G7UWL7CRogh0mLPsnwdv/TAU-2025-26-Mobile-Compartido?t=5vw33NLHcxm5om0c-0
- Figma Desktop: https://www.figma.com/design/yFakJGSPSTCjm7JbkezVrr/TAU-2026-Desktop?t=rPqpkfANNFgHJMO5-0

## Regla de implementación

- Toda UI nueva debe implementarse en base a Figma oficial.
- Si existe diferencia entre Mobile y Desktop, priorizar Mobile y escalar hacia desktop (mobile-first).
- No inventar variantes visuales fuera del sistema definido en Figma sin validar con el equipo.
- En Tailwind, definir estilos base para mobile y usar breakpoints (`md`, `lg`, etc.) como mejora progresiva.

## Breakpoints de referencia

- Mobile: hasta 767px
- Tablet: 768px a 1023px
- Desktop: 1024px en adelante

---

## Colores - Mobile

### Light Mode

- Primary: `#189AE0`
- Primary-2: `#0076C7`
- Secondary: `#3D00A9`
- Secondary-2: `#052C50`
- Background: `#F7F7F7`
- Card: `#FFFFFF`
- Outline: `#E3DEE8`
- Divider: `#929292`
- Text: `#000000`
- Text-secondary: `#3A3A3A`

### Tabla

- Header: `#F8FAFC`
- Stroke: `#E2E8F0`
- Content: `#FFFFFF`

### Dark Mode

- Primary: `#3D00A9`
- Primary-2: `#281E5A`
- Secondary: `#140232`
- Secondary-2: `#A07AF8`
- Background: `#121212`
- Card: `#1F1F1F`
- Outline: `#E3DEE8`
- Divider: `#929292`
- Text: `#F5F5F5`

### Tabla

- Header: `#2B2B2B`
- Stroke: `rgba(242, 242, 242, 0.25)`
- Content: `#1F1F1F`

---

## Colores - Desktop

### Light Mode

- Primary: `#0076C7`
- Secondary: `#3D00A9`
- Background: `#F7F7F7`
- Card: `#FFFFFF`
- Outline: `#E3DEE8`
- Divider: `#929292`
- Text: `#000000`
- Text-secondary: `#3A3A3A`

### Tabla

- Header: `#F8FAFC`
- Stroke: `#E2E8F0`
- Content: `#FFFFFF`

### Dark Mode

- Primary: `#0076C7`
- Secondary: `#A07AF8`
- Background: `#121212`
- Card: `#1F1F1F`
- Outline: `#E3DEE8`
- Divider: `#929292`
- Text: `#F5F5F5`
- Text-secondary: `#D0D0D0`

### Tabla

- Header: `#2B2B2B`
- Stroke: `rgba(242, 242, 242, 0.25)`
- Content: `#1F1F1F`

---

## Tipografía

- Font family principal: `Montserrat`, sans-serif
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`

### Pesos habilitados

- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
