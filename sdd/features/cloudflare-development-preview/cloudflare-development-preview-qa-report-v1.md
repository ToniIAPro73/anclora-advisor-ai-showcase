# Cloudflare development preview — QA Report v1

**Status:** Local gates passed; publication pending  
**Date:** 2026-10-25

## Executed checks

| Check | Result | Evidence |
| --- | --- | --- |
| `npm ci` | PASS | Lockfile install completed. npm reported 4 existing dependency advisories (1 moderate, 3 high) and deprecated packages. |
| `npm run lint` | PASS | Exit code 0. |
| `npm run typecheck` | PASS | Exit code 0. |
| `npm run build` | PASS | Vite built 40 modules into `dist/`. |
| Local config structure checks | PASS | Worker name, `dist/`, SPA fallback, development-only branch gate, declared scripts, and secret/variable names checked. |
| Runtime contract | PASS | Updated to record the verified Vercel production domain and Cloudflare development-only preview; preserved the pre-existing `APPLICATION_TYPE` edit. |
| Wrangler dry-run | BLOCKED | Workspace pre-tool hook rejected `wrangler deploy --dry-run` as a deployment command. No deployment occurred. |

## Not yet verified

- Cloudflare credentials for this repository are not visible through the read-only inventory.
- No GitHub Actions run or `workers.dev` preview exists yet.
- Vercel and DNS were not changed.
- GitHub Actions credentials for this repository have not been confirmed.
