# Auth Flow

## Resumen

Autenticación para ambientes bajos con formulario de login y sesión en cookie.

## Flujo actual

1. El usuario ingresa a `/login` y completa usuario/contraseña.
2. El frontend llama al endpoint de autenticación del BFF.
3. Si la autenticación es correcta, se guarda `tau_token` en cookie y redirige a `/ftth?refreshTree=1`.
4. Al entrar al home con `refreshTree=1`, se refresca el árbol FTTH desde BFF y se actualiza cache local (30 días).
5. Si falla el refresh del árbol, se usa cache local vigente si existe.
6. Si falla el login, se muestra mensaje en pantalla y no se redirige.
7. Desde el sidebar se puede cerrar sesión (se limpia cookie, cache local de árbol y vuelve a `/login`).

## Reglas actuales

- `202`: cualquier error de autenticación (incluye credenciales inválidas y errores backend/login).
- Duración de sesión en cookie: 20 horas.
- Todas las rutas bajo `/ftth` requieren `tau_token`; sin token redirige a `/login`.
- Además de existir cookie, el token debe no estar expirado para acceder a `/ftth/**`.
- El árbol FTTH se refresca solo en ingreso post-login (`?refreshTree=1`), no en cada visita al home.

