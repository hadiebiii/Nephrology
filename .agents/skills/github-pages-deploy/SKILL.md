---
name: github-pages-deploy
description: Check, debug, and verify GitHub Actions and GitHub Pages deployment for the static Nephrology website.
argument-hint: "[latest|run-id|workflow]"
---

# GitHub Pages Deploy Skill

Use this skill when the user asks about deployment, GitHub Actions, Pages status, workflow errors, or live site verification.

## Safe commands

```powershell
gh workflow list
gh run list --workflow "Deploy GitHub Pages" --limit 10
gh api repos/hadiebiii/Nephrology/pages
```

## Optional log inspection

```powershell
gh run view --log
```

## Interpret results

- A successful workflow run means deployment completed.
- A failed workflow run means inspect logs before changing files.
- `status: built` means GitHub Pages is built.
- `html_url` is the live site URL.
- A local `favicon.ico` 404 is not a deploy failure.

## Workflow file

`.github/workflows/deploy-pages.yml`

## Rules

- Do not edit workflow files unless explicitly requested.
- Do not trigger workflow manually unless explicitly requested.
- Do not push unless explicitly requested.
- If workflow changes are needed, show the diff before suggesting a commit.
