# FEDY.J's Tutorial

A static, offline-friendly GCE learning website covering Maths, Physics and Chemistry from Form 1 to Upper Sixth.

## Included
- Static HTML site structure for three subjects
- Offline support through a service worker
- Simple subject landing pages
- Key topic pages with formulas, definitions and sample worked examples
- Past paper index page

## Run locally
From the project folder:

```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000

## Files
- `index.html` — homepage
- `maths.html` — Maths landing page
- `physics.html` — Physics landing page
- `chemistry.html` — Chemistry landing page
- `past-papers.html` — year-by-year past paper index
- `maths-triangles.html` — triangle topic page
- `maths-circles.html` — circle topic page
- `maths-algebra.html` — algebra topic page
- `physics-mechanics.html` — mechanics topic page
- `physics-electricity.html` — electricity topic page
- `physics-waves.html` — waves topic page
- `chemistry-periodic-table.html` — periodic table topic page
- `chemistry-bonding.html` — bonding topic page
- `chemistry-acids-bases.html` — acids and bases topic page
- `styles.css` — design and layout
- `app.js` — offline registration
- `sw.js` — service worker for offline cache

## Notes
This first build provides a full site structure and a rich starter set of lesson pages. Additional subject pages can be added in the same format as the examples provided in this project.
