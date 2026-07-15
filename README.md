# Chore Chart Maker

Upload a CSV → get a whimsical, printable chore chart for the fridge. Edit names/cells
inline, drag chores to reorder, color-code by person, add/remove chores and days, and
print or save as PDF.

- `index.html` — the whole app (self-contained: HTML + CSS + JS, no build step)
- `.nojekyll` — tells GitHub Pages to serve files as-is
- `server.js` — tiny zero-dependency static server (only needed for Railway)
- `package.json` — `npm start` runs the server; Railway provides `PORT`
- `railway.json` — Railway build/deploy config

## Live site (GitHub Pages)

Deployed from the `main` branch (root) of **github.com/sahenn/chore-chart**:

**https://sahenn.github.io/chore-chart/**

### Updating the live site

Commits/pushes here go under the **`sahenn`** GitHub account. If your active `gh`
account is something else, switch first, push, then switch back:

```bash
cd chore-chart
gh auth switch --user sahenn      # push as sahenn
git add -A && git commit -m "Update chart"
git push
gh auth switch --user scott-henn  # back to your default
```

Pages rebuilds automatically a few seconds after each push.

> **Note:** Printing works when the app runs as a normal website (like the Railway URL).
> It's only blocked inside the Claude preview sandbox.

## Run locally

```bash
cd chore-chart
npm start          # then open http://localhost:3000
```

(There are no dependencies, so no `npm install` is needed.)

---

## Deploy to Railway

### First: make sure you're on the right account

The Railway CLI is logged into ONE account at a time. Check it:

```bash
railway whoami
```

Right now that shows `scott@loma.tech`. If you want to deploy under a **different**
account (e.g. your `sahenn` one), switch first:

```bash
railway logout
railway login        # opens a browser — sign in with the account you want
```

> In this Claude session you can run an interactive login by typing:
> `! railway login`

### Option A — Deploy with the CLI (fastest)

From this folder:

```bash
cd chore-chart
railway init                 # create a new project (give it a name, e.g. chore-chart)
railway up                   # build + deploy this folder
railway domain               # generate a public https URL
```

`railway up` streams the build logs; when it finishes, `railway domain` prints the URL
you can open on your phone and print from. To redeploy after edits, just run
`railway up` again.

### Option B — Deploy from GitHub (no CLI)

1. Create a repo and push this folder (as `sahenn`):
   ```bash
   cd chore-chart
   git init && git add . && git commit -m "Chore chart maker"
   git branch -M main
   git remote add origin https://github.com/sahenn/chore-chart.git
   git push -u origin main
   ```
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Pick the `chore-chart` repo. Railway auto-detects Node and runs `npm start`.
4. In the service, open **Settings → Networking → Generate Domain** to get a public URL.

Make sure you're signed into railway.app with the same account you intend to use.

---

## Updating the chart later

Everything is in `index.html`. Edit it, then redeploy (`railway up`, or push to GitHub
if using Option B). The CSV format the app expects:

- **Row 1** = column headings (e.g. days of the week).
- **Column 1** = chore/task names.
- Cells = who's assigned (initials or names). Blank "spacer" columns are ignored.
