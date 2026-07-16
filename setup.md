# Knowledge OS — Full Setup Guide

A comprehensive guide to understanding, running, and deploying the **KnowledgeOS** platform — a personal productivity & knowledge-management system.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Prerequisites](#4-prerequisites)
5. [Local Development Setup](#5-local-development-setup)
6. [Environment Variables](#6-environment-variables)
7. [Database (MongoDB + Prisma)](#7-database-mongodb--prisma)
8. [API Routes Reference](#8-api-routes-reference)
9. [Frontend Pages & Routes](#9-frontend-pages--routes)
10. [State Management & Services](#10-state-management--services)
11. [Internationalization (i18n)](#11-internationalization-i18n)
12. [Backend Deployment (Render)](#12-backend-deployment-render)
13. [Frontend Deployment (Vercel)](#13-frontend-deployment-vercel)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Project Overview

**KnowledgeOS** is a full-stack monorepo web application for personal productivity. It combines:

- 📚 Reading tracker & library management
- 📓 Journal & note-taking
- 🎯 Goal & habit tracking
- ✅ Task management
- 📅 Calendar & scheduling
- 📊 Analytics dashboard
- 🤖 AI conversation assistant
- 🔔 Notifications & activity feed

The project is a **pnpm monorepo** with two workspaces:

| Workspace | Path      | Description                        |
|-----------|-----------|------------------------------------|
| `client`  | `client/` | React 19 + Vite 8 SPA (frontend)   |
| `server`  | `server/` | Express 5 + Prisma API (backend)   |

---

## 2. Tech Stack

### Frontend (`client/`)

| Technology        | Version  | Purpose                               |
|-------------------|----------|---------------------------------------|
| React             | ^19.2    | UI library                            |
| Vite              | ^8.1     | Build tool & dev server               |
| TypeScript        | ^7.0     | Type safety                           |
| TailwindCSS       | ^4.3     | Utility-first CSS (via Vite plugin)   |
| React Router DOM  | ^7.18    | Client-side routing                   |
| TanStack Query    | ^5.101   | Server state, caching & data fetching |
| Zustand           | ^5.0     | Client-side state management          |
| Axios             | ^1.18    | HTTP client                           |
| Framer Motion     | ^12.42   | Animations & transitions              |
| React Hook Form   | ^7.81    | Form state management                 |
| Zod               | ^4.4     | Schema validation                     |
| Recharts          | ^3.9     | Charts & analytics visualizations     |
| Lucide React      | ^1.24    | Icon library                          |

### Backend (`server/`)

| Technology      | Version | Purpose                                |
|-----------------|---------|----------------------------------------|
| Node.js (ESM)   | —       | Runtime                                |
| Express         | ^5.2    | HTTP server & routing                  |
| TypeScript      | ^5.8    | Type safety                            |
| Prisma          | ^6.7    | ORM & database client                  |
| MongoDB         | —       | Database (via Prisma MongoDB adapter)  |
| Bcryptjs        | ^3.0    | Password hashing                       |
| JSON Web Token  | ^9.0    | Authentication (Access + Refresh)      |
| Zod             | ^4.4    | Request validation                     |
| Helmet          | ^8.3    | Security headers                       |
| Cookie-parser   | ^1.4    | Cookie handling                        |
| Dotenv          | ^17.4   | Environment variable loading           |

---

## 3. Monorepo Structure

```
Knowledge_OS/
├── pnpm-workspace.yaml         # Defines client & server workspaces
├── pnpm-lock.yaml
├── .gitignore
├── README.md
├── setup.md                    # You are here
│
├── client/                     # Frontend (React + Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx            # App entry point
│       ├── App.tsx             # Root component + router setup
│       ├── index.css           # Global styles
│       ├── components/
│       │   ├── ui/             # Generic UI (Toast, etc.)
│       │   ├── layout/         # Sidebar, TopNavbar, ScrollToTop
│       │   └── auth/           # Auth-specific components
│       ├── features/           # Feature-scoped UI components
│       │   ├── analytics/  books/  calendar/  charts/
│       │   ├── dashboard/  footer/ goals/     habits/
│       │   ├── journal/    landing/ library/  notes/
│       │   └── reading/    settings/ tasks/  auth/
│       ├── layouts/
│       │   └── MainLayout.tsx  # Sidebar + TopNavbar shell
│       ├── pages/              # Route-level page components
│       │   ├── landing/    auth/       dashboard/  library/
│       │   ├── notes/      goals/      habits/     tasks/
│       │   ├── journal/    reading/    analytics/  calendar/
│       │   ├── profile/    settings/   search/     notifications/
│       │   ├── docs/       site-map/   not-found/
│       ├── services/api/
│       │   ├── client.ts       # Axios instance + interceptors
│       │   ├── axios.ts
│       │   ├── auth.service.ts
│       │   └── index.ts        # All API service functions
│       ├── store/
│       │   ├── authStore.ts    # Zustand auth state
│       │   └── toastStore.ts   # Zustand toast notifications
│       ├── i18n/
│       │   ├── LanguageProvider.tsx
│       │   ├── useLanguage.ts
│       │   └── locales/
│       │       ├── en.ts       # English translations
│       │       └── bn.ts       # Bengali translations
│       ├── types/              # Shared TypeScript types
│       └── data/               # Static/mock data
│
├── server/                     # Backend (Express + Prisma)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                    # Local environment variables
│   └── src/
│       ├── app/
│       │   ├── app.ts          # Express app setup
│       │   └── server.ts       # HTTP server entry point
│       ├── config/             # App configuration
│       ├── middleware/         # Auth, validation, error handling
│       ├── modules/            # Feature modules (Controller-Service-Repo)
│       │   ├── auth/       users/      library/    reading/
│       │   ├── journal/    calendar/   goals/      tasks/
│       │   ├── habits/     analytics/  settings/
│       │   └── activities/ notifications/ ai/
│       ├── prisma/
│       │   └── schema.prisma   # MongoDB schema (all models)
│       ├── routes/
│       │   └── index.ts        # Aggregated API router
│       ├── shared/             # Shared utilities & helpers
│       ├── types/              # Shared TypeScript types
│       └── utils/              # Utility functions
│
└── docs/                       # Project documentation
    ├── ARCHITECTURE.md
    ├── API_DESIGN.md
    ├── DATABASE_DESIGN.md
    ├── DATABASE_DIAGRAM.md
    ├── FEATURES.md
    ├── FOLDER_STRUCTURE.md
    ├── CODING_STANDARDS.md
    ├── MIGRATION_GUIDE.md
    ├── PLAN.md
    └── ROADMAP.md
```

---

## 4. Prerequisites

| Tool    | Min Version | Check Command   |
|---------|-------------|-----------------|
| Node.js | 20+         | `node -v`       |
| pnpm    | 9+          | `pnpm -v`       |
| Git     | 2+          | `git --version` |

Install pnpm globally if needed:
```bash
npm install -g pnpm
```

You also need a **MongoDB** database. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier is recommended.

---

## 5. Local Development Setup

### Step 1 — Clone the Repository

```bash
git clone https://github.com/HasibCoderLab/Knowledge_OS.git
cd Knowledge_OS
```

### Step 2 — Install All Dependencies

```bash
pnpm install
```

This installs dependencies for both `client` and `server` at once.

### Step 3 — Configure Environment Variables

Create `server/.env` (see [Section 6](#6-environment-variables) for all variables).

Optionally create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api/v1
```

### Step 4 — Push the Database Schema

```bash
cd server
pnpm prisma:push
```

Applies the Prisma schema to MongoDB (creates collections & indexes).

### Step 5 — Start Development Servers

**Terminal 1 — Backend** (from `server/`):
```bash
pnpm dev
# Starts at: http://localhost:5000
# Health:    http://localhost:5000/api/v1/health
```

**Terminal 2 — Frontend** (from `client/`):
```bash
pnpm dev
# Starts at: http://localhost:5173
```

### Prisma Commands Quick Reference

```bash
# All run from: server/
pnpm prisma:generate   # Regenerate Prisma client
pnpm prisma:push       # Push schema changes to DB
pnpm prisma:validate   # Validate schema file
pnpm prisma:studio     # Open visual DB browser (Prisma Studio)
```

---

## 6. Environment Variables

### `server/.env`

| Variable                 | Example / Default                           | Description                           |
|--------------------------|---------------------------------------------|---------------------------------------|
| `PORT`                   | `5000`                                      | Server listen port                    |
| `NODE_ENV`               | `development`                               | `development` or `production`         |
| `DATABASE_URL`           | `mongodb+srv://user:pass@host/knowledgeos`  | Full MongoDB connection string        |
| `JWT_SECRET`             | `super_secret_access_token_key_123`         | Access token signing secret           |
| `JWT_REFRESH_SECRET`     | `super_secret_refresh_token_key_456`        | Refresh token signing secret          |
| `JWT_EXPIRES_IN`         | `15m`                                       | Access token TTL                      |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                                        | Refresh token TTL                     |
| `CORS_ORIGIN`            | `http://localhost:5173`                     | Allowed CORS origin                   |
| `COOKIE_SECRET`          | `knowledgeos_cookie_secret_2024`            | Cookie signing secret                 |
| `RATE_LIMIT_WINDOW`      | `900000`                                    | Rate limit window in ms (15 min)      |
| `RATE_LIMIT_MAX`         | `100`                                       | Max requests per window per IP        |
| `BCRYPT_SALT_ROUNDS`     | `12`                                        | Bcrypt hashing rounds                 |

### `client/.env`

| Variable       | Example                             | Description                    |
|----------------|-------------------------------------|--------------------------------|
| `VITE_API_URL` | `http://localhost:5000/api/v1`      | Backend API base URL           |

---

## 7. Database (MongoDB + Prisma)

Schema file: `server/src/prisma/schema.prisma`
Provider: **MongoDB** (Prisma MongoDB adapter)

### Models Overview

| Model               | Description                                              |
|---------------------|----------------------------------------------------------|
| `User`              | Core profile: email, password, name, avatar, social links, preferences |
| `Book`              | Library books: title, author, status (`wishlist/reading/completed`), progress |
| `Note`              | Notes with optional book linkage, tags, pin & favorite flags |
| `ReadingSession`    | Session logs: pages read, duration, start/end page       |
| `JournalEntry`      | Daily entries: title, content, mood, date, tags          |
| `Goal`              | Goals: type, deadline, progress, status, priority        |
| `GoalProgress`      | Incremental progress log entries for goals               |
| `Task`              | Tasks: priority, status (`TODO/IN_PROGRESS/DONE`), due date |
| `Habit`             | Habits: name, frequency (`daily/weekly`)                 |
| `HabitLog`          | Per-day habit completion records                         |
| `CalendarEvent`     | Events: date, time, type, external provider sync info    |
| `AnalyticsSnapshot` | Periodic JSON analytics snapshots per user               |
| `Notification`      | In-app notifications with read status                    |
| `Activity`          | Activity feed: action type, entity type/id, metadata     |
| `UserSettings`      | User preferences: theme, language, reminders, timezone   |
| `AIConversation`    | AI chat sessions with JSON message arrays                |

---

## 8. API Routes Reference

All routes are under the prefix: **`/api/v1/`**

| Module        | Prefix              | Endpoints                                               |
|---------------|---------------------|---------------------------------------------------------|
| Auth          | `/auth`             | `POST /register`, `POST /login`, `POST /logout`, `POST /refresh` |
| Users         | `/users`            | `GET /me`, `PATCH /me`, `PATCH /me/password`, `DELETE /me`, `DELETE /me/data` |
| Library       | `/library`          | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Reading       | `/reading`          | `GET /sessions`, `GET /sessions/:id`, `POST /sessions`, `PATCH /sessions/:id`, `DELETE /sessions/:id` |
| Journal       | `/journal`          | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Calendar      | `/calendar`         | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Goals         | `/goals`            | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Tasks         | `/tasks`            | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Habits        | `/habits`           | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`, `POST /:id/logs` |
| Analytics     | `/analytics`        | `GET /dashboard`, `GET /reading`, `GET /goals`, `GET /tasks`, `GET /habits` |
| Settings      | `/settings`         | `GET /`, `PATCH /`                                      |
| Activities    | `/activities`       | `GET /`, `GET /recent`, `POST /`                        |
| Notifications | `/notifications`    | `GET /`, `PATCH /:id/read`, `PATCH /read-all`, `DELETE /:id` |
| AI            | `/ai`               | `GET /conversations`, `GET /conversations/:id`, `POST /conversations`, `POST /conversations/:id/messages`, `DELETE /conversations/:id` |
| Health        | `/health`           | `GET /` — returns server status & timestamp             |

---

## 9. Frontend Pages & Routes

| Route               | Component         | Auth? | Description                         |
|---------------------|-------------------|-------|-------------------------------------|
| `/`                 | `LandingPage`     | No    | Public landing page                 |
| `/auth/login`       | `Login`           | No*   | Login form                          |
| `/auth/register`    | `Register`        | No*   | Registration form                   |
| `/dashboard`        | `Dashboard`       | Yes   | Main productivity overview          |
| `/library`          | `Library`         | Yes   | Book library management             |
| `/notes`            | `Notes`           | Yes   | Notes browser & editor              |
| `/goals`            | `Goals`           | Yes   | Goal tracking & progress            |
| `/habits`           | `Habits`          | Yes   | Habit tracker with logs             |
| `/tasks`            | `Tasks`           | Yes   | Task manager                        |
| `/journal`          | `Journal`         | Yes   | Journal entries                     |
| `/reading`          | `ReadingTracker`  | Yes   | Reading sessions                    |
| `/analytics`        | `Analytics`       | Yes   | Charts & analytics                  |
| `/calendar`         | `CalendarPage`    | Yes   | Calendar events view                |
| `/profile`          | `Profile`         | Yes   | User profile                        |
| `/settings`         | `SettingsPage`    | Yes   | App settings                        |
| `/settings/profile` | `SettingsProfile` | Yes   | Profile settings                    |
| `/search`           | `Search`          | Yes   | Global search                       |
| `/notifications`    | `Notifications`   | Yes   | Notifications center                |
| `/docs`             | `DocsPage`        | Yes   | In-app documentation                |
| `/site-map`         | `SiteMapPage`     | Yes   | Site map / navigation overview      |
| `*`                 | `NotFound`        | No    | 404 page                            |

> \* `PublicRoute` automatically redirects logged-in users to `/dashboard`.

**Route Guard Components (in `App.tsx`):**
- `ProtectedRoute` — Redirects unauthenticated users to `/auth/login`
- `PublicRoute` — Redirects authenticated users to `/dashboard`
- `AuthInitializer` — Restores auth session from stored refresh token on load

All protected page components are **lazy-loaded** via `React.lazy` + `Suspense`.

---

## 10. State Management & Services

### Zustand Stores

| Store       | File           | State / Actions                                                |
|-------------|----------------|----------------------------------------------------------------|
| `authStore` | `authStore.ts` | `user`, `isAuthenticated`, `isInitializing`, `initAuth()`, `logout()` |
| `toastStore`| `toastStore.ts`| Toast message queue & actions                                  |

### API Client

- **Axios instance** (`services/api/client.ts`): Handles base URL, credentials, and automatic access-token refresh via interceptors.
- **Service modules** (`services/api/index.ts`): One service object per feature module.

| Service            | Covers                                   |
|--------------------|------------------------------------------|
| `authApi`          | Register, Login, Logout, Refresh, GetMe  |
| `usersApi`         | Get/Update profile                       |
| `libraryApi`       | Book CRUD                                |
| `readingApi`       | Reading session CRUD                     |
| `journalApi`       | Journal entry CRUD                       |
| `goalsApi`         | Goal CRUD                                |
| `tasksApi`         | Task CRUD                                |
| `habitsApi`        | Habit CRUD + log completion              |
| `settingsApi`      | Account settings, change password        |
| `userSettingsApi`  | User preference settings                 |
| `analyticsApi`     | Dashboard & module-specific analytics    |
| `notificationsApi` | List, mark-read, delete notifications    |
| `activitiesApi`    | Activity feed                            |
| `aiApi`            | AI conversation CRUD & messaging         |

---

## 11. Internationalization (i18n)

The app supports **English** (`en`) and **Bengali** (`bn`) via a custom context-based system.

| File                        | Purpose                                          |
|-----------------------------|--------------------------------------------------|
| `i18n/LanguageProvider.tsx` | Context provider — wraps the entire app          |
| `i18n/useLanguage.ts`       | Hook to read translations & switch language      |
| `i18n/locales/en.ts`        | All English translation strings                  |
| `i18n/locales/bn.ts`        | All Bengali translation strings                  |

Language preference is persisted in the user's profile (`User.language`) and synced with the backend.

---

## 12. Backend Deployment (Render)

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "chore: prepare for deployment"
git push
```

### Step 2 — Create Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com) — sign in with GitHub.
2. **New +** → **Web Service** → connect your repo.

### Step 3 — Configure Service

| Setting        | Value                          |
|----------------|--------------------------------|
| Name           | `knowledge-os-backend`         |
| Root Directory | `server`                       |
| Environment    | `Node`                         |
| Build Command  | `npm install && npm run build` |
| Start Command  | `npm start`                    |

> `npm run build` executes `tsc && prisma generate` — compiles TypeScript and generates Prisma Client.

### Step 4 — Set Environment Variables

Add all keys from [Section 6](#6-environment-variables) in Render's **Environment** tab:

| Key                      | Production Value                      |
|--------------------------|---------------------------------------|
| `PORT`                   | `10000`                               |
| `NODE_ENV`               | `production`                          |
| `DATABASE_URL`           | Your MongoDB Atlas connection string  |
| `JWT_SECRET`             | Strong random secret                  |
| `JWT_REFRESH_SECRET`     | Different strong random secret        |
| `JWT_EXPIRES_IN`         | `15m`                                 |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                                  |
| `CORS_ORIGIN`            | `*` *(update after Vercel deploy)*    |
| `COOKIE_SECRET`          | Strong random secret                  |
| `BCRYPT_SALT_ROUNDS`     | `12`                                  |

### Step 5 — Deploy

Click **Create Web Service**. Wait for "Live" status. Copy the URL (e.g., `https://knowledge-os-backend.onrender.com`).

---

## 13. Frontend Deployment (Vercel)

### Step 1 — Import Project

1. Go to [vercel.com](https://vercel.com) — sign in with GitHub.
2. **Add New...** → **Project** → Import your repo.

### Step 2 — Configure Project

| Setting          | Value                   |
|------------------|-------------------------|
| Project Name     | `knowledge-os-client`   |
| Framework Preset | `Vite`                  |
| Root Directory   | `client`                |
| Build Command    | `npm run build`         |
| Output Directory | `dist`                  |

### Step 3 — Set Environment Variable

| Key            | Value                                               |
|----------------|-----------------------------------------------------|
| `VITE_API_URL` | `https://knowledge-os-backend.onrender.com/api/v1`  |

### Step 4 — Deploy

Click **Deploy**. Copy your Vercel URL (e.g., `https://knowledge-os.vercel.app`).

### Step 5 — Update CORS on Render

In your Render backend service → **Environment**, update:
```
CORS_ORIGIN=https://knowledge-os.vercel.app
```

Render restarts the service automatically. ✅ Your full-stack app is live!

---

## 14. Troubleshooting

### ❌ Prisma client not found

```bash
cd server
pnpm prisma:generate
```

### ❌ MongoDB connection error

- Ensure MongoDB Atlas **Network Access** allows your IP (or `0.0.0.0/0` for dev).
- Verify connection string format: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/dbname`

### ❌ Blank page / 404 on page refresh (Vercel SPA)

Add `client/vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### ❌ CORS errors in browser

- Check `CORS_ORIGIN` on Render exactly matches your Vercel URL (no trailing slash).
- Verify `VITE_API_URL` on Vercel ends with `/api/v1`.

### ❌ Render build fails (prisma generate error)

Change Build Command to:
```
npm install && npx prisma generate && npm run build
```

### ❌ JWT token / auth errors after deployment

Ensure `JWT_SECRET` and `JWT_REFRESH_SECRET` are set in Render environment. Changing them invalidates all active sessions.

### ❌ TypeScript build errors

```bash
cd server
pnpm typecheck   # Type-check without emitting output
```
