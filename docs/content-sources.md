# Multipage content & media

Source supplied by client: https://everdesigninvestments.vercel.app/
Retrieved 23 October 2026. This update extends the approved homepage; it does not import the old website's layout.

## Routes and source material

- `/about`: `/about`, team portraits and roles, museum image and description; client brief supplies the African story / hospitality positioning.
- `/services` and five service detail routes: `/services`, `/services/architecture`, `/services/construction`, `/services/land`, `/services/villa-management`, `/services/development-partnerships`.
- `/process`: `/process` plus those service pages. Editorial Plan / Design / Engineer / Build structure follows the approved design.
- `/developments` and seven project routes: `/developments`, `/developments/bp-ever-retreat-villa`, `/developments/cottage`, `/developments/virunga-villas`. The other four entries exist in the development listing, with shorter source descriptions. Their pages explicitly request current information instead of inventing specifications.
- `/portfolio`: selected imagery from `/portfolio`, `/about`, construction and architecture pages. Built work, design studies and site work are distinguished.
- `/areas` plus six area pages: `/areas`, source landscape images, and the client's brief. Place descriptions are edited for experiential context; price, legal and returns claims are excluded.
- `/films`: local `/videos/cottage-hillside.mp4`, discovered in the source site's publicly served page chunk `2zbr_f50rlrac.js`. Villa visits and virtual viewings come from `/villa-tours`. `/villa-tours` redirects to `/films`.
- `/contact`: `/contact` and source footer: The user explicitly approved publishing the source website’s public contact channels, office address, social links and named team profiles/portraits in this public GitHub repository on 23 October 2026. These fields are now configured. `/studio` redirects to `/about`.

## Content decisions

The source website inconsistently shows three, five and eight development counts, $220K and $269K entry prices, and both off-plan and coming-soon labels for Virunga. This implementation avoids aggregate commercial numbers and prices. Virunga follows its detail page's coming-soon status. B&P and Cottage are completed showcase villas and are explicitly not for sale. Other projects are proposals/off-plan; no units, guaranteed yields or legal eligibility are asserted.

The source labels Cottage completed, but supplies a render for its cover. The new page calls that image a visualisation rather than evidence of completed construction. All architectural concept images stay labelled. Team portraits and named profiles come from the client source and are included with the user’s explicit publication approval. Generated homepage assets remain labelled illustrative.

`media-sources.json` records exact source URL, repository path and size for each imported image. Images are stored locally; the site does not depend on the source deployment remaining online. The Cottage film is stored locally too. No source forms, analytics, credentials, payment flows or third-party tracking were copied.

## Still configurable

The existing homepage's behind-the-scenes film retains its own `NEXT_PUBLIC_FILM_SRC` configuration; the Cottage video is a separate project film, not falsely presented as construction footage. The project film is click-to-play, has native controls and pauses out of view. The imported 14.08-second file contains a video stream only, with no audio or speech; no captions are required for this silent architectural animation.

Enquiry delivery still requires the existing `NEXT_PUBLIC_ENQUIRY_ENDPOINT`. No external submission is made during validation. Project-specific enquiry links prefill the form; a missing endpoint gives an honest message plus direct contact options when those details are configured. Commercial terms, partnership claims and law/finance copy need current client verification before being added.
