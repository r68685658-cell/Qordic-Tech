# Vercel Services deployment

The repository root contains the Vite frontend (`package.json`, `index.html`,
`vite.config.js`, and `src/`). The FastAPI service is in `backend/`; its
application is exported from `backend/app/main.py` as `app`.

## Service routing

The root `vercel.json` defines two services:

- `app`: repository root `.`, Vite build command `npm run build`, output
  directory `dist`.
- `backend`: root `backend`, FastAPI entrypoint `app.main:app`.

Public rewrite order is significant. `/api` and `/api/...` go to `backend`;
the catch-all goes to `app`. The frontend service rewrites unmatched website
routes to `/index.html` so React Router routes work on refresh. The backend
receives the original `/api/...` path. Its existing routes already use the
`/api` prefix, so no additional prefix is added and paths do not become
`/api/api/...`.

Both services are public on their respective paths; there are no internal
service bindings. Admin API routes remain under `/api/admin/...` and enforce
the backend's existing authentication.

## Environment variables

Add these in Vercel Project Settings → Environment Variables, scoped to the
appropriate service and deployment environments:

**Frontend (`app`)**

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_API_BASE_URL` is optional; the frontend defaults to the same-origin
  `/api` path. Only set it if using a backend hosted at a separate HTTPS origin.

EmailJS values are browser-facing public configuration. Do not put an EmailJS
private key or Gmail password in frontend variables.

**Backend (`backend`)**

- `QORDIC_ADMIN_PASSWORD` — unique, long administrator password.
- `QORDIC_JWT_SECRET` — unique random secret of at least 32 bytes.
- `QORDIC_AI_API_KEY` — optional provider key; without it, AI provider features
  remain unavailable.
- `QORDIC_AI_BASE_URL`, `QORDIC_AI_CHAT_MODEL`, and
  `QORDIC_AI_EMBEDDING_MODEL` — optional provider settings.
- `QORDIC_ALLOWED_ORIGINS` — only needed for cross-origin browser requests;
  same-origin `/api` requests through Vercel do not require CORS.

Keep all backend credentials in backend/server environment settings. Never
commit `.env.local`, `backend/.env`, API keys, passwords, or JWT secrets.

## Storage limitation to address before production

The backend currently stores conversations, knowledge, and inquiries in a
local SQLite file under `backend/data` by default. Vercel's function filesystem
is not durable shared storage across invocations/deployments. Do not rely on
this SQLite file for persistent production records; migrate the storage layer
to a managed persistent database before using the backend for production data.

## Deploy and verify

1. Import the Git repository into Vercel and select **Services** as the project
   framework/configuration mode.
2. Keep the project root at `.` so the root `vercel.json` can define both
   services. Vercel uses the service roots in that file for each build.
3. Confirm `app` uses `npm run build` and `dist`, and `backend` uses
   `app.main:app` with dependencies from `backend/requirements.txt`.
4. Add the environment variables above to the appropriate service scopes.
5. Review the routing configuration and deploy only after confirming the
   service names, public paths, and security settings.
6. Verify `/`, a client route such as `/contact` after refresh, and
   `/api/health`. Confirm API requests return JSON rather than the frontend
   HTML. Also inspect the app and backend build/runtime logs.

This repository configuration has not been deployed to Vercel. A successful
local build does not verify the Vercel project settings or a live deployment.
