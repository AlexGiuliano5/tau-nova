# Auth Flow

## Resumen

Autenticación para ambientes bajos con formulario de login y sesión en cookie.

## Flujo actual

1. El usuario ingresa a `/login` y completa usuario/contraseña.
2. El frontend llama al endpoint de autenticación del BFF.
3. Si la autenticación es correcta, se guarda `tau_token` en cookie y redirige a `/ftth`.
4. Si falla, se muestra mensaje en pantalla y no se redirige.
5. Desde el sidebar se puede cerrar sesión (se limpia cookie y vuelve a `/login`).

## Reglas actuales

- `202`: cualquier error de autenticación (incluye credenciales inválidas y errores backend/login).
- Duración de sesión en cookie: 20 horas.
- Todas las rutas bajo `/ftth` requieren `tau_token`; sin token redirige a `/login`.

