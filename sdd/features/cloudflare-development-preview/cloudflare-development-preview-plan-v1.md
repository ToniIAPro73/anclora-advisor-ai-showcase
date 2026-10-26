# Cloudflare development preview — Plan v1

1. Record Vercel as the existing production provider and Cloudflare as a development-only preview in the runtime contract.
2. Add Wrangler configuration for the existing Vite `dist/` output, SPA fallback, and a dedicated development Worker name.
3. Add a GitHub Actions workflow triggered only by pushes to `development`.
4. Run the repository's declared lint, typecheck, and build gates before the deployment step.
5. Validate the Wrangler configuration without deploying. After Toni reviews and validates the local change, commit and push to `development`; the workflow will publish only the Cloudflare development preview.
6. Inspect the `workers.dev` preview. Keep Vercel and DNS unchanged; do not promote this pilot to Cloudflare production.
