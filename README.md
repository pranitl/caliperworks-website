# Caliperworks Website

Marketing site for Caliperworks, built with Astro and Tailwind CSS.

The live site is served from `src/pages/index.astro`, which renders `src/layouts/LandingPage.astro`.

## Stack

- Astro 6
- Tailwind CSS 4
- Static site output via `astro build`

## Commands

All commands run from the project root.

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local Astro dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

- `src/pages/index.astro`: canonical public entry page
- `src/layouts/LandingPage.astro`: live landing page content and section data
- `src/layouts/Layout.astro`: shared document shell and meta tags
- `src/styles/global.css`: global styles

## Copy Locations

Most editable marketing copy on the live page is defined near the top of `src/layouts/LandingPage.astro`.

- `hero`: headline, subheadline, primary CTA
- `problem`: framing for the main pain point
- `solutions`: service descriptions
- `testimonials`: prior use cases and outcome callouts
- `industries`: industry-specific positioning
- `faqs`: FAQ questions and answers

Below that data block, the same file contains the rendered sections and section headings.

## Messaging Guardrails

The site should sound confident, specific, and operational.

- Emphasize collaboration, control, reliability, and staff efficiency.
- Show Caliperworks as a partner that builds with the client team, not a black-box replacement.
- Use past outcomes and case studies as real examples, not universal promises.
- Highlight practical value: fewer missed calls, cleaner follow-up, better use of staff time, stronger intake, and measured marketing gains.
- Keep CTA language calm and direct.

Avoid copy that sounds inflated or pushy.

- Avoid phrases like `free audit`, `dominate`, `hyper-optimized`, `replace your staff`, or similar hard-sell wording.
- Avoid guarantees unless they are literally true and supportable.
- Avoid vague AI claims that are not tied to a business workflow.

## Content Priorities

When updating messaging, keep these ideas visible:

- Coverage during lunch breaks, after hours, and busy periods
- Staff staying in control of scripts, routing, escalation, and review
- Existing teams working more efficiently instead of babysitting phones or repetitive admin tasks
- Clear handoffs so the business starts from a useful follow-up queue

## Routing Note

Keep only public routes in `src/pages/`.

Reusable landing content should live outside `src/pages/` so Astro does not expose it as a standalone route.
