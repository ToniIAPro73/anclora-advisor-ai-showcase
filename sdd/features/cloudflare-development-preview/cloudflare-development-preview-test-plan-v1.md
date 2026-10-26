# Cloudflare development preview — Test Plan v1

## Configuration checks

- Parse `wrangler.jsonc` using the pinned Wrangler version.
- Confirm the static asset directory resolves to the Vite build output `dist/`.
- Confirm SPA fallback and the development-only Worker name.
- Confirm the workflow has a single push trigger for `development` and supplies credentials only to its deploy step.

## Application gates

- `npm run lint`
- `npm run typecheck`
- `npm run build`

The package currently declares no test script, so no test command will be invented.

## Deployment checks (after Toni validates and pushes)

- Confirm GitHub Actions succeeds on the exact `development` commit.
- Open the resulting `workers.dev` URL and verify the page renders and client-side navigation falls back to `index.html`.
- Confirm the Vercel production domain still serves the existing production deployment and DNS has not changed.
- Do not submit or create external records; the showcase uses synthetic data and requires no backend.
