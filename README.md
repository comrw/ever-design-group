# Ever Design Group — website

One-page website for Ever Design Group (Kigali, Rwanda), built from the approved
Figma design: [Ever-Design-Website](https://www.figma.com/design/FiYHt7q6VFbZyxqvlLi5E0/Ever-Design-Website)
(desktop frame `22:2`, mobile frame `22:3`, motion reference `24:111`, notes `24:266`).

Next.js 15 (App Router) · TypeScript · CSS Modules · GSAP ScrollTrigger · Inter bundled locally.

## Run it locally

Requirements: Node.js 20 or newer, npm.

```bash
npm install
npm run dev          # http://localhost:3000 (development)
```

Production build:

```bash
npm run build
npm start            # http://localhost:3000
```

`npm run lint` runs ESLint. Don't run `npm run build` while `npm run dev` is running;
both use `.next/`, and the dev server will start returning errors until it's restarted.

## Configuration

Copy `.env.example` to `.env.local` and set what you have. All values are
`NEXT_PUBLIC_*`, which means they are compiled into the page: **rebuild and redeploy
after changing them.**

| Variable | Purpose | When empty |
| --- | --- | --- |
| `NEXT_PUBLIC_FILM_SRC` | URL of the film (MP4/WebM) for "From first line to final detail" | Poster only. The play mark is decorative, there is no play control, and the caption says "Film coming soon". |
| `NEXT_PUBLIC_FILM_TYPE` | Optional MIME type, e.g. `video/mp4` | Browser detects it |
| `NEXT_PUBLIC_FILM_CAPTIONS_SRC` | Optional WebVTT captions file, shown by default | No captions track |
| `NEXT_PUBLIC_FILM_CAPTIONS_LANG` | Captions language code | `en` |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | URL that accepts a JSON `POST` of `{ name, email, location, project }` and returns 2xx on success (e.g. a Formspree or Basin form endpoint, or your own API) | The form still validates, then states plainly that the enquiry **has not been sent** because online enquiries are not connected. |

The film player opens only on click or tap, plays with native controls (and captions
when supplied), pauses when it scrolls out of view, and shows an error if the file
can't load. The form only shows "Thank you" after the endpoint returns a 2xx status;
any other response shows a failure message and keeps what the visitor typed.

If the endpoint is on another domain, it must allow CORS `POST` requests from the site's
domain (form services do this by default).

## Still to supply

- **Film:** no footage has been supplied yet. Set `NEXT_PUBLIC_FILM_SRC` (and
  ideally captions) when it exists.
- **Enquiry destination:** set `NEXT_PUBLIC_ENQUIRY_ENDPOINT`.
- **Contact details:** none are published. The design only states "Kigali, Rwanda";
  add verified details yourself if you want them on the site.

## Project structure

```
src/app/            layout (fonts, metadata), page composition, global tokens
src/app/fonts/      Inter Regular + Medium (woff2, SIL OFL — see Inter-LICENSE.txt)
src/components/     one component + CSS module per Figma section
src/lib/config.ts   environment configuration (film, enquiry endpoint)
src/lib/motion.ts   GSAP registration and the reduced-motion-aware scroll hook
public/images/      concept imagery, film poster and play-mark SVGs, downloaded from Figma
public/brand/       original Ever Design Group logo, downloaded from Figma
```

### Layout approach

Sizes are authored in Figma pixels. `--u` (in `globals.css`) is one Figma pixel scaled
to the layout width: the 390px mobile frame below 1024px (capped at 624px wide for
tablets) and the 1440px desktop frame from 1024px up. At exactly 390px and 1440px the
page matches the Figma frames. Small text (≤ 17px) stays fixed in px so it remains
readable at in-between sizes.

On mobile, Studio comes before Film; on desktop, Film comes before Studio, as in the
two Figma frames.

### Motion and accessibility

Motion follows the Figma timeline (`24:111`) but is driven by scroll, not time:

- **Hero:** the live-text "ever" rises behind the roofline once on load (CSS), then sinks
  back behind the roof as the hero scrolls away. Background and foreground use the
  same image in one shared box, so the roofline crop always lines up.
- **Approach:** the three concept cards slide in from the right with +12° extra rotation,
  staggered, scrubbed to scroll position.
- **Destinations:** on desktop with a mouse, hover or focus changes the row and preview, and
  the preview eases after the pointer. On touch, tapping a row updates the fixed preview.
- **Featured retreat:** the detail notes lift into place on scroll. The hotspot toggles the
  material note (Enter/Space; Escape closes and keeps focus on the hotspot).

With `prefers-reduced-motion: reduce`, all motion is skipped and every element is
shown in its final, complete state. Everything works with the keyboard (skip link,
visible focus rings, real buttons and links) and on touch devices. All imagery keeps
its "illustrative concept" labels.

## Assets

All imagery, the logo and the play-mark SVGs were downloaded from the Figma file and
are stored in `public/`. Nothing has been swapped for stock imagery. The logo is shown
with `object-fit: contain`, so its aspect ratio is preserved.

## Multipage extension

Branch `feat/multipage` extends `feat/website` while preserving the approved homepage composition and original motion. The primary nav now opens Home, Developments, Services and Studio. The mobile menu and shared footer expose the complete site.

Routes: `/about`, `/services` and five service detail pages, `/process`, `/developments` and seven project detail pages, `/portfolio` (filterable), `/areas` and six place pages, `/films`, `/contact`. `/studio` and `/villa-tours` redirect to the matching pages. Project enquiries preserve their context in the contact form.

Content is centralized in `src/content/ever.ts`. Shared page pieces are in `Editorial.tsx`, with GSAP reveal and image motion in `PageExperience.tsx`. Reduced-motion mode and no-JavaScript output keep editorial content visible. The original homepage components and motion remain in place. New pages use fluid layouts rather than extending the original fixed Figma section heights.

Source content and media provenance: `docs/content-sources.md` and `docs/media-sources.json`. Assets live in `public/source/images`; the Cottage project video is `public/videos/cottage-hillside.mp4`. Run `npm ci`, `npm run dev`, then open http://localhost:3000. Configuration for film and enquiry delivery is unchanged. No form service, deployment or payment processing is configured by this extension.

Validation: `npm run lint`, `npx tsc --noEmit`, `npm run build`, then `npm run test:routes`. The route smoke test starts and stops its own production server on port 3210, checks every content route and linked internal URL, image responses, aliases, project enquiry context, missing-project 404 and video byte ranges. It does not submit an enquiry or contact third parties. Browser visual and interaction validation is still required on desktop and mobile; the cloud browser in the implementation environment could not reach the local preview server.

Maintenance: Next.js and eslint-config-next were updated together to 15.5.28, with React / React DOM 19.1.7, after the original 15.5.4 installation reported a security advisory. The existing Next.js 15 architecture is retained.

Public-repository review: direct contact channels, street address and named team profiles are currently left unconfigured pending explicit publication approval. The client source is public, but automatic approval review blocked copying those fields into this public repository. Team portraits are withheld as well. Their absence does not affect the remaining routes or media. Set the contact fields and team list in `src/content/ever.ts` after approval.
