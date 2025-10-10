# Module-4-Assessment-1 — Funny People (Remix)

A creative version of the Funny People app for Module 4. Add your own images in the `images/` folder and push to your IT varsity GitHub organization repository.

## What’s included
- `index.html`, `style.css`, `script.js`
- `images/` — add your images here (jpg/png)

## How to create the repo in your GitHub organization (IT varsity)
1. Sign in to GitHub.
2. Click **+ → New repository** (top right) → **Create a new repository**.
3. Under **Owner**, choose your organization: `IT varsity` (or the exact org name).
4. Repository name: `Module-4-Assessment-1`
5. Add description (optional), choose **Public** or **Private**, and **Initialize without README** (we’ll push our local files).
6. Click **Create repository**.

## Push local project to the new org repo
From your local project folder:

```bash
# initialize repo if not already
git init
git add .
git commit -m "Initial commit — Funny People remix"

# replace the URL with the one GitHub gives you for your org repo
git remote add origin https://github.com/IT-varsity/Module-4-Assessment-1.git

# push
git branch -M main
git push -u origin main
