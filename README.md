# Nicholas Huang — Portfolio

An editorial, gallery-first portfolio for **illustration & design**. Built as a
fast, dependency-free static site — just HTML, CSS, and a little vanilla
JavaScript. No build step, hosts anywhere.

> **Aesthetic:** *Light & Editorial* — warm cream canvas, Fraunces display
> serif, generous whitespace, and a muted palette that lets the artwork lead.

## Preview

```
index.html ── sticky nav + reading-progress bar
   │
   ├─ Hero            big serif "Illustration & Design"
   ├─ Marquee         scrolling list of disciplines
   ├─ Selected Work   numbered gallery → click any piece for a lightbox
   ├─ About           illustrated portrait + bio + skills
   ├─ Services        four offerings
   ├─ Contact         oversized email call-to-action
   └─ Footer          social links
```

## Run it locally

It's a static site, so any local server works. A couple of options:

```bash
# Option A — npm script (uses npx serve, no install needed)
npm start            # then open the printed URL
npm run dev          # serves on http://localhost:3000

# Option B — Python (no Node required)
python3 -m http.server 3000   # then open http://localhost:3000
```

Or simply open `index.html` in a browser (the gallery, lightbox, and animations
all work from the file system too).

## Project structure

```
.
├── index.html          # all the markup / page content
├── css/styles.css      # design system + layout + responsive + motion
├── js/main.js          # nav, mobile menu, scroll-reveal, scrollspy, lightbox
└── assets/
    ├── portrait.svg     # About-section portrait illustration
    └── work/01–06.svg   # gallery artworks (placeholders)
```

## Make it yours

Everything is plain text and clearly labelled — here's where to look:

| Want to change…        | Edit                                                            |
| ---------------------- | -------------------------------------------------------------- |
| **Name / branding**    | Search `Nicholas Huang` in `index.html` (nav, footer, meta)    |
| **Email**              | Search `nicholashuang789@gmail.com` in `index.html`            |
| **Colors**             | The `:root` variables at the top of `css/styles.css`           |
| **Fonts**              | `--font-display` / `--font-sans` in CSS + the `<link>` in HTML |
| **Hero copy**          | The `.hero` section in `index.html`                            |
| **Projects**           | The `.gallery` cards in `index.html` (see below)               |
| **Social links**       | The `.footer__social` block in `index.html`                    |

### Swapping in your real artwork

Each gallery item is an `<article class="card">`. To use a real image, drop your
file into `assets/work/` and update two things on that card:

1. The `<img src="…">` and its `alt` text.
2. The `data-*` attributes (the lightbox reads `data-title`, `data-cat`,
   `data-year`, `data-src`, and `data-desc`).

```html
<article class="card" tabindex="0" role="button"
         data-title="Your Project"  data-cat="Editorial" data-year="2026"
         data-src="assets/work/your-image.jpg"
         data-desc="A sentence about the project.">
  <span class="card__num">01</span>
  <div class="card__media">
    <img src="assets/work/your-image.jpg" alt="Describe the image" loading="lazy" />
  </div>
  ...
</article>
```

Images are shown with `object-fit: cover`, so any aspect ratio looks tidy.
A `4:5` (portrait) or `4:3` source works best.

## Notes

- **Accessibility:** semantic landmarks, a skip link, keyboard-operable gallery
  and lightbox (Enter/Space to open, Esc to close), and visible focus styles.
- **Motion:** scroll reveals and the marquee fully respect
  `prefers-reduced-motion`.
- **Fonts** load from Google Fonts with system-serif/​sans fallbacks, so the
  page still looks right offline.

## Deploy

Drag the folder onto **Netlify**, push to **GitHub Pages**, or upload to any
static host. There's nothing to compile.
