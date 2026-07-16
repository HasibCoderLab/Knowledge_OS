# KnowledgeOS — সম্পূর্ণ সেটআপ গাইড

**KnowledgeOS** প্ল্যাটফর্ম বোঝার, চালানোর এবং ডেপ্লয় করার একটি বিস্তারিত গাইড — এটি একটি ব্যক্তিগত উত্পাদনশীলতা এবং জ্ঞান ব্যবস্থাপনা সিস্টেম।

---

## সূচিপত্র

1. [প্রজেক্ট পরিচিতি](#1-project-overview)
2. [টেক স্ট্যাক](#2-tech-stack)
3. [মনোরিপো স্ট্রাকচার](#3-monorepo-structure)
4. [পূর্বশর্ত](#4-prerequisites)
5. [লোকাল ডেভেলপমেন্ট সেটআপ](#5-local-development-setup)
6. [এনভায়রনমেন্ট ভেরিয়েবল](#6-environment-variables)
7. [ডেটাবেস (MongoDB + Prisma)](#7-database-mongodb--prisma)
8. [API রুট রেফারেন্স](#8-api-routes-reference)
9. [ফ্রন্টএন্ড পেজ এবং রুট](#9-frontend-pages--routes)
10. [স্টেট ম্যানেজমেন্ট এবং সার্ভিস](#10-state-management--services)
11. [আন্তর্জাতিকীকরण (i18n)](#11-internationalization-i18n)
12. [ব্যাকএন্ড ডেপ্লয় (Render)](#12-backend-deployment-render)
13. [ফ্রন্টএন্ড ডেপ্লয় (Vercel)](#13-frontend-deployment-vercel)
14. [সমস্যা সমাধান](#14-troubleshooting)

---

## ১. প্রজেক্ট পরিচিতি

**KnowledgeOS** হলো ব্যক্তিগত উত্পাদনশীলতার জন্য একটি ফুল-স্ট্যাক মনোরিপো ওয়েব অ্যাপ্লিকেশন। এটি একত্রিত করে:

- 📚 পড়া ট্র্যাকার এবং লাইব্রেরি ব্যবস্থাপনা
- 📓 জার্নাল এবং নোট তৈরি
- 🎯 লক্ষ্য এবং অভ্যাস ট্র্যাকিং
- ✅ কাজ ব্যবস্থাপনা
- 📅 ক্যালেন্ডার এবং সময়সূচী
- 📊 অ্যানালিটিক্স ড্যাশবোর্ড
- 🤖 AI কথোপকথন সহকারী
- 🔔 বিজ্ঞপ্তি এবং কার্যকলাপ ফিড

প্রজেক্টটি একটি **pnpm মনোরিপো** যাতে দুটি ওয়ার্কস্পেস রয়েছে:

| ওয়ার্কস্পেস | পাথ      | বিবরণ                           |
|------------|-----------|--------------------------------|
| `client`  | `client/` | React 19 + Vite 8 SPA (ফ্রন্টএন্ড) |
| `server`  | `server/` | Express 5 + Prisma API (ব্যাকএন্ড) |

---

## ২. টেক স্ট্যাক

### ফ্রন্টএন্ড (`client/`)

| প্রযুক্তি           | সংস্করণ  | উদ্দেশ্য                             |
|------------------|--------|------------------------------------|
| React            | ^19.2  | UI লাইব্রেরি                        |
| Vite             | ^8.1   | বিল্ড টুল এবং ডেভ সার্ভার             |
| TypeScript       | ^7.0   | টাইপ নিরাপত্তা                      |
| TailwindCSS      | ^4.3   | ইউটিলিটি-ফার্স্ট CSS (Vite প্লাগিনের মাধ্যমে) |
| React Router DOM | ^7.18  | ক্লায়েন্ট-সাইড রাউটিং               |
| TanStack Query   | ^5.101 | সার্ভার স্টেট, ক্যাশিং এবং ডেটা ফেচিং |
| Zustand          | ^5.0   | ক্লায়েন্ট-সাইড স্টেট ম্যানেজমেন্ট    |
| Axios            | ^1.18  | HTTP ক্লায়েন্ট                      |
| Framer Motion    | ^12.42 | অ্যানিমেশন এবং ট্রানজিশন              |
| React Hook Form  | ^7.81  | ফর্ম স্টেট ম্যানেজমেন্ট               |
| Zod              | ^4.4   | স্কিমা ভ্যালিডেশন                    |
| Recharts         | ^3.9   | চার্ট এবং অ্যানালিটিক্স ভিজ্যুয়ালাইজেশন |
| Lucide React     | ^1.24  | আইকন লাইব্রেরি                       |

### ব্যাকএন্ড (`server/`)

| প্রযুক্তি         | সংস্করণ | উদ্দেশ্য                              |
|---------------|-------|--------------------------------------|
| Node.js (ESM) | —     | রানটাইম                              |
| Express       | ^5.2  | HTTP সার্ভার এবং রাউটিং               |
| TypeScript    | ^5.8  | টাইপ নিরাপত্তা                        |
| Prisma        | ^6.7  | ORM এবং ডেটাবেস ক্লায়েন্ট             |
| MongoDB       | —     | ডেটাবেস (Prisma MongoDB অ্যাডাপ্টারের মাধ্যমে) |
| Bcryptjs      | ^3.0  | পাসওয়ার্ড হ্যাশিং                     |
| JSON Web Token| ^9.0  | প্রমাণীকরণ (Access + Refresh)        |
| Zod           | ^4.4  | রিকোয়েস্ট ভ্যালিডেশন                 |
| Helmet        | ^8.3  | নিরাপত্তা হেডার                       |
| Cookie-parser | ^1.4  | কুকি হ্যান্ডলিং                       |
| Dotenv        | ^17.4 | এনভায়রনমেন্ট ভেরিয়েবল লোডিং           |

---

## ৩. মনোরিপো স্ট্রাকচার

```
Knowledge_OS/
├── pnpm-workspace.yaml         # client এবং server ওয়ার্কস্পেস সংজ্ঞায়িত করে
├── pnpm-lock.yaml
├── .gitignore
├── README.md
├── setup.md                    # আপনি এখানে আছেন
│
├── client/                     # ফ্রন্টএন্ড (React + Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx            # অ্যাপ এন্ট্রি পয়েন্ট
│       ├── App.tsx             # রুট কম্পোনেন্ট + রাউটার সেটআপ
│       ├── index.css           # গ্লোবাল স্টাইল
│       ├── components/
│       │   ├── ui/             সাধারণ UI (Toast ইত্যাদি)
│       │   ├── layout/         # সাইডবার, TopNavbar, ScrollToTop
│       │   └── auth/           # অথ-নির্দিষ্ট কম্পোনেন্ট
│       ├── features/           # ফিচার-স্কোপড UI কম্পোনেন্ট
│       │   ├── analytics/  books/  calendar/  charts/
│       │   ├── dashboard/  footer/ goals/     habits/
│       │   ├── journal/    landing/ library/  notes/
│       │   └── reading/    settings/ tasks/  auth/
│       ├── layouts/
│       │   └── MainLayout.tsx  # সাইডবার + TopNavbar শেল
│       ├── pages/              # রুট-লেভেল পেজ কম্পোনেন্ট
│       │   ├── landing/    auth/       dashboard/  library/
│       │   ├── notes/      goals/      habits/     tasks/
│       │   ├── journal/    reading/    analytics/  calendar/
│       │   ├── profile/    settings/   search/     notifications/
│       │   ├── docs/       site-map/   not-found/
│       ├── services/api/
│       │   ├── client.ts       # Axios ইনস্ট্যান্স + ইন্টারসেপ্টর
│       │   ├── axios.ts
│       │   ├── auth.service.ts
│       │   └── index.ts        # সমস্ত API সার্ভিস ফাংশন
│       ├── store/
│       │   ├── authStore.ts    # Zustand auth স্টেট
│       │   └── toastStore.ts   # Zustand toast বিজ্ঞপ্তি
│       ├── i18n/
│       │   ├── LanguageProvider.tsx
│       │   ├── useLanguage.ts
│       │   └── locales/
│       │       ├── en.ts       # ইংরেজি অনুবাদ
│       │       └── bn.ts       # বাংলা অনুবাদ
│       ├── types/              # শেয়ার্ড TypeScript টাইপ
│       └── data/               # স্ট্যাটিক/মক ডেটা
│
├── server/                     # ব্যাকএন্ড (Express + Prisma)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                    # লোকাল এনভায়রনমেন্ট ভেরিয়েবল
│   └── src/
│       ├── app/
│       │   ├── app.ts          # Express অ্যাপ সেটআপ
│       │   └── server.ts       # HTTP সার্ভার এন্ট্রি পয়েন্ট
│       ├── config/             # অ্যাপ কনফিগারেশন
│       ├── middleware/         # অথ, ভ্যালিডেশন, এরর হ্যান্ডলিং
│       ├── modules/            # ফিচার মডিউল (Controller-Service-Repo)
│       │   ├── auth/       users/      library/    reading/
│       │   ├── journal/    calendar/   goals/      tasks/
│       │   ├── habits/     analytics/  settings/
│       │   └── activities/ notifications/ ai/
│       ├── prisma/
│       │   └── schema.prisma   # MongoDB স্কিমা (সমস্ত মডেল)
│       ├── routes/
│       │   └── index.ts        # সমষ্টিগত API রাউটার
│       ├── shared/             # শেয়ার্ড ইউটিলিটি এবং হেল্পার
│       ├── types/              # শেয়ার্ড TypeScript টাইপ
│       └── utils/              # ইউটিলিটি ফাংশন
│
└── docs/                       # প্রজেক্ট ডকুমেন্টেশন
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

## ৪. পূর্বশর্ত

| টুল    | ন্যূনতম সংস্করণ | চেক কমান্ড          |
|--------|--------------|--------------------|
| Node.js| 20+          | `node -v`          |
| pnpm   | 9+           | `pnpm -v`          |
| Git    | 2+           | `git --version`    |

প্রয়োজনে pnpm গ্লোবালি ইনস্টল করুন:
```bash
npm install -g pnpm
```

আপনার একটি **MongoDB** ডেটাবেসও প্রয়োজন। [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ফ্রি টিয়ার সুপারিশকৃত।

---

## ৫. লোকাল ডেভেলপমেন্ট সেটআপ

### ধাপ ১ — রিপোজিটরি ক্লোন করুন

```bash
git clone https://github.com/HasibCoderLab/Knowledge_OS.git
cd Knowledge_OS
```

### ধাপ ২ — সমস্ত ডিপেন্ডেন্সি ইনস্টল করুন

```bash
pnpm install
```

এটি একই সাথে `client` এবং `server` উভয়ের জন্য ডিপেন্ডেন্সি ইনস্টল করে।

### ধাপ ৩ — এনভায়রনমেন্ট ভেরিয়েবল কনফিগার করুন

`server/.env` তৈরি করুন (সমস্ত ভেরিয়েবলের জন্য [ধাপ ৬](#6-environment-variables) দেখুন)।

ঐচ্ছিকভাবে `client/.env` তৈরি করুন:
```
VITE_API_URL=http://localhost:5000/api/v1
```

### ধাপ ৪ — ডেটাবেস স্কিমা পুশ করুন

```bash
cd server
pnpm prisma:push
```

MongoDB-তে Prisma স্কিমা প্রয়োগ করে (কালেকশন এবং ইনডেক্স তৈরি করে)।

### ধাপ ৫ — ডেভেলপমেন্ট সার্ভার চালু করুন

**টার্মিনাল ১ — ব্যাকএন্ড** (`server/` থেকে):
```bash
pnpm dev
# চালু হয়: http://localhost:5000
# হেলথ:    http://localhost:5000/api/v1/health
```

**টার্মিনাল ২ — ফ্রন্টএন্ড** (`client/` থেকে):
```bash
pnpm dev
# চালু হয়: http://localhost:5173
```

### Prisma কমান্ড দ্রুত রেফারেন্স

```bash
# সবই চালাতে হবে: server/ থেকে
pnpm prisma:generate   # Prisma ক্লায়েন্ট পুনরায় তৈরি করুন
pnpm prisma:push       # স্কিমা পরিবর্তন DB-তে পুশ করুন
pnpm prisma:validate   # স্কিমা ফাইল যাচাই করুন
pnpm prisma:studio     # ভিজ্যুয়াল DB ব্রাউজার খুলুন (Prisma Studio)
```

---

## ৬. এনভায়রনমেন্ট ভেরিয়েবল

### `server/.env`

| ভেরিয়েবল                | উদাহরণ / ডিফল্ট                              | বিবরণ                              |
|----------------------|---------------------------------------------|------------------------------------|
| `PORT`               | `5000`                                      | সার্ভার লিসেন পোর্ট                   |
| `NODE_ENV`           | `development`                               | `development` অথবা `production`    |
| `DATABASE_URL`       | `mongodb+srv://user:pass@host/knowledgeos`  | সম্পূর্ণ MongoDB কানেকশন স্ট্রিং      |
| `JWT_SECRET`         | `super_secret_access_token_key_123`         | Access টোকেন সাইনিং সিক্রেট         |
| `JWT_REFRESH_SECRET` | `super_secret_refresh_token_key_456`        | Refresh টোকেন সাইনিং সিক্রেট        |
| `JWT_EXPIRES_IN`     | `15m`                                       | Access টোকেন TTL                   |
| `JWT_REFRESH_EXPIRES_IN` | `7d`                                    | Refresh টোকেন TTL                  |
| `CORS_ORIGIN`        | `http://localhost:5173`                     | অনুমোদিত CORS উৎস                  |
| `COOKIE_SECRET`      | `knowledgeos_cookie_secret_2024`            | কুকি সাইনিং সিক্রেট                 |
| `RATE_LIMIT_WINDOW`  | `900000`                                    | রেট লিমিট উইন্ডো (মিলিসেকেন্ডে, ১৫ মিনিট) |
| `RATE_LIMIT_MAX`     | `100`                                       | প্রতি IP প্রতি উইন্ডো সর্বোচ্চ রিকোয়েস্ট  |
| `BCRYPT_SALT_ROUNDS` | `12`                                        | Bcrypt হ্যাশিং রাউন্ড               |

### `client/.env`

| ভেরিয়েবল        | উদাহরণ                               | বিবরণ                         |
|---------------|--------------------------------------|-------------------------------|
| `VITE_API_URL`| `http://localhost:5000/api/v1`       | ব্যাকএন্ড API বেস URL          |

---

## ৭. ডেটাবেস (MongoDB + Prisma)

স্কিমা ফাইল: `server/src/prisma/schema.prisma`
প্রোভাইডার: **MongoDB** (Prisma MongoDB অ্যাডাপ্টার)

### মডেল পরিচিতি

| মডেল               | বিবরণ                                                  |
|-------------------|--------------------------------------------------------|
| `User`            | মূল প্রোফাইল: ইমেইল, পাসওয়ার্ড, নাম, অ্যাভাটার, সোশ্যাল লিংক, পছন্দ |
| `Book`            | লাইব্রেরি বই: শিরোনাম, লেখক, স্ট্যাটাস (`wishlist/reading/completed`), অগ্রগতি |
| `Note`            | ঐচ্ছিক বই লিংকেজ সহ নোট, ট্যাগ, পিন এবং ফেভারিট ফ্ল্যাগ       |
| `ReadingSession`  | সেশন লগ: পড়া পৃষ্ঠা, সময়কাল, শুরু/শেষ পৃষ্ঠা            |
| `JournalEntry`    | দৈনিক এন্ট্রি: শিরোনাম, বিষয়বস্তু, মেজাজ, তারিখ, ট্যাগ     |
| `Goal`            | লক্ষ্য: ধরন, সময়সীমা, অগ্রগতি, স্ট্যাটাস, অগ্রাধিকার       |
| `GoalProgress`    | লক্ষ্যের জন্য ক্রমবর্ধমান অগ্রগতি লগ এন্ট্রি                  |
| `Task`            | কাজ: অগ্রাধিকার, স্ট্যাটাস (`TODO/IN_PROGRESS/DONE`), নির্ধারিত তারিখ |
| `Habit`           | অভ্যাস: নাম, ফ্রিকোয়েন্সি (`daily/weekly`)               |
| `HabitLog`        | প্রতিদিনের অভ্যাস সমাপ্তি রেকর্ড                           |
| `CalendarEvent`   | ইভেন্ট: তারিখ, সময়, ধরন, বহিরাগত প্রোভাইডার সিঙ্ক তথ্য      |
| `AnalyticsSnapshot`| প্রতি ব্যবহারকারীর জন্য পর্যায়ক্রমিক JSON অ্যানালিটিক্স স্ন্যাপশট |
| `Notification`    | পড়ার স্ট্যাটাস সহ ইন-অ্যাপ বিজ্ঞপ্তি                        |
| `Activity`        | কার্যকলাপ ফিড: অ্যাকশন ধরন, এনটিটি ধরন/আইডি, মেটাডেটা       |
| `UserSettings`    | ব্যবহারকারীর পছন্দ: থিম, ভাষা, রিমাইন্ডার, টাইমজোন         |
| `AIConversation`  | JSON মেসেজ অ্যারে সহ AI চ্যাট সেশন                          |

---

## ৮. API রুট রেফারেন্স

সমস্ত রুট এই প্রিফিক্সের অধীনে: **`/api/v1/`**

| মডিউল         | প্রিফিক্স            | এন্ডপয়েন্ট                                                |
|-------------|---------------------|----------------------------------------------------------|
| Auth        | `/auth`             | `POST /register`, `POST /login`, `POST /logout`, `POST /refresh` |
| Users       | `/users`            | `GET /me`, `PATCH /me`, `PATCH /me/password`, `DELETE /me`, `DELETE /me/data` |
| Library     | `/library`          | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Reading     | `/reading`          | `GET /sessions`, `GET /sessions/:id`, `POST /sessions`, `PATCH /sessions/:id`, `DELETE /sessions/:id` |
| Journal     | `/journal`          | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Calendar    | `/calendar`         | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Goals       | `/goals`            | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Tasks       | `/tasks`            | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` |
| Habits      | `/habits`           | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`, `POST /:id/logs` |
| Analytics   | `/analytics`        | `GET /dashboard`, `GET /reading`, `GET /goals`, `GET /tasks`, `GET /habits` |
| Settings    | `/settings`         | `GET /`, `PATCH /`                                       |
| Activities  | `/activities`       | `GET /`, `GET /recent`, `POST /`                         |
| Notifications| `/notifications`   | `GET /`, `PATCH /:id/read`, `PATCH /read-all`, `DELETE /:id` |
| AI          | `/ai`               | `GET /conversations`, `GET /conversations/:id`, `POST /conversations`, `POST /conversations/:id/messages`, `DELETE /conversations/:id` |
| Health      | `/health`           | `GET /` — সার্ভার স্ট্যাটাস এবং টাইমস্ট্যাম্প রিটার্ন করে     |

---

## ৯. ফ্রন্টএন্ড পেজ এবং রুট

| রুট                 | কম্পোনেন্ট         | অথ? | বিবরণ                             |
|---------------------|-------------------|----|------------------------------------|
| `/`                 | `LandingPage`     | না  | পাবলিক ল্যান্ডিং পেজ                |
| `/auth/login`       | `Login`           | না* | লগইন ফর্ম                          |
| `/auth/register`    | `Register`        | না* | রেজিস্ট্রেশন ফর্ম                   |
| `/dashboard`        | `Dashboard`       | হ্যাঁ | মূল উত্পাদনশীলতা পরিসংখ্যান           |
| `/library`          | `Library`         | হ্যাঁ | বই লাইব্রেরি ব্যবস্থাপনা              |
| `/notes`            | `Notes`           | হ্যাঁ | নোট ব্রাউজার এবং এডিটর               |
| `/goals`            | `Goals`           | হ্যাঁ | লক্ষ্য ট্র্যাকিং এবং অগ্রগতি          |
| `/habits`           | `Habits`          | হ্যাঁ | লগ সহ অভ্যাস ট্র্যাকার               |
| `/tasks`            | `Tasks`           | হ্যাঁ | কাজ ব্যবস্থাপক                       |
| `/journal`          | `Journal`         | হ্যাঁ | জার্নাল এন্ট্রি                      |
| `/reading`          | `ReadingTracker`  | হ্যাঁ | পড়ার সেশন                          |
| `/analytics`        | `Analytics`       | হ্যাঁ | চার্ট এবং অ্যানালিটিক্স               |
| `/calendar`         | `CalendarPage`    | হ্যাঁ | ক্যালেন্ডার ইভেন্ট ভিউ               |
| `/profile`          | `Profile`         | হ্যাঁ | ব্যবহারকারীর প্রোফাইল                 |
| `/settings`         | `SettingsPage`    | হ্যাঁ | অ্যাপ সেটিংস                        |
| `/settings/profile` | `SettingsProfile` | হ্যাঁ | প্রোফাইল সেটিংস                     |
| `/search`           | `Search`          | হ্যাঁ | গ্লোবাল সার্চ                        |
| `/notifications`    | `Notifications`   | হ্যাঁ | বিজ্ঞপ্তি সেন্টার                    |
| `/docs`             | `DocsPage`        | হ্যাঁ | ইন-অ্যাপ ডকুমেন্টেশন                 |
| `/site-map`         | `SiteMapPage`     | হ্যাঁ | সাইট ম্যাপ / নেভিগেশন পরিসংখ্যান      |
| `*`                 | `NotFound`        | না  | ৪০৪ পেজ                             |

> \* `PublicRoute` স্বয়ংক্রিয়ভাবে লগইন করা ব্যবহারকারীদের `/dashboard`-তে পুনঃনির্দেশিত করে।

**রুট গার্ড কম্পোনেন্ট (`App.tsx`-এ):**
- `ProtectedRoute` — অপ্রমাণিত ব্যবহারকারীদের `/auth/login`-তে পুনঃনির্দেশিত করে
- `PublicRoute` — প্রমাণিত ব্যবহারকারীদের `/dashboard`-তে পুনঃনির্দেশিত করে
- `AuthInitializer` — লোডে সংরক্ষিত রিফ্রেশ টোকেন থেকে অথ সেশন পুনরুদ্ধার করে

সমস্ত সুরক্ষিত পেজ কম্পোনেন্ট `React.lazy` + `Suspense` এর মাধ্যমে **লেজি-লোডেড**।

---

## ১০. স্টেট ম্যানেজমেন্ট এবং সার্ভিস

### Zustand স্টোর

| স্টোর       | ফাইল           | স্টেট / অ্যাকশন                                                 |
|------------|----------------|---------------------------------------------------------------|
| `authStore`| `authStore.ts` | `user`, `isAuthenticated`, `isInitializing`, `initAuth()`, `logout()` |
| `toastStore`| `toastStore.ts`| Toast মেসেজ কিউ এবং অ্যাকশন                                      |

### API ক্লায়েন্ট

- **Axios ইনস্ট্যান্স** (`services/api/client.ts`): বেস URL, ক্রেডেনশিয়াল, এবং ইন্টারসেপ্টরের মাধ্যমে স্বয়ংক্রিয় access-টোকেন রিফ্রেশ হ্যান্ডল করে।
- **সার্ভিস মডিউল** (`services/api/index.ts`): প্রতিটি ফিচার মডিউলের জন্য একটি সার্ভিস অবজেক্ট।

| সার্ভিস              | কভার করে                                       |
|--------------------|----------------------------------------------|
| `authApi`          | রেজিস্টার, লগইন, লগআউট, রিফ্রেশ, GetMe       |
| `usersApi`         | প্রোফাইল পাওয়া/আপডেট                          |
| `libraryApi`       | বই CRUD                                      |
| `readingApi`       | পড়ার সেশন CRUD                               |
| `journalApi`       | জার্নাল এন্ট্রি CRUD                           |
| `goalsApi`         | লক্ষ্য CRUD                                   |
| `tasksApi`         | কাজ CRUD                                     |
| `habitsApi`        | অভ্যাস CRUD + লগ সমাপ্তি                       |
| `settingsApi`      | অ্যাকাউন্ট সেটিংস, পাসওয়ার্ড পরিবর্তন            |
| `userSettingsApi`  | ব্যবহারকারীর পছন্দ সেটিংস                       |
| `analyticsApi`     | ড্যাশবোর্ড এবং মডিউল-নির্দিষ্ট অ্যানালিটিক্স       |
| `notificationsApi` | তালিকা, পড়া-চিহ্নিত, বিজ্ঞপ্তি মুছুন           |
| `activitiesApi`    | কার্যকলাপ ফিড                                 |
| `aiApi`            | AI কথোপকথন CRUD এবং মেসেজিং                   |

---

## ১১. আন্তর্জাতিকীকরণ (i18n)

অ্যাপটি একটি কাস্টম কনটেক্স্ট-ভিত্তিক সিস্টের মাধ্যমে **ইংরেজি** (`en`) এবং **বাংলা** (`bn`) সমর্থন করে।

| ফাইল                         | উদ্দেশ্য                                           |
|-----------------------------|--------------------------------------------------|
| `i18n/LanguageProvider.tsx` | কনটেক্স্ট প্রোভাইডার — সমস্ত অ্যাপ র‍্যাপ করে              |
| `i18n/useLanguage.ts`       | অনুবাদ পড়ার এবং ভাষা পরিবর্তন করার হুক                 |
| `i18n/locales/en.ts`        | সমস্ত ইংরেজি অনুবাদ স্ট্রিং                            |
| `i18n/locales/bn.ts`        | সমস্ত বাংলা অনুবাদ স্ট্রিং                             |

ভাষার পছন্দ ব্যবহারকারীর প্রোফাইলে (`User.language`) সংরক্ষিত হয় এবং ব্যাকএন্ডের সাথে সিঙ্ক হয়।

---

## ১২. ব্যাকএন্ড ডেপ্লয় (Render)

### ধাপ ১ — GitHub-এ পুশ করুন

```bash
git add .
git commit -m "chore: prepare for deployment"
git push
```

### ধাপ ২ — Render-এ ওয়েব সার্ভিস তৈরি করুন

1. [dashboard.render.com](https://dashboard.render.com) যান — GitHub দিয়ে সাইন ইন করুন।
2. **New +** → **Web Service** → আপনার রিপো সংযুক্ত করুন।

### ধাপ ৩ — সার্ভিস কনফিগার করুন

| সেটিং         | মান                             |
|---------------|--------------------------------|
| Name          | `knowledge-os-backend`         |
| Root Directory| `server`                       |
| Environment   | `Node`                         |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start`                    |

> `npm run build` `tsc && prisma generate` চালায় — TypeScript কম্পাইল করে এবং Prisma Client তৈরি করে।

### ধাপ ৪ — এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

Render-এর **Environment** ট্যাবে [ধাপ ৬](#6-environment-variables) থেকে সমস্ত কী যোগ করুন:

| কী                       | প্রোডাকশন মান                           |
|-------------------------|---------------------------------------|
| `PORT`                  | `10000`                               |
| `NODE_ENV`              | `production`                          |
| `DATABASE_URL`          | আপনার MongoDB Atlas কানেকশন স্ট্রিং      |
| `JWT_SECRET`            | শক্তিশালী র‍্যান্ডম সিক্রেট              |
| `JWT_REFRESH_SECRET`    | ভিন্ন শক্তিশালী র‍্যান্ডম সিক্রেট         |
| `JWT_EXPIRES_IN`        | `15m`                                 |
| `JWT_REFRESH_EXPIRES_IN`| `7d`                                  |
| `CORS_ORIGIN`           | `*` *(Vercel ডেপ্লয়ের পর আপডেট করুন)*    |
| `COOKIE_SECRET`         | শক্তিশালী র‍্যান্ডম সিক্রেট              |
| `BCRYPT_SALT_ROUNDS`    | `12`                                  |

### ধাপ ৫ — ডেপ্লয় করুন

**Create Web Service** ক্লিক করুন। "Live" স্ট্যাটাস অপেক্ষা করুন। URL কপি করুন (যেমন, `https://knowledge-os-backend.onrender.com`)।

---

## ১৩. ফ্রন্টএন্ড ডেপ্লয় (Vercel)

### ধাপ ১ — প্রজেক্ট ইম্পোর্ট করুন

1. [vercel.com](https://vercel.com) যান — GitHub দিয়ে সাইন ইন করুন।
2. **Add New...** → **Project** → আপনার রিপো ইম্পোর্ট করুন।

### ধাপ ২ — প্রজেক্ট কনফিগার করুন

| সেটিং           | মান                      |
|----------------|--------------------------|
| Project Name   | `knowledge-os-client`    |
| Framework Preset| `Vite`                  |
| Root Directory | `client`                 |
| Build Command  | `npm run build`          |
| Output Directory| `dist`                  |

### ধাপ ৩ — এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

| কী             | মান                                                  |
|---------------|------------------------------------------------------|
| `VITE_API_URL`| `https://knowledge-os-backend.onrender.com/api/v1`   |

### ধাপ ৪ — ডেপ্লয় করুন

**Deploy** ক্লিক করুন। আপনার Vercel URL কপি করুন (যেমন, `https://knowledge-os.vercel.app`)।

### ধাপ ৫ — Render-এ CORS আপডেট করুন

আপনার Render ব্যাকএন্ড সার্ভিসে → **Environment**, আপডেট করুন:
```
CORS_ORIGIN=https://knowledge-os.vercel.app
```

Render স্বয়ংক্রিয়ভাবে সার্ভিস রিস্টার্ট করে। ✅ আপনার ফুল-স্ট্যাক অ্যাপ লাইভ!

---

## ১৪. সমস্যা সমাধান

### ❌ Prisma ক্লায়েন্ট পাওয়া যাচ্ছে না

```bash
cd server
pnpm prisma:generate
```

### ❌ MongoDB কানেকশন ত্রুটি

- MongoDB Atlas-এর **Network Access** আপনার IP অনুমোদন করছে কিনা নিশ্চিত করুন (অথবা ডেভের জন্য `0.0.0.0/0`)।
- কানেকশন স্ট্রিং ফর্ম্যাট যাচাই করুন: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/dbname`

### ❌ ব্ল্যাংক পেজ / রিফ্রেশে ৪০৪ (Vercel SPA)

`client/vercel.json` যোগ করুন:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### ❌ ব্রাউজারে CORS ত্রুটি

- Render-এ `CORS_ORIGIN` আপনার Vercel URL এর সাথে সম্পূর্ণ মিলছে কিনা দেখুন (কোনো ট্রেইলিং স্ল্যাশ নেই)।
- Vercel-এ `VITE_API_URL` `/api/v1`-এ শেষ হচ্ছে কিনা যাচাই করুন।

### ❌ Render বিল্ড ব্যর্থ হয় (prisma generate ত্রুটি)

Build Command পরিবর্তন করুন:
```
npm install && npx prisma generate && npm run build
```

### ❌ ডেপ্লয়ের পর JWT টোকেন / অথ ত্রুটি

নিশ্চিত করুন Render এনভায়রনমেন্টে `JWT_SECRET` এবং `JWT_REFRESH_SECRET` সেট করা আছে। এগুলো পরিবর্তন করলে সমস্ত সক্রিয় সেশন অবৈধ হয়ে যায়।

### ❌ TypeScript বিল্ড ত্রুটি

```bash
cd server
pnpm typecheck   # আউটপুট না দিয়ে টাইপ-চেক করুন
```