# Pagdi — The Turban Museum of India

I built Pagdi as a digital archive for exploring India's regional turban traditions. The site brings together artifact details, regional context, craft, and stories so visitors can learn how turbans are worn and what they represent.

## What’s here

- Browse and filter the turban collection by region, occasion, colour, style, fabric, and tying difficulty.
- Explore regional traditions on an interactive map and view a daily featured artifact.
- Get turban recommendations for different occasions.
- Read heritage stories and explore the craft guide and archival gallery.
- Try on turbans using a camera or uploaded portrait. The virtual try-on uses MediaPipe face landmarks and requires camera permission when using the camera.
- View an image-based documentary storyboard with playback controls.

## Built with

React, TypeScript, Vite, Tailwind CSS, and React Router power the website. The API is built with Express; the virtual try-on uses MediaPipe Tasks Vision. Motion provides UI animation, and Lucide supplies icons.

## Project layout

```text
src/
  assets/       Images and other source assets
  components/   Shared UI and interactive components
  pages/        Route-level pages
  services/     Client for the museum API
  types/        Shared TypeScript types
server/
  data/         Museum collection and content
  routes/       Express API routes
api/            Vercel API function entry points
public/         Static files
```

`server.ts` starts the local Express server. `vite.config.ts` configures the frontend build, and `vercel.json` configures the Vercel build and SPA routing.

## Run locally

You’ll need Node.js and npm.

```bash
git clone https://github.com/soham-io/turban-iks.git
cd turban-iks
npm install
npm run dev
```

The development server runs at `http://localhost:3000` by default. No API key or `.env` file is needed for the website. Set `PORT` to use a different port; the server defaults to `3000`.

## Checks and production build

```bash
npm run lint
npm run build
npm run preview
```

`npm run preview` serves the production build created by `npm run build`.

## Deploy to Vercel

Import the GitHub repository into Vercel. The project is configured to build with `npm run build`, publish `dist`, and route frontend paths to the SPA; API functions are in `api/`. Vercel can deploy subsequent pushes to the connected branch automatically.
