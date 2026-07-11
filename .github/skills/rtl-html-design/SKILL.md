---
name: rtl-html-design
description: Audit and edit Persian RTL HTML pages for correct direction, relative links, CSS paths, valid structure, semantic layout, and readable educational design in the Nephrology GitHub Pages project.
argument-hint: "[target html file]"
---

# RTL HTML Design Skill

Use this skill when editing Persian RTL HTML files in the Nephrology website.

## Target files

- `index.html`
- `chapters/index.html`
- `chapters/chapter-*.html`

## Required HTML rules

All Persian pages must use:

```html
<html lang="fa" dir="rtl">
```

Do not duplicate:

- `<title>`
- `<meta name="description">`
- `<link rel="stylesheet">`

## CSS path rules

For root `index.html`:

```html
<link rel="stylesheet" href="assets/css/style.css" />
```

For files inside `chapters/`:

```html
<link rel="stylesheet" href="../assets/css/style.css" />
```

## Link rules

Inside `chapters/index.html`, use relative chapter links:

- `chapter-01.html`
- `chapter-02.html`
- `chapter-03.html`
- `chapter-04.html`
- `chapter-05.html`
- `chapter-06.html`

Do not use `chapters/chapter-01.html` inside `chapters/index.html`.

## Structure rules

- Keep `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>` clear.
- Do not create broken nested anchors.
- Do not mix root homepage sections into chapter index pages.
- Use existing CSS classes from `assets/css/style.css`.
- Keep Persian paragraphs short and readable.
- Preserve semantic HTML.

## After editing

Run:

```powershell
node scripts\validate-html-basic.js
git diff --check
```

Do not commit or push unless the user explicitly asks.
