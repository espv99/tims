# TIMS — Ingeniería en Tecnologías de la Información

Sitio web oficial de la carrera de **Ingeniería en Tecnologías de la Información** de la ESPOCH, Sede Morona Santiago. Incluye un panel de administración CMS para gestionar noticias, eventos, personal docente y usuarios.

## Stack

- **Next.js 15** (App Router) · **TypeScript**
- **PostgreSQL** · **Prisma ORM**
- **NextAuth v5** (JWT + Credentials)
- **Tailwind CSS 4** · **shadcn/ui**
- **next-intl** (i18n: `es` / `en`)
- **Cloudinary** (subida de imágenes por usuario)

## Requisitos

- Node.js 18+
- PostgreSQL (o cuenta en [Neon](https://neon.tech))

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
DATABASE_URL=postgresql://...?sslmode=require
AUTH_SECRET=<string aleatorio, mínimo 32 chars>
```

Ejecutar `openssl rand -base64 32` para generar `AUTH_SECRET`.

## Instalación

```bash
npm install
npx prisma migrate dev
npx prisma db seed      # Crea usuario admin@tims.com / admin123
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
npx prisma db seed      # Sembrar usuario admin
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
| `/admin/settings` | Credenciales Cloudinary | ✓ | ✓ |

### Roles

- **ADMIN** — acceso total: CRUD completo + gestión de usuarios
- **EDITOR** — puede crear y editar contenido, sin eliminar ni gestionar usuarios
- **USER** — sin acceso al panel

### Cloudinary (subida de imágenes)

Cada usuario configura sus propias credenciales en `/admin/settings`:

1. Crear cuenta en [cloudinary.com](https://cloudinary.com)
2. Copiar **Cloud Name**, **API Key** y **API Secret**
3. Pegarlos en Configuración dentro del panel

Al crear/editar noticias, eventos o docentes, el botón **Subir imagen** usará esas credenciales para hacer un upload firmado directamente a Cloudinary.

## Estructura del proyecto

```
src/
├── app/
│   ├── admin/           # Panel CMS (layout con sidebar)
│   │   ├── events/      # CRUD eventos
│   │   ├── news/        # CRUD noticias
│   │   ├── settings/    # Config. Cloudinary por usuario
│   │   ├── teachers/    # CRUD docentes
│   │   └── users/       # Gestión usuarios (solo ADMIN)
│   ├── api/
│   │   ├── cloudinary/sign/  # Genera firma para upload
│   │   ├── events/      # REST API eventos
│   │   ├── news/        # REST API noticias
│   │   ├── teachers/    # REST API docentes
│   │   └── users/       # REST API usuarios
│   └── personal-docente/ # Página pública de docentes
├── components/
│   ├── admin/
│   │   ├── admin-sidebar.tsx     # Sidebar con navegación
│   │   └── cloudinary-upload.tsx # Componente de subida
│   └── ui/              # Componentes shadcn/ui
├── sections/            # Secciones del landing
└── auth.ts              # Configuración NextAuth
prisma/
├── schema.prisma        # Modelos: User, News, Event, Teacher
└── seed.ts              # Admin por defecto
messages/
├── es.json              # Traducciones español
└── en.json              # Traducciones inglés
```
