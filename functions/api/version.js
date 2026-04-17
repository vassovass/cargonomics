/**
 * GET /api/version
 *
 * Returns the current Cloudflare Pages build's commit SHA and branch so
 * the frontend footer can show "v7 · <sha>". Env vars are injected by
 * Cloudflare Pages automatically during build:
 *   CF_PAGES_COMMIT_SHA - full 40-char commit SHA of the build
 *   CF_PAGES_BRANCH     - branch name (main / staging / etc.)
 *
 * Local dev (python -m http.server) does NOT execute Pages Functions, so
 * the frontend fetch fails silently and the footer stays at plain "v7".
 *
 * Cached with no-store so every page load reflects the current deploy
 * without CDN staleness.
 */
export const onRequest = ({ env }) => {
  const full = env.CF_PAGES_COMMIT_SHA || "";
  const sha = full ? full.slice(0, 7) : "dev";
  const branch = env.CF_PAGES_BRANCH || "local";

  return new Response(JSON.stringify({ sha, branch, full }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
};
