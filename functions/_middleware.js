/**
 * Cloudflare Pages Functions middleware: Basic Auth gate for preview / staging.
 *
 * Self-disables when BASIC_PASS env var is unset (production environment),
 * so only preview URLs prompt for credentials. One prompt per browser
 * session; creds cached in browser credential store until cleared.
 *
 * Env vars (set in Cloudflare dashboard, Pages project -> Settings ->
 * Environment variables, PREVIEW scope only, both encrypted):
 *   BASIC_USER - shared username for staging
 *   BASIC_PASS - shared password for staging
 *
 * Production stays unset, so production requests fall through with no gate.
 *
 * See:
 *   .claude/rules/deploy-protocol.md
 *   docs/infra/cloudflare-setup-runbook.md Part 5 Option B
 *   docs/prds/PRD_16_Dev_Live_Environments.md
 */

export const onRequest = async ({ request, env, next }) => {
  // Production env has no BASIC_PASS; skip auth, serve normally.
  if (!env.BASIC_PASS) {
    return next();
  }

  const auth = request.headers.get("Authorization");
  const expected = "Basic " + btoa(`${env.BASIC_USER}:${env.BASIC_PASS}`);

  if (auth !== expected) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Cargonomics Staging"',
        "Cache-Control": "no-store",
      },
    });
  }

  return next();
};
