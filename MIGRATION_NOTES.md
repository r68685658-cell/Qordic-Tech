# React Migration Notes

## Scope and assumptions

- Migrated the static source pages `index.html`, `services.html`, `solutions.html`, `process.html`, `global.html`, `about.html`, `blog.html`, `faq.html`, and `estimate.html`.
- Excluded `index.html.html` completely.
- Preserved the Qordic Technologies brand colors: violet `#7C5CFF`, coral `#FF6A88`, and amber `#FFB84D`.
- Preserved existing page titles and descriptions from the static HTML source. Organization schema metadata is retained where provided by the source.
- Routes are lazy-loaded and rendered through the existing Vite, React Router, Tailwind, and Framer Motion foundation.
- Deep-link section IDs and solution tab IDs remain available for the original anchors.

## Copy changes

The redesign may make the page hierarchy more clear, but it does not add or replace verified business claims. The following changes were made for clarity or presentation:

- Reworked page headings and supporting descriptions into shorter, more visually balanced React hero copy.
- Reworded some section introductions to improve readability while keeping their original meaning.
- Preserved source form labels and privacy copy; the Services form uses the original visible labels and options.
- Preserved placeholders marked `[CONFIRM]` or `[needs confirmation]` without inventing values.
- Changed navigation destinations only from static `.html` paths to React routes.

No confirmed statistics, clients, testimonials, team names, founding details, rates, or timeline formulas were invented.

## Placeholders retained

- Home: verified company logos, four stat values, and three testimonial entries remain placeholders.
- About: company story and all team names and roles remain `[CONFIRM]` placeholders.
- Blog: every article description remains a `[CONFIRM]` publishing roadmap placeholder; cards remain “Coming soon.”
- Global: coverage value and location-based claims remain `[CONFIRM]`.
- Estimate: `$0 – $0`, `0–0 weeks`, and the `[CONFIRM]` rate notice remain because no original formula or confirmed rates exist.

## Functional decisions

- The original static estimate uses no surviving `app.js` implementation or calculation formula, so React state controls update the selected values but do not produce a false quote.
- The original static form posts to `contact.php`, but no `contact.php` or backend exists in the source workspace. Lead forms validate locally and explicitly state that the enquiry was **not sent**.
- `/contact` reads `subject`, `message`, and `need` query parameters. Estimate links use `subject` and `message`; service links use `need` where the original values match the form options.
- FAQ items use an accessible native disclosure implementation. Solution tabs support keyboard arrows and hash synchronization.
- The theme uses the existing `data-theme` light/dark implementation and retains the violet/coral/amber brand family.

## Build and dependency assumptions

- No new UI or animation libraries were added.
- Existing dependencies remain React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide, and the existing theme/PageMeta implementation.
