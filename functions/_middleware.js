/**
 * Cloudflare Pages Functions middleware. Two responsibilities:
 *   1. Basic Auth gate for preview / staging (when BASIC_PASS is set).
 *   2. Inject the short git commit SHA into the footer version label on
 *      every HTML response.
 *
 * The commit SHA comes from env.CF_PAGES_COMMIT_SHA, which Cloudflare Pages
 * sets automatically per deployment. Staging builds carry the staging HEAD,
 * production builds carry main's HEAD, so the footer tells Vasso / Marilyn
 * exactly which deploy is being viewed and makes dev-vs-live drift visible.
 *
 * Env vars (set in Cloudflare dashboard, Pages project -> Settings ->
 * Environment variables, PREVIEW scope only, both encrypted):
 *   BASIC_USER - shared username for staging
 *   BASIC_PASS - shared password for staging
 *
 * Production stays unset, so production requests fall through with no gate
 * but still get the SHA injection.
 *
 * See:
 *   .claude/rules/deploy-protocol.md
 *   docs/infra/cloudflare-setup-runbook.md Part 5 Option B
 *   docs/prds/PRD_16_Dev_Live_Environments.md
 *   docs/deferred-items.md D33
 */

export const onRequest = async ({ request, env, next }) => {
  if (env.BASIC_PASS) {
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
  }

  const response = await next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const sha = (env.CF_PAGES_COMMIT_SHA || "").slice(0, 7);
  if (!sha) {
    return response;
  }

  return new HTMLRewriter()
    .on("span.footer__version", {
      element(el) {
        el.append(
          ` <span class="footer__commit" aria-label="commit ${sha}">\u00b7 ${sha}</span>`,
          { html: true },
        );
      },
    })
    .transform(response);
};
