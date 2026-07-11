# AGENTS.md — Nephrology Website Agent Instructions

## Project

This repository is a static Persian RTL GitHub Pages website for a nephrology educational project.

Repository root on Windows:

```powershell
C:\Users\ra\Desktop\Nephrology\Nephrology
```

GitHub repository:

```text
https://github.com/hadiebiii/Nephrology
```

Live GitHub Pages site:

```text
https://hadiebiii.github.io/Nephrology/
```

## Primary Goal

Help maintain, edit, audit, and deploy the Nephrology static website safely from VS Code using Codex, GitHub Copilot, terminal tools, Git, GitHub CLI, and GitHub Actions.

The agent may assist with:

* Reading and auditing project files
* Editing HTML, CSS, JavaScript, Markdown, JSON, and YAML files
* Checking repository status
* Running safe validation commands
* Checking GitHub Actions status
* Checking GitHub Pages deployment status
* Preparing changes for review

The agent must not perform destructive or deployment actions without explicit user approval.

---

## Important Files and Folders

```text
index.html
```

Root homepage of the website.

```text
chapters/index.html
```

Chapters listing page.

```text
chapters/chapter-01.html
chapters/chapter-02.html
chapters/chapter-03.html
chapters/chapter-04.html
chapters/chapter-05.html
chapters/chapter-06.html
```

Individual chapter pages.

```text
assets/css/style.css
```

Global CSS file.

```text
data/chapters.json
```

Chapter data file for future data-driven generation.

```text
scripts/generate-pages.js
```

Static page generator. Do not run unless explicitly requested.

```text
scripts/validate-html-basic.js
```

Basic HTML validation script.

```text
.github/workflows/deploy-pages.yml
```

GitHub Actions workflow for deploying GitHub Pages.

```text
.github/copilot-instructions.md
```

Optional Copilot-specific repository instructions.

```text
.github/instructions/
```

Optional path-specific instruction files.

```text
.github/skills/
```

Optional local skills for site audit, deployment checking, RTL editing, and nephrology content support.

---

## General Rules

1. Work only inside this repository.
2. Do not edit files outside this workspace.
3. Do not delete files unless explicitly asked.
4. Do not run `git push` unless explicitly asked.
5. Do not run `git push --force`.
6. Do not run `git reset --hard`.
7. Do not run `git clean -fd`.
8. Do not run `node scripts\generate-pages.js` unless explicitly asked.
9. Do not change `.github/workflows/deploy-pages.yml` unless explicitly asked.
10. Do not modify secrets, tokens, credentials, or environment files.
11. Do not add external dependencies unless explicitly requested.
12. Do not convert the static site into a framework project unless explicitly requested.
13. Always preserve Persian RTL layout.
14. Always keep HTML valid and simple.
15. Always run validation after edits.

---

## Required First Step Before Any Edit

Before editing any file, run or request:

```powershell
git status
```

Then explain:

* Which files will be changed
* Why each file needs to change
* What validation commands will be run after editing
* Whether any sensitive files are involved

Sensitive files include:

```text
.github/workflows/*.yml
scripts/generate-pages.js
data/chapters.json
.vscode/settings.json
AGENTS.md
```

---

## Required Validation After Edits

After editing files, run:

```powershell
node scripts\validate-html-basic.js
git diff --check
```

Recommended additional checks:

```powershell
git status
git diff --stat
git diff --name-status
```

For local preview:

```powershell
python -m http.server 8000
```

Then test in browser:

```text
http://127.0.0.1:8000/
http://127.0.0.1:8000/chapters/
```

---

## Git Workflow

Only after user approval:

```powershell
git add .
git commit -m "Update nephrology website"
git push origin main
```

After pushing:

```powershell
gh run watch
```

To inspect recent workflow runs:

```powershell
gh run list --workflow "Deploy GitHub Pages" --limit 5
```

To inspect GitHub Pages status:

```powershell
gh api repos/hadiebiii/Nephrology/pages
```

---

## Safe Terminal Commands

These commands are generally safe to run after user approval or when auditing:

```powershell
pwd
git status
git log --oneline --decorate -5
git diff --stat
git diff --name-status
git diff --check
node scripts\validate-html-basic.js
gh workflow list
gh run list --workflow "Deploy GitHub Pages" --limit 5
gh api repos/hadiebiii/Nephrology/pages
Get-ChildItem
Get-ChildItem chapters
Get-ChildItem scripts
```

Commands requiring explicit approval:

```powershell
git add .
git commit -m "..."
git push origin main
gh workflow run "Deploy GitHub Pages"
python -m http.server 8000
node scripts\generate-pages.js
```

Commands that must not be run unless explicitly and specifically requested:

```powershell
git reset --hard
git clean -fd
git push --force
Remove-Item -Recurse
rm -rf
del /s
rmdir /s
```

---

## HTML Rules

All Persian pages must preserve:

```html
<html lang="fa" dir="rtl">
```

Do not duplicate:

```html
<title>
<meta name="description">
<link rel="stylesheet">
```

Avoid broken nesting, especially:

* Do not place `<a>` incorrectly around block structures unless the whole card is intentionally clickable.
* Do not mix `<article>` and `<a>` in invalid nested patterns.
* Do not leave unclosed tags.
* Do not copy root homepage content into `chapters/index.html`.

Use existing CSS classes where possible:

```text
site-nav
container
nav-shell
brand
brand__mark
nav-links
hero
hero--compact
hero-shell
hero__text
section
section--alt
section-heading
section-heading__eyebrow
feature-grid
feature-card
card-grid
chapter-card
chapter-card__meta
chapter-card__status
badge
btn
btn--primary
btn--secondary
text-link
site-footer
footer-shell
skip-link
```

---

## CSS Path Rules

In root `index.html`, CSS path must be:

```html
<link rel="stylesheet" href="assets/css/style.css" />
```

In `chapters/index.html` and all chapter pages, CSS path must be:

```html
<link rel="stylesheet" href="../assets/css/style.css" />
```

---

## Link Rules

In root `index.html`, links to chapters should use:

```html
<a href="chapters/">فصل‌ها</a>
<a href="chapters/chapter-01.html">...</a>
```

Inside `chapters/index.html`, chapter links must be relative:

```html
<a href="chapter-01.html">...</a>
<a href="chapter-02.html">...</a>
<a href="chapter-03.html">...</a>
<a href="chapter-04.html">...</a>
<a href="chapter-05.html">...</a>
<a href="chapter-06.html">...</a>
```

Inside `chapters/index.html`, do not use:

```html
<a href="chapters/chapter-01.html">
```

Inside `chapters/index.html`, link back to homepage with:

```html
<a href="../index.html">خانه</a>
```

---

## GitHub Actions Rules

Workflow file:

```text
.github/workflows/deploy-pages.yml
```

Do not modify workflow files unless explicitly requested.

The current site is static. No build step is required unless the user changes the project structure.

Expected workflow principles:

* Trigger on push to `main`
* Allow manual `workflow_dispatch`
* Use minimal permissions:

  * `contents: read`
  * `pages: write`
  * `id-token: write`
* Use artifact path:

  * `path: .`

Useful commands:

```powershell
gh workflow list
gh run list --workflow "Deploy GitHub Pages" --limit 5
gh run view --log
gh api repos/hadiebiii/Nephrology/pages
```

A successful Pages API response should include:

```text
"status": "built"
"html_url": "https://hadiebiii.github.io/Nephrology/"
"build_type": "workflow"
```

---

## GitHub Pages Rules

Live URL:

```text
https://hadiebiii.github.io/Nephrology/
```

Chapters URL:

```text
https://hadiebiii.github.io/Nephrology/chapters/
```

Local testing URLs:

```text
http://127.0.0.1:8000/
http://127.0.0.1:8000/chapters/
```

A local `favicon.ico 404` is not a serious error unless the user specifically asks to add a favicon.

---

## Manual Editing vs Generated Editing

The user currently prefers manual editing.

Manual mode:

* Edit HTML files directly.
* Do not run `node scripts\generate-pages.js`.

Generated mode:

* Edit `data/chapters.json`.
* Run `node scripts\generate-pages.js`.
* Review generated HTML before commit.

Do not switch from manual mode to generated mode unless the user explicitly requests it.

---

## Content Style Rules

The website is Persian, RTL, medical, educational, and exam-oriented.

Content should be:

* Clear
* Structured
* Concise
* Suitable for medical learners
* Suitable for study and review
* Compatible with static HTML pages
* Free from unsupported medical claims unless a source is provided

Avoid:

* Long unstructured paragraphs
* Broken HTML
* Mixing unrelated homepage and chapter index content
* Adding unsupported scientific claims
* Adding external libraries without request

Preferred educational content structure:

1. Chapter title
2. Short introduction
3. Study path
4. Key clinical distinctions
5. Diagnostic approach
6. Treatment approach if relevant
7. Exam traps
8. Quick review

---

## Skills Guidance

If local skills exist under:

```text
.github/skills/
```

Use them when relevant.

Recommended skills:

```text
site-audit
github-pages-deploy
rtl-html-editing
nephrology-content
```

Use `site-audit` when asked to check the whole project.

Use `github-pages-deploy` when asked about GitHub Actions, workflow, deploy, or GitHub Pages.

Use `rtl-html-editing` when editing Persian RTL HTML pages.

Use `nephrology-content` when structuring medical lesson content.

---

## Approval Policy

Allowed without editing:

* Reading files
* Inspecting project structure
* Checking Git status
* Checking workflow list
* Checking Pages API
* Running HTML validation

Ask before:

* Editing files
* Running local server
* Adding files
* Modifying CSS
* Modifying JavaScript
* Modifying JSON
* Modifying workflow
* Running generator
* Committing
* Pushing

Never do without explicit approval:

* Delete files
* Force push
* Reset hard
* Clean repository
* Edit files outside workspace
* Change secrets or credentials
* Run destructive shell commands

---

## Standard Audit Prompt Behavior

When the user asks to audit or check the project:

1. Read this file.
2. Run:

```powershell
git status
gh workflow list
gh run list --workflow "Deploy GitHub Pages" --limit 5
gh api repos/hadiebiii/Nephrology/pages
node scripts\validate-html-basic.js
git diff --check
```

3. Report:

   * Git state
   * Changed files
   * HTML validation result
   * Latest workflow status
   * GitHub Pages status
   * Live URL
   * Any warnings
   * Recommended next action

4. Do not edit.

5. Do not commit.

6. Do not push.

---

## Standard Edit Prompt Behavior

When the user asks to edit:

1. Read this file.
2. Run:

```powershell
git status
```

3. Inspect target files.
4. Explain planned changes.
5. Wait for approval if the request affects sensitive files.
6. Edit only requested files.
7. Run:

```powershell
node scripts\validate-html-basic.js
git diff --check
```

8. Show summary of changed files.
9. Do not commit or push unless explicitly requested.

---

## Commit and Deploy Behavior

When the user explicitly asks to commit and deploy:

1. Run:

```powershell
git status
node scripts\validate-html-basic.js
git diff --check
```

2. Show files to be committed:

```powershell
git diff --name-status
```

3. Commit only after approval:

```powershell
git add .
git commit -m "..."
```

4. Push only after approval:

```powershell
git push origin main
```

5. Watch deploy:

```powershell
gh run watch
```

6. Verify Pages:

```powershell
gh api repos/hadiebiii/Nephrology/pages
```

7. Report final live URL.

---

## Final Safety Principle

The agent should help the user move faster, but the user remains the final approver for:

* Workflow changes
* Generator execution
* Commit
* Push
* File deletion
* Destructive terminal commands
* Deployment-triggering actions
