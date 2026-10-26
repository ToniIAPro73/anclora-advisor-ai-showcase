# Cloudflare development preview — Specification v1

**Status:** Draft  
**Date:** 2026-10-25  
**Repository:** `anclora-advisor-ai-showcase`

## Objective

Add a Cloudflare Workers Static Assets preview for the static, synthetic-data showcase while keeping the existing Vercel production deployment unchanged.

## Scope

- Build the existing Vite application and publish `dist/` to a Cloudflare Worker from `development` only.
- Serve the preview on the Worker `workers.dev` hostname with SPA fallback.
- Use the existing `CLOUDFLARE_API_TOKEN` secret and `CLOUDFLARE_ACCOUNT_ID` variable names.
- Keep `staging`, `production`, `main`, Vercel domains, and DNS outside this pilot.

## Acceptance criteria

1. Cloudflare preview deploys only from a successful push to `development`.
2. Cloudflare serves the Vite build output from `dist/` and supports SPA fallback.
3. The preview uses a separate Worker name ending in `-development` and has no custom domain.
4. Existing Vercel production domain and deployment configuration remain unchanged.
5. No database, object storage, Redis, API, authentication, or private secret is added to the preview.
6. The workflow runs only gates declared by this repo: lint, typecheck, and build. No test script exists in the current package manifest.

## Out of scope

- Switching production hosting away from Vercel.
- Changing DNS, custom domains, application UI, or application behavior.
- Deploying Cloudflare `staging` or `production` environments.

## Risks and constraints

- The Cloudflare GitHub Actions credentials may not be configured for this repository; deployment must fail closed if unavailable.
- The deployed preview remains publicly accessible through `workers.dev`, as is the Vercel showcase. It contains synthetic data only.
- The runtime contract must record the verified Vercel production and Cloudflare development preview topology before the pilot is published.
