# Aj. — Personal Portfolio

A static portfolio site: plain HTML, CSS and JavaScript. No build step, no dependencies.
All paths are relative, so it works from any folder or repo (GitHub Pages user site,
project site, Netlify, Cloudflare Pages, or a plain web server).

## Structure

```
.
├── index.html                 Home
├── portfolio/index.html       Portfolio (filter, search, details dialog)
├── about/index.html           About and skills
├── contact/index.html         Social links and contact form
├── 404.html                   Not-found page
├── assets/
│   ├── css/
│   │   ├── base.css           Design tokens (colors, type), reset
│   │   ├── layout.css         Header, nav, containers, footer
│   │   ├── components.css     Buttons, tags, project entries, dialog, form
│   │   └── home.css, about.css, portfolio.css, contact.css, not-found.css
│   ├── js/
│   │   ├── data/projects.js   Your projects — edit this file to add work
│   │   ├── config.js          Contact form settings
│   │   ├── utils.js           Shared helpers
│   │   └── home.js, entry-lang.js, portfolio.js, contact.js
│   └── img/                   logo.png, favicon.svg
├── _headers                   Security headers (Netlify / Cloudflare Pages)
└── .nojekyll                  Tells GitHub Pages to serve files as they are
```

Each page loads only the CSS and JS it needs.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

1. Push these files to the root of a repo.
2. Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Project sites (`user.github.io/repo-name/`): open `404.html` and set
   `<meta name="site-base" content="/repo-name/">`. Leave `/` for user sites
   (`user.github.io`) and custom domains.

## Add a project

Open `assets/js/data/projects.js` and add an entry:

```js
{
  id: "my-project",            // unique, used in links: portfolio/#my-project
  title: "My Project",
  category: "Web Design",      // creates a filter tab automatically
  description: "One or two sentences.",
  tech: ["HTML5", "CSS3"],
  status: "Live",
  link: "https://example.com"  // "" hides the "Open link" button
}
```

## Contact form

GitHub Pages has no server, so choose one option in `assets/js/config.js`:

- `formEndpoint` — a form service URL (for example Formspree).
- `contactEmail` — opens the visitor's mail app with the message filled in.

If both are empty, the form tells visitors it is not connected yet.

## Colors

Defined once in `assets/css/base.css` under `:root`:
`--bg #24272b`, `--surface #2c3036`, `--accent #5f9ea0`, `--accent-bright #76b5b7`.
