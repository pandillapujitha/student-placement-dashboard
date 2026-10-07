# PlaceHub – Student Placement Dashboard

A responsive college placement portal built with **React 18, React Router 6, Context API, Recharts and Vite**. No backend required.

## Features
Login / Register (validated) · Protected routes · Editable student profile · Job openings with search + type/location/category filters · Job details & Apply · Application tracking (Applied, Shortlisted, Interview, Selected, Rejected) · Interview schedule · Placement statistics charts · Notifications · Loading, error and empty states · Desktop/tablet/mobile layouts.

## Quick start
```bash
npm install
npm run dev        # http://localhost:5173
```
**Demo login:** `demo@college.edu` / `demo123` (or register a new account).

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |

## Folder structure
```
src/
├── components/   Layout (sidebar/topbar), ProtectedRoute, ui.jsx (Badge, StatCard, Field, Loader, Empty…)
├── context/      AppContext.jsx – auth, jobs, applications, notifications
├── data/         seed.js – sample stats, demo user, role templates
├── pages/        Login, Register, Dashboard, Profile, Jobs, JobDetails, Applications, Interviews, Statistics, Notifications
├── services/     api.js – REST integration
├── App.jsx       Routes
└── index.css     Styling
```

## How data works
- **API:** company names/taglines are fetched from the public [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) API and combined with local role templates to form job openings. If the request fails, the app shows an error banner with **Retry** and falls back to sample jobs.
- **Accounts, applications and notifications** are stored in `localStorage` (per user). This is for demo purposes only – passwords are stored in plain text and must never be used this way in production.
- **Status updates:** with no backend, use the **Advance / Reject** demo buttons on *My applications* to simulate a recruiter. Advancing to *Interview* auto-schedules a slot and sends a notification.

## Deployment
The app uses `HashRouter` and a relative base, so it works on any static host.

**Netlify / Vercel:** build command `npm run build`, publish directory `dist`.

**GitHub Pages:**
```bash
npm run build
npx gh-pages -d dist      # after: npm i -D gh-pages
```
Then enable Pages from the `gh-pages` branch in repository settings.
