# Project Documentation

## 1. Overview

Energy Manager simulates an industrial marketplace where users create companies,
trade resources, and provision storage capacity. The API provides:

- Session-based authentication with JWT cookies.
- CRUD-style endpoints for the resource catalog.
- Company creation/listing scoped to the authenticated owner.
- Storage blueprint seeding plus ownership provisioning.
- Health, logging, rate limiting, and consistent error handling.

## 2. Architecture at a Glance

| Layer | Description |
| --- | --- |
| **Transport** | Express 5 server with Helmet, CORS, cookie parser, and morgan |
| **Domain Modules** | `modules/*` folders isolate routes, controllers, services, models, and scripts |
| **Persistence** | MongoDB via Mongoose models; connection managed in `src/utils/database.ts` |
| **Config** | Zod validates environment variables on startup (`config/env.ts`) |
| **Auth** | JWT (`token` cookie) decoded by `authGuard`, which injects `req.user` |
| **Docs** | OpenAPI 3 spec defined in `src/docs/swagger.ts`, exposed at `/docs` |

Request flow: **Router → Controller → Service → Model** with shared middleware
for logging, JSON parsing, rate limiting, and error handling.

## 3. Module Guide

- **Users & Auth (`modules/users`, `modules/auth`)**
  - `signupUser.ts` creates regular users.
  - `loginUser.ts` validates credentials and issues the JWT cookie.
  - `loginGuard.middleware.ts` verifies cookies and attaches the user payload.
  - `scripts/createAdmin.ts` seeds the initial admin user at boot.

- **Resources (`modules/resource`)**
  - REST endpoints for listing, creating, editing, and fetching resources.
  - `ResourceService` enforces validation (unit enums, duplicate names).
  - `scripts/automaticCreateResource.ts` seeds `RESOURCES` data.

- **Companies (`modules/company`)**
  - Authenticated routes to create companies and list those owned by the user.
  - Service layer validates ObjectIds, share math, taxes, and unique names.

- **Storage (`modules/storage`)**
  - `storage.service.ts` registers blueprint definitions (warehouses, tanks, etc.).
  - `storageOwnership.service.ts` retrieves and (soon) creates ownership entries.
  - `scripts/automaticallyCreateStorage.ts` seeds blueprints on startup.
  - `routes/storage.routes.ts` exposes `/api/v1/storage/create-ownership`.

- **Health (`modules/health`)**
  - Lightweight heartbeat at `/health` and `/api/health`.

- **Middleware & Utils**
  - `middleware/errorHandler.ts` normalizes API errors.
  - `middleware/rateLimiter.ts` centralizes limiter presets.
  - `utils/logger.ts` and `utils/database.ts` provide shared infrastructure.
  - `types/express/index.d.ts` augments Express so TypeScript recognizes `req.user`.

## 4. HTTP Workflow

1. Incoming requests pass Helmet, CORS, JSON parsers, cookies, and morgan logging.
2. Rate limiters are applied per router (api/auth/write/sensitive buckets).
3. Protected routes add `authGuard` to verify the `token` cookie.
4. Controllers delegate business logic to the matching service.
5. Services handle validation, call the Mongoose model, and bubble errors.
6. `notFoundHandler` and `errorHandler` shape the final error payload.

## 5. Data Models

### Resource
| field | type | notes |
| --- | --- | --- |
| `name` | string | normalized + unique |
| `description` | string | required |
| `unitOfMeasurement` | enum | see `UnitOfMeasurement` |
| `basePricePerUnit` / `pricePerUnit` | number | base vs. current price |
| `isRaw` | boolean | raw commodity flag |
| `image` | string? | optional asset |

### Company
| field | type | notes |
| --- | --- | --- |
| `name` | string | unique per owner, 5-100 chars |
| `ownerId` | ObjectId | references `User` |
| `locationId` / `industryId` | ObjectId | domain references |
| `capital` | number | derived from owner history |
| `tax` | number | percent stored as integer |
| `companyShareValue`, `totalShares`, `availableShares` | number | share math |
| `description` | string | optional |

### StorageBlueprint
Defines reusable storage catalog entries (warehouse, battery, etc.).

### StorageOwnership
Represents a user/company-owned storage asset referencing a blueprint and
storing runtime capacity, connections, and maintenance metadata.

### User
Holds profile fields, hashed password, role (`admin` / `user`), avatar, and flags
for future signup gating.

## 6. Environment & Configuration

| Variable | Description |
| --- | --- |
| `NODE_ENV` | `development`, `test`, or `production` |
| `PORT` | HTTP port (default 3000) |
| `MONGO_URI` | MongoDB connection string |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | seeded admin credentials |
| `JWT_ACCESS_TOKEN_SECRET` | secret for signing/verifying JWTs |

Environment validation happens before the server boots; missing/invalid values
throw an error with descriptive hints.

## 7. Development Workflow

1. `npm run dev` for live reload during feature work.
2. Add/modify modules under `src/modules/*`.
3. Run `npm run lint` + `npm run build` before opening PRs.
4. Deploy artifacts from `dist/`.

## 8. API Documentation

The canonical API reference is generated from `src/docs/swagger.ts` and hosted at:

```
GET /docs
```

Use it to explore responses, schemas, and required headers. Update the spec file
whenever endpoints change so consumers stay in sync.

## 9. Future Enhancements (Ideas)

- Flesh out the storage ownership service (CRUD + capacity updates).
- Add pagination/filtering to resource/company listings.
- Replace console logging with a structured logger (e.g., Pino/Winston).
- Automate integration tests for guarded routes.
