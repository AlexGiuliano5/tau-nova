# Sprint 26Q1-3B

## Objetivo

Implementar autenticación base para ambientes bajos, con login por usuario/contraseña y protección de acceso a FTTH.

## Alcance implementado

- Se creó la pantalla de login en `app/login` con formulario básico (usuario y contraseña).
- Se integró el login contra BFF.
- Se implementó login con persistencia de sesión en cookie y logout que limpia sesión y redirige a `/login`.
- Se protegieron todas las rutas dentro de `/ftth`: sin token en cookie, redirige a `/login`.
- Se muestran datos del usuario en el sidebar (iniciales, nombre y legajo) a partir del token.

## Decisiones tomadas

- Se usa `BFF_API_BASE_URL` por variable de entorno.
- La sesión queda guardada en cookie con duración de 20 horas.
- Se documentó el comportamiento actual del login para respuestas inválidas y errores de backend.
