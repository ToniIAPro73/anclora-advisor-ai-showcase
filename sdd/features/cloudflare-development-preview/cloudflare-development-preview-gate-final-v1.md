# Cloudflare development preview — Final Gate v1

**Status:** PENDING — local implementation is prepared; the pilot is not published.

## Passed

- The application is a static Vite/React showcase with synthetic data and no runtime database, API, auth, or object storage requirement.
- The runtime contract now records Vercel as production and Cloudflare as a development-only preview; the pre-existing `APPLICATION_TYPE` change remains intact.
- Lint, typecheck, build, and local config structure checks passed.
- The new workflow is scoped to pushes on `development`; the Worker is named `anclora-advisor-ai-showcase-development` and uses `workers.dev`.
- The pilot configuration does not modify Vercel settings, custom domains, or DNS.

## Blocking items

1. Wrangler dry-run could not be executed because the workspace hook classified the command as a live deployment. No deployment occurred.
2. GitHub Actions credentials for this repository have not been confirmed.
3. After Toni reviews the local changes, the development commit/push can run GitHub Actions. The `workers.dev` behavior can only be verified after that workflow succeeds.

## Decision

Do not promote this pilot to Cloudflare production and do not change DNS as part of this gate.
