# Sprint 26Q1-3B

## Objetivo

Implementar autenticación base para ambientes bajos, con login por usuario/contraseña y protección de acceso a FTTH.

## Alcance implementado

- Se creó la pantalla de login en `app/login` con formulario básico (usuario y contraseña).
- Se integró el login contra BFF.
- Se implementó login con persistencia de sesión en cookie y logout que limpia sesión y redirige a `/login`.
- Se protegieron todas las rutas dentro de `/ftth`: sin token en cookie, redirige a `/login`.
- Se muestran datos del usuario en el sidebar (iniciales, nombre y legajo) a partir del token.
- Se implementó búsqueda de árbol FTTH con navegación jerárquica (`pais -> region -> subregion -> hub -> olt`) y breadcrumb dinámico.
- Se agregó pantalla placeholder de OLT en `/ftth/olt/[olt]`.
- Se incorporó cache de árbol en `localStorage` con TTL de 30 días.
- El refresh del árbol contra BFF se ejecuta solo al entrar desde login (`/ftth?refreshTree=1`).
- Se integró `OntClientCard` con `GET /api/services/ont/info/{ont}`.
- Se integró `OntInfoCard` con flujo server-side:
  - `POST /api/services/ont/LastMetricsByOnt` (entrada: `ontId`).
  - `POST /api/services/ont/InfoByOnt` (entrada: `oltId` + `ontId`).
- Se desacopló `OntInfoCard` de `ont/info/{ont}` para no depender de la respuesta de la card cliente.
- Se integró `OntMetricsCardGrid` con flujo server-side:
  - `POST /api/services/ont/LastMetricsByOnt` para resolver `oltId`.
  - `POST /api/services/ont/metricsCards` con `ontId` + `oltId`.
- En métricas se muestran `title` + `actual` + unidad; al expandir cada métrica se muestran `min/avg/max`.
- Se aplicó umbral para `ONT Rx` con colores de card (`card-green`, `card-yellow`, `card-red`) y color gris para métricas sin umbral definido.
- Se integró `OntInterrupcionesCard` con flujo server-side:
  - `POST /api/services/ont/LastMetricsByOnt` para resolver `oltId`.
  - `POST /api/services/ont/historicdown` con `ontId` + `oltId`.
- En interrupciones se muestran `status`, `date` (separada en fecha/hora), `duration`, filtro de últimas 24h y toggle a histórico completo cuando existen registros fuera de la ventana.
- Se integró `OntVecinosCard` (preview) y tabla completa con flujo server-side:
  - `POST /api/services/ont/LastMetricsByOnt` para resolver `entityId`.
  - `POST /api/services/port/metricsGrid` con `entityId = olt/slot/port`.
- En vecinos:
  - Preview con columnas `Serial`, `Estado`, `Ont Rx`, `Olt Rx`, sort y límite visual de 5 filas.
  - Tabla completa con paginación, sort y cartel de estado al clickear ícono.
  - `Ont Rx` en preview y full usa umbral visual de color con paleta `state-*`.
- Se quitó Zod en services ONT y se reemplazó por normalización/manual parsing defensivo.
- Se agregó loading por card con `Suspense` + spinner reusable (`CardSpinner`) para carga parcial de pantalla.
- Se aplicó formateo de serial desde `ponId` (ONT en hex) con mapeo de prefijos de vendor (`ALCL`, `HWTC`, `SMBS`, `TEAN`).
- Se unificó `LastMetricsByOnt` en helper compartido memoizado por request para evitar duplicar fetch base entre cards.
- Se extrajeron utilidades compartidas de mapping/normalización de `metricsGrid` para reducir duplicación en actions.
- Se añadió cache en memoria de corta vida para `metricsGrid` para mejorar transición de preview a tabla completa dentro de la misma sesión.

## Contratos de estado documentados

- `GET /api/services/ont/info/{ont}`:
  - `202`: error funcional/genérico (contrato actual del endpoint).
- `POST /api/services/ont/LastMetricsByOnt` y `POST /api/services/ont/InfoByOnt`:
  - `204`: token inválido/vencido/sin token -> redirección server-side a `/login`.
  - `206`: error interno de célula / sin datos en base.
  - `202`: error genérico.
- `POST /api/services/ont/metricsCards`:
  - `204`: token inválido/vencido/sin token -> redirección server-side a `/login`.
  - `206`: error interno de célula / sin datos en base.
  - `202`: error genérico.
- `POST /api/services/ont/historicdown`:
  - `204`: token inválido/vencido/sin token -> redirección server-side a `/login`.
  - `206`: error interno de célula / sin datos en base.
  - `202`: error genérico.
- `POST /api/services/port/metricsGrid`:
  - `204`: token inválido/vencido/sin token -> redirección server-side a `/login`.
  - `206`: error interno de célula / sin datos en base.
  - `202`: error genérico.

## Decisiones tomadas

- Utilidades HTTP comunes del BFF centralizadas en `lib/bff/http.ts` (`getBffBaseUrl`, `parseJsonResponse`, `toStringOrEmpty`) y reutilizadas por servicios de auth, árbol FTTH y ONT (evita duplicar `getBaseUrl` / parseo de JSON en cada service).
- Se usa `BFF_API_BASE_URL` por variable de entorno.
- La sesión queda guardada en cookie con duración de 20 horas.
- Se documentó el comportamiento actual del login para respuestas inválidas y errores de backend.
- Mantener `OntClientCard` y `OntInfoCard` desacopladas a nivel de origen de datos.
- Mantener `OntMetricsCardGrid` desacoplada del origen de datos de `OntClientCard`.
- Resolver auth y manejo de contratos de estado en server (`actions`), no en componentes UI.
- Mantener `no-store` para estas consultas por tratarse de datos operativos autenticados.
- Dependencias multi-API por card (estado actual y observación de arquitectura):
  - `OntInfoCard`: `LastMetricsByOnt + InfoByOnt + metricsGrid` (estado por serial).
  - `OntMetricsCardGrid`: `LastMetricsByOnt + metricsCards`.
  - `OntInterrupcionesCard`: `LastMetricsByOnt + historicdown`.
  - `OntVecinos` (preview/full): `LastMetricsByOnt + metricsGrid`.
  - Esta dependencia encadenada se considera deuda técnica para simplificar cuando se pueda separar/optimizar contratos en BFF.
