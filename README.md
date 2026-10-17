# FEDY.J's Tutorial — App mode

This repository now includes Progressive Web App (PWA) features and a basic client-side search to make the site behave like an installable app.

What I added:
- SPA-style navigation (app.js) to load pages into the main area without full reloads.
- Client-side search (search.js + search-index.json) for quick topic lookup.
- Updated service worker (sw.js) that pre-caches key pages and assets.
- PWA manifest with icons.
- Install page with instructions (install.html).

Next steps I can take if you want:
- Add full search relevance ranking (lunr.js) and support for offline search indexing.
- Create downloadable ZIP of the full site content for direct offline distribution.
- Add interactive SVG editors for geometry problems where students can drag points.
- Populate the search index with more detailed excerpts and add tags per syllabus topic.

How to test locally

1. Run a simple server in the project folder:

```bash
python3 -m http.server 8000
```

2. Open http://localhost:8000 in your browser.
3. Open the site, allow it to install or use the browser menu to "Add to Home screen".

If you'd like, I can continue and:
- Complete the full syllabus pages (Form1→UpperSixth) in the same app format.
- Add every past-paper question (2009–2026) with solved answers, added to the search index.
- Generate a ready-to-download ZIP of the entire static site.
