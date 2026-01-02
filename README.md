# Energy Manager API

TypeScript + Express service that powers the Energy Manager platform. It exposes
authenticated company management, resource catalogs, and storage provisioning
while enforcing rate limits, JWT cookie auth, and automatic seeding for core
domain data.

## Stack Highlights

- Express 5 with strongly typed controllers and middleware
- MongoDB via Mongoose models for users, companies, resources, and storage
- JWT authentication stored inside an HttpOnly cookie + auth guard middleware
- Automatic seeding for resources, storage blueprints, and the first admin user
- Zod-powered environment validation (`src/config/env.ts`)
- Centralised error/rate-limit middleware and graceful shutdown logic
- Interactive OpenAPI documentation served at [`/docs`](#documentation)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   ```bash
   cp .env.example .env
   # update MongoDB URI, admin credentials, JWT secret, etc.
   ```
3. **Run locally (watches for changes)**
   ```bash
   npm run dev
   ```
4. **Build and run production bundle**
   ```bash
   npm run build
   npm start
   ```

On boot, the server connects to MongoDB, seeds reference data, and registers a
default admin by using `ADMIN_EMAIL`/`ADMIN_PASSWORD`.

## Documentation

- **API reference**: http://localhost:`PORT`/docs (Swagger UI generated at runtime)
- **Project overview**: [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md)

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server via `tsx watch` |
| `npm run build` | Type-check and transpile to `dist/` |
| `npm start` | Run the compiled server |
| `npm run lint` / `lint:fix` | ESLint in flat config mode |
| `npm run format` | Prettier across the workspace |

## Project Structure

```
src/
  app.ts                 # Express app + middleware, routers, Swagger UI
  server.ts              # Bootstrap (DB connection, seeds, graceful shutdown)
  config/env.ts          # Zod environment schema
  docs/swagger.ts        # OpenAPI 3.0 document used by /docs
  middleware/            # error handler, rate limiter, auth guard types
  modules/
    auth/                # login guard middleware
    company/             # controllers, services, Mongoose model
    resource/            # catalog CRUD + seeding
    storage/             # blueprint + ownership services/controllers
    users/               # signup/login + admin bootstrap
    health/              # simple heartbeat route
  utils/                 # logger, Mongo connection helper
  types/express/         # Augments Express Request with `user`
```

## Data Seeding Workflow

During startup the following scripts execute automatically:

- `createAutomaticallyRessource` seeds the base resource catalog.
- `seedStorageBlueprintsOnStartup` registers reusable storage blueprints.
- `createAdminAtStartup` ensures an admin account exists based on env vars.

Run the server once after configuring `.env` so MongoDB is populated.

## Notes

- Rate limiting is configured via `src/middleware/rateLimiter.ts` and can be
  tuned per route grouping.
- Cookie-based JWT auth relies on HTTPS + `sameSite=lax`. Switch to `secure: true`
  when deploying behind TLS.
- Extend or refine API docs by editing `src/docs/swagger.ts`; `/docs` hot-reloads
  on restart.
