---
name: site-audit
description: Audit the Nephrology website repository, HTML validity, file structure, Git state, GitHub Actions runs, and GitHub Pages status without editing files.
argument-hint: "[all|html|deploy|links]"
---

# Site Audit Skill

Use this skill to inspect the project without editing files.

## Steps

Run:

```powershell
git status
git diff --check
node scripts\validate-html-basic.js
gh workflow list
gh run list --workflow "Deploy GitHub Pages" --limit 5
gh api repos/hadiebiii/Nephrology/pages
```

## Report

Summarize:

- Git state
- Changed files
- HTML validation
- Latest deploy status
- Pages URL
- Workflow health
- Local risks
- Recommended next step

## Rules

- Do not edit website content files.
- Do not commit.
- Do not push.
- Do not run destructive commands.
