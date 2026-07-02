# Remotion reel starter

Renders a `carousel.json` into a **9:16 Instagram reel** (kinetic hook → numbered tool cards → CTA). React → MP4, no editing suite.

## Run
```bash
npm install
npm run studio          # live preview in the browser
npm run render          # → out/reel.mp4  (uses sample-carousel.json)
# or a custom file:
npx remotion render src/index.tsx Reel out/reel.mp4 --props=./my-carousel.json
```

## The carousel.json contract
An array of `slides`, each `{ "kind": "hook" | "tool" | "cta", ... }`:

| kind | fields | renders |
|---|---|---|
| `hook` | `headline` (words spring in), `tag?` | the opening hook |
| `tool` | `n`, `headline`, `emphasis`, `body`, `important?` | a numbered step card (`important:true` → gold "★ MOST IMPORTANT") |
| `cta`  | `emphasis` (the keyword), `body` | the comment→DM CTA |

Claude (via [claude-content-skills](https://github.com/Ootto-AI/claude-content-skills)) writes this JSON; Remotion renders the video.

## Re-theme
All colors + fonts are the tokens at the top of [`src/Reel.tsx`](src/Reel.tsx) — change `CORAL` / `GOLD` / `INK` / `BG` to make it your brand.

> This is a clean starter. The full production scene library (dozens of animated scenes: repo cards, dashboards, insights, comment walls, kinetic hooks…) powers the hosted [Ootto](https://www.ootto.ai) factory.
