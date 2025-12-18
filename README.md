# Node.js + Express + TypeScript Boilerplate

Lightweight starter for building APIs with Express and TypeScript. Includes basic middleware, environment validation, linting, formatting, and a health check route.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env template and adjust as needed
   ```bash
   cp .env.example .env
   ```
3. Run in development (reloads on changes)
   ```bash
   npm run dev
   ```
4. Build and run in production
   ```bash
   npm run build
   npm start
   ```

## Available Scripts
- `npm run dev` — Start the dev server with auto-reload via tsx.
- `npm run build` — Compile TypeScript to `dist/`.
- `npm start` — Run the compiled server.
- `npm run lint` — Lint TypeScript files.
- `npm run lint:fix` — Lint and auto-fix issues.
- `npm run format` — Format with Prettier.

## Project Structure
```
src/
  app.ts             # Express app setup (middleware, routes)
  server.ts          # HTTP server bootstrap + graceful shutdown
  config/env.ts      # Environment variable loading + validation (zod)
  middleware/        # Error handling middleware
  routes/            # Route modules (includes /api/health)
  utils/logger.ts    # Simple console logger
```

## API
- `GET /` — Basic welcome message.
- `GET /api/health` — Health check with uptime + timestamp.

## Notes
- Environment variables are validated at startup. Update `.env.example` as you add more config.
- Swap `logger` with your preferred logging library when ready.
