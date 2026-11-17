# Portfolio project deployments — 2026-11-16

Deployment scope: Ascendume, Ye Guesser, and Managy. The Vercel CLI was authenticated
as `davisernst04` and used team `davisernst04s-projects`. The portfolio itself was
not deployed as part of this change.

| Project | Public production URL | Source |
| --- | --- | --- |
| Ascendume | https://ascendume.vercel.app | https://github.com/davisernst04/ascendume |
| Ye Guesser | https://ye-guesser.vercel.app | https://github.com/davisernst04/ye_guesser |
| Managy | https://managy-snowy.vercel.app | https://github.com/davisernst04/managy |

## Build preparation

- Ascendume: updated Next.js and its ESLint configuration to 16.4.6. Database and
  authentication initialization now happen when needed instead of during module
  import. Without `DATABASE_URL` and `BETTER_AUTH_SECRET`, the landing page renders,
  session checks return no session, and protected pages continue to require sign-in.
  Auth mutations return an explicit 503 until configured. The browser uses the
  current deployment origin instead of defaulting authentication to localhost.
  The AI endpoint returns 503 when its API key is absent. No database schemas were
  changed and no credentials were added to source.
- Ye Guesser: updated Next.js and its ESLint configuration to 16.4.6, configured
  `npm ci` for Vercel, and replaced the stale pnpm lockfile with the verified npm
  lockfile. Fixed the outdated lint command and retained the game's browser-storage
  restoration behavior with a narrowly scoped lint exception. Added a retry state
  for a failed track request, so unavailable music data no longer leaves the screen
  on an indefinite loading indicator.
- Managy: updated the Next.js 15 release to 15.5.29 and its corresponding ESLint
  configuration. Deployed the Next.js frontend. The GitHub integration is connected
  with `frontend` as the Vercel project root for future builds.

Build changes and deployment notes were committed and pushed to each project's
repository. Existing project environment variables were retained; no service
credentials are stored in this document.

## Functional scope

These are public project demonstrations, not a completion of their external services.
Ascendume's saved résumés/accounts need database and auth configuration, AI enhancement
needs an API key, and PDF features retain their existing external dependencies.
Managy's frontend does not provision or deploy its Django API or database. Account,
booking, and administration workflows require a running backend configured through
`NEXT_PUBLIC_API_URL`. Ye Guesser depends on external music metadata, preview audio,
and cover-art providers.

## Portfolio changes

Project subtitles use title case while short articles and prepositions such as `a`,
`for`, and `at` remain lowercase within the subtitle. The Game Boy Emulator panel
now has only its primary Code and Live buttons. The three verified URLs are included
in their project entries, leaving Real Time Game Analysis as the only displayed
project without a live link.

## Verification

- Local production builds passed for all three applications and the portfolio.
- Portfolio lint passed. Ascendume lint passed. Ye Guesser lint passed with three
  pre-existing audio-player warnings; Managy's build reports one pre-existing
  event-page hook dependency warning.
- Public homepage, login and registration screen checks were performed where
  relevant. No account creation, database mutation, or AI generation was performed.
- Portfolio checks covered six project entries, five Live links, title-cased
  subtitles, and exactly two emulator action links at mobile and desktop widths
  in both light and dark themes.

## Verified Vercel releases

All three deployment records reached `READY`, and their public production domains
returned HTTP 200 without Vercel login. Desktop (1440px) and mobile (390px) browser
checks found no uncaught page exceptions. Ascendume's sign-in page and anonymous
session endpoint returned 200. Managy's login and registration pages returned 200.
Ye Guesser's homepage and play screen returned 200.

- Ascendume: `dpl_5LWEq565m2KDLct1Uq78LQa7cbkj`, source commit `9a98019`.
- Ye Guesser: `dpl_48xyi1kVqtKyJjYGTiNmFR9eCrRm`, source commit `a080d22`.
- Managy: `dpl_6UpDjzzpJHYfoRk46Kwdz3rGFFfQ`; uploaded frontend changes were
  saved in source commit `baa2698`.

The initial Ye Guesser release failed because Vercel selected a stale pnpm lockfile;
the successful release explicitly uses `npm ci` and the committed npm lockfile.
The legacy Managy Cloud Run origin did not respond during a 15-second read-only
check. Its public frontend is deployed, but backend workflows remain unverified.
