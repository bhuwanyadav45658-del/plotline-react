# Plotline Realty (React demo)

A demo real estate site built with React, Vite and React Router.

## Run locally
    npm install
    npm run dev        # http://localhost:5173

## Build
    npm run build
    npm run preview

## Deploy on Vercel
Push to GitHub and import the repo on vercel.com. The Vite preset is detected
automatically (build: `npm run build`, output: `dist`). `vercel.json` rewrites all
routes to index.html so links like /colonies/lakeview-enclave work on refresh.

## Where things are
    src/data/data.js         demo colonies, houses and generated plots
    src/pages/               Home, Plots, Houses, Colonies
    src/components/          cards, site plan, header, footer, form, illustrations
    src/context/             enquiry modal and toast
    src/styles/style.css     all styling
# plotline-react
