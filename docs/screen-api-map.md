# Screen API Map

## FTTH

| Pantalla | Ruta | Estado UI | Datos/API | Endpoint(s) | Método | Auth | Cache | Notas |
|---|---|---|---|---|---|---|---|---|
| Login (ambientes bajos) | `/login` | Implementada | Integrada | `/api/v1/authenticate` (BFF) | `POST` | No requiere token para acceder. Si login OK, persiste cookie `tau_token`. | `no-store` | Envía `user` + `password` (base64). Manejo de contrato actual: `202` para cualquier error de autenticación (credenciales inválidas o backend/login). |
| Guard de acceso FTTH | `/ftth/**` | Implementado | Lectura de sesión | Cookie `tau_token` | N/A | Requiere token en cookie. Sin token o token expirado redirige a `/login`. | N/A | El layout de FTTH valida sesión server-side antes de renderizar. |
| Home FTTH (mobile v1) | `/ftth` | Implementada | Integrada | `/api/services/portal/treeFtthByUser` (BFF) | `GET` | Requiere `Authorization: Bearer <tau_token>` leído de cookie HttpOnly en server. | `no-store` | Usa cache cliente en `localStorage` por 30 días. Solo refresca contra API cuando se llega desde login con `?refreshTree=1`, evitando llamados al volver al home desde la casita. |
| Búsqueda de árbol FTTH | `/ftth/busqueda/arbol` | Implementada | Integrada (consume precarga del home/cache local) | `/api/services/portal/treeFtthByUser` (BFF) | `GET` | Requiere `Authorization: Bearer <tau_token>` leído de cookie HttpOnly en server. | `no-store` | Navegación jerárquica por query params (`pais`,`region`,`subregion`,`hub`) con breadcrumb dinámico (sin prefijo al navegar) y back al nivel anterior. |
| Detalle OLT (placeholder) | `/ftth/olt/[olt]` | Implementada (placeholder) | No conectado | N/A | N/A | Requiere sesión FTTH. | N/A | Pantalla temporal: muestra `Proximamente pantalla OLT: <nombre>` y breadcrumb estilo ONT con back a árbol. |


## Convenciones de actualización

- Cuando una pantalla tenga integración real, reemplazar `N/A` por detalle de endpoint.
- Si la pantalla consume datos por usuario/rol, documentar explícitamente `Auth` y política de cache.
- Registrar cambios de contrato/endpoint junto con la pantalla afectada.
