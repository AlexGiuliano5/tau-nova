# Screen API Map

## FTTH

| Pantalla | Ruta | Estado UI | Datos/API | Endpoint(s) | Método | Auth | Cache | Notas |
|---|---|---|---|---|---|---|---|---|
| Login (ambientes bajos) | `/login` | Implementada | Integrada | `/api/v1/authenticate` (BFF) | `POST` | No requiere token para acceder. Si login OK, persiste cookie `tau_token`. | `no-store` | Envía `user` + `password` (base64). Manejo de contrato actual: `202` para cualquier error de autenticación (credenciales inválidas o backend/login). |
| Guard de acceso FTTH | `/ftth/**` | Implementado | Lectura de sesión | Cookie `tau_token` | N/A | Requiere token en cookie. Sin token redirige a `/login`. | N/A | El layout de FTTH valida sesión server-side antes de renderizar. |
| Home FTTH (mobile v1) | `/ftth` | Implementada (primera versión) | No conectado | N/A | N/A | N/A | N/A | Incluye header, footer, bienvenida y accesos visuales. Sin lógica de negocio ni navegación funcional completa. |


## Convenciones de actualización

- Cuando una pantalla tenga integración real, reemplazar `N/A` por detalle de endpoint.
- Si la pantalla consume datos por usuario/rol, documentar explícitamente `Auth` y política de cache.
- Registrar cambios de contrato/endpoint junto con la pantalla afectada.
