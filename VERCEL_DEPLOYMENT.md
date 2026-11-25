# Vercel deployment

## Project settings

The Vite frontend is the project in this directory (`react-app`): it contains
`package.json`, `index.html`, `vite.config.js`, and `src/`. The FastAPI
application is in the separate `backend/` directory and is not part of this
frontend build.

Configure the Vercel project as follows:

- **Root Directory:** `react-app` when the connected Git repository is rooted
  at the directory containing this folder. If the repository itself is this
  directory, leave Root Directory at `./`.
- **Framework Preset:** Vite.
- **Build Command:** `npm run build`.
- **Output Directory:** `dist`.
- **Install Command:** leave the Vercel default for npm / `package-lock.json`.

The existing Vite configuration uses Vite's default `dist` output directory.
The deployment rewrite sends non-API paths to `/index.html`, allowing the SPA
and its React Router routes to load on direct visits and refreshes. Paths under
`/api` are deliberately excluded from that fallback.

## Environment variables

Configure these in **Vercel Project Settings → Environment Variables** for each
environment that needs them:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_API_BASE_URL` when the frontend needs to call a separately deployed
  FastAPI backend.

Use the real values from your provider and backend deployment. Do not commit
`.env.local`, EmailJS private keys, Gmail passwords, or other credentials.
`VITE_API_BASE_URL` must be the actual HTTPS origin for the separately hosted
FastAPI service; no production backend URL is configured or assumed here. The
development proxy in `vite.config.js` only applies to the local Vite server and
does not deploy the FastAPI application.

## Connect and deploy

1. In Vercel, create a project and import the Git repository containing this
   frontend.
2. Set **Root Directory** to `react-app` if the repository contains this folder
   beneath its root; otherwise use `./` when this directory is the repository
   root.
3. Confirm the Vite preset, `npm run build`, and `dist` output directory.
4. Add the required environment variables for Preview and Production as
   appropriate. Save the settings.
5. Deploy the project. Later configuration or environment changes require a
   new deployment: push a commit or use **Deployments → Redeploy** in Vercel.

## Verify the deployment

After deployment, open the assigned production URL and confirm that the home
page loads. Also open a known client route such as `/services`, `/contact`, or
`/start-project`, then refresh that route. It should still serve the React app.
Confirm static assets load and, if the backend URL is configured, verify the
site's AI/backend features separately.

The SPA rewrite does not proxy `/api` to FastAPI. Deploy the backend separately
and set `VITE_API_BASE_URL` to its actual origin in Vercel. Without that
configuration, API requests cannot reach the local development backend.

If the deployment still returns `404 NOT_FOUND`, check that the URL belongs to
the intended Vercel project and deployment, the deployment status is **Ready**,
and the configured Root Directory contains this `package.json` and `index.html`.
Then open the deployment's **Build Logs** and **Function Logs** (if applicable)
to check for a failed build or routing issue. Also check that the domain is
assigned to the intended project and whether deployment protection is enabled.
