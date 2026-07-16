# KnowledgeOS — ডেপ্লয় গাইড (বাংলা)

**KnowledgeOS** প্রজেক্টটি Render (ব্যাকএন্ড) এবং Vercel (ফ্রন্টএন্ড) এ ডেপ্লয় করার সম্পূর্ণ বাংলা গাইড।

---

## সূচিপত্র

1. [গুরুত্বপূর্ণ তথ্য](#১-গুরুত্বপূর্ণ-তথ্য)
2. [ডেপ্লয়ের আগে প্রস্তুতি](#২-ডেপ্লয়ের-আগে-প্রস্তুতি)
3. [ব্যাকএন্ড ডেপ্লয় (Render)](#৩-ব্যাকএন্ড-ডেপ্লয়-render)
4. [ফ্রন্টএন্ড ডেপ্লয় (Vercel)](#৪-ফ্রন্টএন্ড-ডেপ্লয়-vercel)
5. [সমস্যা সমাধান](#৫-সমস্যা-সমাধান)

---

## ১. গুরুত্বপূর্ণ তথ্য

### এই প্রজেক্ট কীভাবে তৈরি?

এই প্রজেক্টটি একটি **pnpm মনোরিপো**। মানে, দুটি ওয়ার্কস্পেস আছে (client + server) এবং সব কিছু pnpm দিয়ে ম্যানেজ হয়।

```
Knowledge_OS/
├── pnpm-workspace.yaml    ← pnpm ওয়ার্কস্পেস কনফিগ
├── pnpm-lock.yaml         ← pnpm লক ফাইল
├── client/                ← React + Vite (ফ্রন্টএন্ড)
└── server/                ← Express + Prisma (ব্যাকএন্ড)
```

### Render-এ npm কেন দেখাচ্ছে?

সেটআপ গাইডে Render-এর জন্য `npm install && npm run build` বলা আছে। কিন্তু এটি একটি pnpm প্রজেক্ট!

**সমাধান:** Render-এ npm ব্যবহার করা যায় (কারণ npm package.json থেকেই প্যাকেজ ইনস্টল করে), কিন্তু **সঠিক উপায়** হলো pnpm ব্যবহার করা। নিচে দুটি পদ্ধতি দেওয়া হলো — আপনি যেকোনো একটি বেছে নিতে পারেন।

---

## ২. ডেপ্লয়ের আগে প্রস্তুতি

### ২.১ MongoDB Atlas সেটআপ

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) এ ফ্রি অ্যাকাউন্ট খুলুন
2. একটি ক্লাস্টার তৈরি করুন (ফ্রি M0 tier যথেষ্ট)
3. **Database Access** এ একটি ইউজার তৈরি করুন
4. **Network Access** এ `0.0.0.0/0` (সব IP) অনুমোদন দিন
5. কানেকশন স্ট্রিং কপি করুন: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/knowledgeos`

### ২.২ সিক্রেট কী তৈরি করুন

নিচের ভ্যালুগুলো নোট করে রাখুন (পরে Render-এ দরকার হবে):

| কী | কীভাবে তৈরি করবেন | উদাহরণ |
|---|---|---|
| `JWT_SECRET` | যেকোনো শক্তিশালী র‍্যান্ডম স্ট্রিং | `my_super_secret_access_key_2026_xyz` |
| `JWT_REFRESH_SECRET` | আরেকটি ভিন্ন শক্তিশালী স্ট্রিং | `my_super_secret_refresh_key_2026_abc` |
| `COOKIE_SECRET` | আরেকটি শক্তিশালী স্ট্রিং | `knowledgeos_cookie_secret_2026` |

### ২.৩ GitHub-এ পুশ করুন

```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

---

## ৩. ব্যাকএন্ড ডেপ্লয় (Render)

### ধাপ ১ — Render-এ ওয়েব সার্ভিস তৈরি করুন

1. [dashboard.render.com](https://dashboard.render.com) যান
2. GitHub দিয়ে সাইন ইন করুন
3. **New +** → **Web Service** ক্লিক করুন
4. আপনার GitHub রিপো সংযুক্ত করুন

### ধাপ ২ — সার্ভিস কনফিগার করুন

এখানে **দুটি পদ্ধতি** আছে। যেকোনো একটি বেছে নিন:

---

#### পদ্ধতি A: npm ব্যবহার করে (সহজ)

> এটি setup.md-তে যা আছে তার সাথে মিলে যায়। npm, pnpm-এর লক ফাইল না পেলেও package.json থেকে ইনস্টল করতে পারে।

| সেটিং | মান |
|---|---|
| **Name** | `knowledge-os-backend` |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

**ব্যাখ্যা:**
- `npm install` — server/package.json থেকে ডিপেন্ডেন্সি ইনস্টল করে
- `npm run build` — `tsc && prisma generate` চালায় (TypeScript কম্পাইল + Prisma Client তৈরি)
- `npm start` — `node dist/app/server.js` চালায়

---

#### পদ্ধতি B: pnpm ব্যবহার করে (সঠিক পদ্ধতি)

> এটি pnpm মনোরিপোর জন্য সঠিক পদ্ধতি। কিন্তু Render-এ pnpm ডিফল্টে থাকে না, তাই ইনস্টল করতে হবে।

| সেটিং | মান |
|---|---|
| **Name** | `knowledge-os-backend` |
| **Root Directory** | `.` (ডট — মানে রুট ডাইরেক্টরি) |
| **Environment** | `Node` |
| **Build Command** | `npm install -g pnpm && pnpm install --filter server && pnpm --filter server run build` |
| **Start Command** | `pnpm --filter server run start` |

**ব্যাখ্যা:**
- `npm install -g pnpm` — Render-এ pnpm ইনস্টল করে
- `pnpm install --filter server` — শুধু server workspace-এর ডিপেন্ডেন্সি ইনস্টল করে
- `pnpm --filter server run build` — server-এর build script চালায়
- `pnpm --filter server run start` — server-কে চালু করে

---

### ধাপ ৩ — এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

Render সার্ভিস তৈরির পর, **Environment** ট্যাবে নিচের সব কী যোগ করুন:

| কী | মান |
|---|---|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | আপনার MongoDB Atlas কানেকশন স্ট্রিং |
| `JWT_SECRET` | আপনার তৈরি করা সিক্রেট কী |
| `JWT_REFRESH_SECRET` | আপনার তৈরি করা আরেকটি সিক্রেট কী |
| `JWT_EXPIRES_IN` | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | `7d` |
| `CORS_ORIGIN` | `*` (পরে Vercel URL দিয়ে আপডেট করবেন) |
| `COOKIE_SECRET` | আপনার তৈরি করা সিক্রেট কী |
| `BCRYPT_SALT_ROUNDS` | `12` |
| `RATE_LIMIT_WINDOW` | `900000` |
| `RATE_LIMIT_MAX` | `100` |

### ধাপ ৪ — ডেপ্লয় করুন

**Create Web Service** ক্লিক করুন। "Live" স্ট্যাটাস আসা পর্যন্ত অপেক্ষা করুন।

URL কপি করুন (যেমন: `https://knowledge-os-backend.onrender.com`)।

**হেলথ চেক:** ব্রাউজারে খুলুন — `https://knowledge-os-backend.onrender.com/api/v1/health`
- সফল হলে JSON রেসপন্স পাবেন
- ব্যর্থ হলে Render Logs দেখুন

---

## ৪. ফ্রন্টএন্ড ডেপ্লয় (Vercel)

### ধাপ ১ — Vercel-এ প্রজেক্ট ইম্পোর্ট করুন

1. [vercel.com](https://vercel.com) যান
2. GitHub দিয়ে সাইন ইন করুন
3. **Add New...** → **Project** ক্লিক করুন
4. আপনার GitHub রিপো সংযুক্ত করুন

### ধাপ ২ — প্রজেক্ট কনফিগার করুন

| সেটিং | মান |
|---|---|
| **Project Name** | `knowledge-os-client` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `client` |
| **Build Command** | `pnpm install && pnpm run build` |
| **Output Directory** | `dist` |

> Vercel auto-detect করে যে pnpm-lock.yaml আছে, তাই pnpm ব্যবহার করবে।

### ধাপ ৩ — এনভায়রনমেন্ট ভেরিয়েবল সেট করুন

| কী | মান |
|---|---|
| `VITE_API_URL` | `https://knowledge-os-backend.onrender.com/api/v1` |

> ⚠️ `VITE_API_URL` শুধুমাত্র বিল্ডের সময় কাজ করে। পরিবর্তন করলে **redeploy** করতে হবে।

### ধাপ ৪ — ডেপ্লয় করুন

**Deploy** ক্লিক করুন। ডেপ্লয় শেষ হলে URL কপি করুন (যেমন: `https://knowledge-os.vercel.app`)।

### ধাপ ৫ — SPA রাউটিং সমস্যা সমাধান

Vercel-এ React SPA refresh করলে 404 এরর আসতে পারে। এটি সমাধান করতে `client/vercel.json` ফাইল তৈরি করুন:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

এই ফাইল GitHub-এ পুশ করুন। Vercel automatically redeploy করবে।

### ধাপ ৬ — Render-এ CORS আপডেট করুন

ফ্রন্টএন্ড ডেপ্লয় হয়ে গেলে, Render ব্যাকএন্ডে `CORS_ORIGIN` আপডেট করুন:

```
CORS_ORIGIN=https://knowledge-os.vercel.app
```

> Render automatically সার্ভিস restart করবে। কোনো কিছু করতে হবে না।

---

## ৫. সমস্যা সমাধান

### ❌ "npm ERR! code ENOENT" বা "npm ERR! enoent" — package-lock.json পাওয়া যায়নি

**কারণ:** এটি pnpm প্রজেক্ট, package-lock.json নেই।

**সমাধান:** Render-এ Build Command এ `npm install` ব্যবহার করুন (npm package.json থেকেই পড়তে পারে)। অথবা পদ্ধতি B ব্যবহার করুন।

### ❌ Prisma Client পাওয়া যাচ্ছে না

**সমাধান:** Build Command এ `npx prisma generate` যোগ করুন:
```
npm install && npx prisma generate && npm run build
```

### ❌ MongoDB কানেকশন ত্রুটি

- MongoDB Atlas-এ **Network Access** যাচাই করুন — `0.0.0.0/0` থাকতে হবে
- কানেকশন স্ট্রিং ফর্ম্যাট: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/dbname`
- পাসওয়ার্ডে বিশেষ চিহ্ন থাকলে URL encode করুন (যেমন: `@` → `%40`)

### ❌ CORS ত্রুটি (ব্রাউজারে)

- Render-এ `CORS_ORIGIN` আপনার Vercel URL এর সাথে মিলছে কিনা দেখুন
- শেষে কোনো স্ল্যাশ `/` নেই কিনা দেখুন
- ভুল উদাহরণ: `CORS_ORIGIN=https://knowledge-os.vercel.app/`
- সঠিক উদাহরণ: `CORS_ORIGIN=https://knowledge-os.vercel.app`

### ❌ JWT/অথ ত্রুটি ডেপ্লয়ের পর

- Render এনভায়রনমেন্টে `JWT_SECRET` এবং `JWT_REFRESH_SECRET` সেট করা আছে কিনা দেখুন
- এগুলো পরিবর্তন করলে সমস্ত পুরানো সেশন অবৈধ হয়ে যাবে

### ❌ TypeScript বিল্ড ত্রুটি

লোকালে চেক করুন:
```bash
cd server
pnpm typecheck
```

ত্রুটি থাকলে সেগুলো ফিক্স করে আবার পুশ করুন।

### ❌ Render স্লিপ হয়ে যাচ্ছে (Free Tier)

Render Free Tier 15 মিনিট নিষ্ক্রিয় থাকলে স্লিপ হয়। পরবারী রিকোয়েস্টে 30-50 সেকেন্ড লাগতে পারে।

**সমাধান:** [UptimeRobot](https://uptimerobot.com) ব্যবহার করে প্রতি 5 মিনিটে হেলথ চেক পাঠান:
```
https://knowledge-os-backend.onrender.com/api/v1/health
```

---

## ডেপ্লয় চেকলিস্ট

- [ ] MongoDB Atlas সেটআপ ও কানেকশন স্ট্রিং প্রস্তুত
- [ ] GitHub-এ কোড পুশ করা হয়েছে
- [ ] Render-এ ব্যাকএন্ড সার্ভিস তৈরি ও কনফিগার করা হয়েছে
- [ ] Render Environment Variables সেট করা হয়েছে
- [ ] ব্যাকএন্ড হেলথ চেক কাজ করছে
- [ ] Vercel-এ ফ্রন্টএন্ড প্রজেক্ট তৈরি ও কনফিগার করা হয়েছে
- [ ] Vercel Environment Variables সেট করা হয়েছে
- [ ] `client/vercel.json` তৈরি ও পুশ করা হয়েছে
- [ ] Render-এ CORS_ORIGIN আপডেট করা হয়েছে
- [ ] লগইন/রেজিস্ট্রেশন কাজ করছে
- [ ] API রিকোয়েস্ট কাজ করছে
