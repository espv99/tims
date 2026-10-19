# TIMS — Ingeniería en Tecnologías de la Información

Sitio web oficial de la carrera de **Ingeniería en Tecnologías de la Información** de la ESPOCH, Sede Morona Santiago. Incluye un panel de administración CMS para gestionar noticias, eventos, personal docente y usuarios.

## Stack

- **Next.js 15** (App Router) · **TypeScript**
- **Supabase** (PostgreSQL, Auth y Storage) · **Prisma ORM**
- **Tailwind CSS 4** · **shadcn/ui**
- **next-intl** (i18n: `es` / `en`)

## Requisitos

- Node.js 18+
- Un proyecto en [Supabase](https://supabase.com)

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon / publishable key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key, solo servidor>
DATABASE_URL=<conexión del pooler de Supabase, puerto 6543>
DIRECT_URL=<conexión directa, usada por prisma migrate>
```

Las claves están en Supabase, en **Project Settings → API**. `SUPABASE_SERVICE_ROLE_KEY` es secreta: nunca la subas a git ni le pongas el prefijo `NEXT_PUBLIC_`. En `.env.example` hay una plantilla.

Obligatorias para el seed: `ADMIN_EMAIL` y `ADMIN_PASSWORD` (mínimo 12 caracteres). No hay valores por defecto: escríbelas en `.env`, nunca en el código.

### Configuración en Supabase

1. Crear un bucket de Storage público llamado `media`.
2. Aplicar las migraciones y crear el admin (ver Instalación).

## Instalación

```bash
npm install
npx prisma migrate deploy
npx prisma db seed      # Crea el admin en Supabase Auth y en la tabla User
npm run dev
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint

npx prisma generate     # Regenerar cliente Prisma
npx prisma migrate dev  # Aplicar migraciones
npx prisma db seed      # Crear el usuario admin
npx prisma studio       # GUI de base de datos
```

## Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/timeline` | Cronograma (noticias + eventos) |
| `/personal-docente` | Directorio de docentes |
| `/club` | Club TIMS |
| `/consejo-estudiantil` | Consejo estudiantil |
| `/login` | Inicio de sesión |

## Panel de administración

Acceso en `/admin`. Requiere rol **ADMIN** o **EDITOR**.

| Ruta | Descripción | ADMIN | EDITOR |
|---|---|---|---|
| `/admin` | Dashboard con estadísticas | ✓ | ✓ |
| `/admin/news` | Gestión de noticias | ✓ CRUD | ✓ crear/editar |
| `/admin/events` | Gestión de eventos | ✓ CRUD | ✓ crear/editar |
| `/admin/teachers` | Gestión de docentes | ✓ CRUD | ✓ crear/editar |
| `/admin/users` | Gestión de usuarios y roles | ✓ solo ADMIN | ✗ |

### Roles

- **ADMIN** — acceso total: CRUD completo + gestión de usuarios
- **EDITOR** — puede crear y editar contenido, sin eliminar ni gestionar usuarios
- **USER** — sin acceso al panel

### Autenticación

El inicio de sesión usa Supabase Auth (correo y contraseña). El rol vive en la tabla `User` de Prisma, cuyo `id` es el mismo que el del usuario en Supabase Auth. Los usuarios se crean desde `/admin/users`, que los registra en ambos lados.

### Subida de imágenes

Al crear o editar noticias, eventos o docentes, el botón **Subir imagen** sube el archivo directo al bucket público `media` de Supabase Storage. El servidor firma la subida en `/api/storage/sign`, solo para ADMIN y EDITOR.

## Estructura del proyecto

```
src/
├── app/
│   ├── admin/           # Panel CMS (layout con sidebar)
│   │   ├── events/      # CRUD eventos
│   │   ├── news/        # CRUD noticias
│   │   ├── teachers/    # CRUD docentes
│   │   └── users/       # Gestión usuarios (solo ADMIN)
│   ├── api/
│   │   ├── me/          # Sesión actual (usada por el cliente)
│   │   ├── storage/sign/ # Firma la subida a Supabase Storage
│   │   ├── events/      # REST API eventos
│   │   ├── news/        # REST API noticias
│   │   ├── teachers/    # REST API docentes
│   │   └── users/       # REST API usuarios
│   └── personal-docente/ # Página pública de docentes
├── components/
│   ├── admin/
│   │   ├── admin-sidebar.tsx     # Sidebar con navegación
│   │   └── supabase-upload.tsx   # Componente de subida
│   └── ui/              # Componentes shadcn/ui
├── sections/            # Secciones del landing
├── utils/supabase/      # Clientes de Supabase (browser, server, admin)
├── middleware.ts        # Refresca la sesión de Supabase
└── auth.ts              # auth(): sesión + rol desde Prisma
prisma/
├── schema.prisma        # Modelos: User, News, Event, Teacher
└── seed.ts              # Admin por defecto
messages/
├── es.json              # Traducciones español
└── en.json              # Traducciones inglés
```
