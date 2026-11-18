# Project catalog review — 2026-11-16

> **Status:** historical. The portfolio now shows six projects (Game Boy Emulator, Real Time Game Analysis, Shadow Basketball Official Page, Managy, Ye Guesser, Ascendume); see the `projects` array in `src/components/ProjectList.tsx` for the current list. The coverage table below records the full review, not the entries currently displayed.

Reviewed the 21 owned repositories returned by the authenticated GitHub connection, including private repositories. Existing Real Time Game Analysis also links to the club repository owned by ElleOwO.

## Preview captures

- Shadow Basketball: captured the homepage hero at https://basketball-registration-platform.vercel.app/ at 1440 × 810, 2× pixel density, after fonts and images loaded. Original: `public/photos/shadow-basketball-hero.png`.
- Managy: cloned `davisernst04/managy`, installed the frontend lockfile with `npm ci`, ran its Next.js development server locally, and captured the homepage at 1280 × 720, 2× pixel density. Only the Next.js developer indicator was hidden. No backend or fabricated data was needed. Original: `public/photos/managy-hero.png`.
- Both captures are regenerated as WebP by `scripts/optimize-assets.py`. Earlier source images are retained.

## Repository coverage

| Portfolio entry | Repositories |
| --- | --- |
| Game Boy Emulator | typescript_gameboy_emulator, emulator-demo, gameboy-emulator-ui |
| Real Time Game Analysis | ElleOwO/realtimegamestatistics |
| Shadow Basketball Official Page | shadow-basketball; hoops-hub-online is an earlier club-site prototype |
| Managy | managy |
| Ye Guesser | ye_guesser |
| Davis Corner | davis_corner; davis-corner is an older authentication-focused implementation |
| RTGS Dashboard Prototypes | rtgs-dashboard-prototype, rtgs_dashboard |
| Mission Control | mission-control, mission-control-api; openclaw_mission_control is an earlier implementation |
| Interactive Tree Editor | 381_a4 |
| Give Me a Hand | final-project |
| Linux Dotfiles | dotfiles |
| Personal Portfolio | portfolio |
| Ascendume | ascendume |

The account profile README (`davisernst04`) and automatically synced interview solutions (`neetcode-submissions`) are not standalone portfolio projects. Descriptions were grounded in repository READMEs and source. Entries without a captured preview use the full panel width rather than an unrelated image. Ascendume remains last.

## Public-source release

At the user's request, prepared MIT licenses and READMEs for `381_a4`, `mission-control`, `mission-control-api`, and `final-project`, and made them public. Gitleaks scanned all cloned Git history with redacted reports; no credentials were detected in these three repositories. Reviewed tracked file lists for private data and environment files. The Mission Control README explains its trusted-local-workspace scope and unauthenticated API; no service was deployed or connected to personal workspace data.

Gitleaks flagged the forum’s JWT value in `docker-compose.yml` in commit `893b6994`. Manual review confirmed an explicit placeholder in the local Compose setup, not a discovered production credential. Its README documents the development credentials and requires replacing them before real deployment. No secret values are included here.

Kept these repositories private:

- `shadow-basketball`: bundles `app/fonts/impact.ttf` without documented redistribution permission and currently declares its package unlicensed. Resolve the asset rights before publishing its history. Its existing public live link remains available; the outdated private GitHub link was removed from the portfolio.
- Older duplicate implementations: `davis-corner`, `hoops-hub-online`, and `openclaw_mission_control`. Their projects are represented by the maintained entries above.

These checks reduce publication risk but do not certify the applications' runtime security. No existing Git history was rewritten.
