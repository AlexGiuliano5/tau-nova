# Screen API Map

## FTTH

| Pantalla | Ruta | Estado UI | Datos/API | Endpoint(s) | Método | Auth | Cache | Notas |
|---|---|---|---|---|---|---|---|---|
| Home FTTH (mobile v1) | `/ftth` | Implementada (primera versión) | No conectado | N/A | N/A | N/A | N/A | Incluye header, footer, bienvenida y accesos visuales. Sin lógica de negocio ni navegación funcional completa. |

## Convenciones de actualización

- Cuando una pantalla tenga integración real, reemplazar `N/A` por detalle de endpoint.
- Si la pantalla consume datos por usuario/rol, documentar explícitamente `Auth` y política de cache.
- Registrar cambios de contrato/endpoint junto con la pantalla afectada.
