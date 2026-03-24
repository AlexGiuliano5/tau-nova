# Screen API Map

## FTTH

| Pantalla | Ruta | Estado UI | Datos/API | Endpoint(s) | Método | Auth | Cache | Notas |
|---|---|---|---|---|---|---|---|---|
| Login (ambientes bajos) | `/login` | Implementada | Integrada | `/api/v1/authenticate` (BFF) | `POST` | No requiere token para acceder. Si login OK, persiste cookie `tau_token`. | `no-store` | Envía `user` + `password` (base64). Manejo de contrato actual: `202` para cualquier error de autenticación (credenciales inválidas o backend/login). |
| Guard de acceso FTTH | `/ftth/**` | Implementado | Lectura de sesión | Cookie `tau_token` | N/A | Requiere token en cookie. Sin token o token expirado redirige a `/login`. | N/A | El layout de FTTH valida sesión server-side antes de renderizar. |
| Home FTTH (mobile v1) | `/ftth` | Implementada | Integrada | `/api/services/portal/treeFtthByUser` (BFF) | `GET` | Requiere `Authorization: Bearer <tau_token>` leído de cookie HttpOnly en server. | `no-store` | Usa cache cliente en `localStorage` por 30 días. Solo refresca contra API cuando se llega desde login con `?refreshTree=1`, evitando llamados al volver al home desde la casita. |
| Búsqueda de árbol FTTH | `/ftth/busqueda/arbol` | Implementada | Integrada (usa store/cache local del árbol) | N/A (no consume API en esta pantalla) | N/A | Requiere sesión FTTH para acceso. | Cache local (TTL 30 días) | Navegación jerárquica por query params (`pais`,`region`,`subregion`,`hub`) con breadcrumb dinámico (sin prefijo al navegar) y back al nivel anterior. |
| Detalle OLT (placeholder) | `/ftth/olt/[olt]` | Implementada (placeholder) | No conectado | N/A | N/A | Requiere sesión FTTH. | N/A | Pantalla temporal: muestra `Proximamente pantalla OLT: <nombre>` y breadcrumb estilo ONT con back a árbol. |
| Detalle ONT - pestaña Información | `/ftth/ont/[ont]/info` | Implementada | Integrada | `/api/services/ont/info/{ont}` (BFF), `/api/services/ont/LastMetricsByOnt` (BFF), `/api/services/ont/InfoByOnt` (BFF), `/api/services/ont/metricsCards` (BFF), `/api/services/ont/historicdown` (BFF), `/api/services/port/metricsGrid` (BFF) | `GET`, `POST`, `POST`, `POST`, `POST`, `POST` | Requiere `Authorization: Bearer <tau_token>` leído de cookie HttpOnly en server. Si APIs protegidas responden `204`, se redirige a `/login`. | `no-store` + cache en memoria de corta vida para `metricsGrid` | `OntClientCard` usa `ont/info/{ont}`. `OntInfoCard` usa `LastMetricsByOnt -> InfoByOnt` y obtiene `estado` desde fila coincidente de `metricsGrid` por serial. `OntMetricsCardGrid` usa `LastMetricsByOnt -> metricsCards` (con `ontId` + `oltId`), muestra `actual` y al expandir `min/avg/max`. `OntInterrupcionesCard` usa `LastMetricsByOnt -> historicdown`, filtra últimas 24h y habilita histórico completo si hay datos fuera de ventana. `OntVecinosCard` preview y tabla completa usan `LastMetricsByOnt -> metricsGrid`. Contratos actuales: `ont/info/{ont}` usa `202` para error funcional; `LastMetricsByOnt`, `InfoByOnt`, `metricsCards`, `historicdown`, `metricsGrid` usan `204` (auth/token), `206` (sin datos en base), `202` (error genérico). Nota técnica: hay cards que dependen de más de una API encadenada (`LastMetricsByOnt` + endpoint final), pero cada endpoint base se resuelve una sola vez por request/pantalla (sin duplicación intra-request). Se considera deuda a reducir cuando se estabilicen contratos del BFF. |


## Convenciones de actualización

- Cuando una pantalla tenga integración real, reemplazar `N/A` por detalle de endpoint.
- Si la pantalla consume datos por usuario/rol, documentar explícitamente `Auth` y política de cache.
- Registrar cambios de contrato/endpoint junto con la pantalla afectada.
