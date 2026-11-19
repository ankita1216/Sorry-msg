# 🧸 I'm Sorry — a cute interactive apology website

React + Vite + Framer Motion + Lucide icons. No backend, no APIs, no external services — everything runs locally.


Production build: `npm run build` (output in `dist/`), preview with `npm run preview`.

## What's inside
- `src/App.jsx` – page flow, rotating apology messages, Forgive / Still Angry logic
- `src/components/Bear.jsx` – SVG teddy bear (blinking, tears, moods: sorry / pout / happy; click to send hearts)
- `src/components/Intro.jsx` – opening love-letter animation
- `src/components/Celebration.jsx` – confetti, hearts and flowers
- `src/components/FloatingBackground.jsx` – floating hearts and sparkles
- `src/components/MusicToggle.jsx` + `src/hooks/useMusicBox.js` – optional music-box lullaby generated with the Web Audio API. It starts only when the letter is opened (a user click) and can be muted with the button at the top right.
- `src/styles.css` – pastel theme and responsive styles

## Customize
Edit the `MESSAGES`, `ANGRY_REPLIES` arrays in `src/App.jsx` — add the person's name or your own words.
