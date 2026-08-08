# Instituto Pedagógico del Río

Sitio web institucional (preescolar y primaria). Página estática, sin backend ni base de datos.

## Estructura

```
.
├── index.html          # Página principal
├── assets/
│   ├── css/style.css   # Estilos
│   └── js/script.js    # Interactividad (menú, scroll, animaciones)
├── robots.txt
├── serve.json           # Cabeceras HTTP (seguridad y caché) para el servidor de producción
└── package.json         # Dependencia y comando de arranque para el hosting
```

## Desarrollo local

No requiere build. Para probarlo con el mismo servidor que se usa en producción:

```bash
npm install
PORT=3000 npm start
```

Abre `http://localhost:3000`.

## Despliegue (Railway)

1. Conecta este repositorio en Railway (New Project → Deploy from GitHub repo).
2. Railway detecta `package.json`, instala dependencias y ejecuta `npm start`, que sirve el sitio con [`serve`](https://github.com/vercel/serve) aplicando las cabeceras definidas en `serve.json`.
3. Dominio: `ipr.udsg.dev` (configurado como Custom Domain en Railway, con un registro CNAME en el proveedor de DNS apuntando al host que Railway indique).

## Seguridad

- Sitio 100% estático: no hay formularios, backend, ni manejo de datos de usuario, por lo que la superficie de ataque es mínima.
- `serve.json` fija cabeceras de seguridad HTTP en cada respuesta: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security`.
- La dependencia (`serve`) está fijada a una versión exacta en `package.json` para evitar instalar versiones nuevas sin revisar.
- El repositorio es privado; el hosting (Railway) accede a él mediante su propia integración de GitHub, sin exponer el código públicamente.
