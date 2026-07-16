# নলেজ ওএস (Knowledge OS) - ফুল ডেপ্লয়মেন্ট সেটআপ গাইড

এই গাইডটি Knowledge OS প্রজেক্ট ডেপ্লয় করার জন্য ধাপে ধাপে নির্দেশনা প্রদান করে।
প্রজেক্টটি একটি মনোরেপো (monorepo), যাতে একটি React/Vite ফ্রন্টএন্ড (`client`) এবং একটি Express/Prisma Node.js ব্যাকএন্ড (`server`) রয়েছে।

## সূচিপত্র (Table of Contents)
1. [ব্যাকএন্ড ডেপ্লয়মেন্ট (Render)](#backend-deployment-render)
2. [ফ্রন্টএন্ড ডেপ্লয়মেন্ট (Vercel)](#frontend-deployment-vercel)

---

## ব্যাকএন্ড ডেপ্লয়মেন্ট (Render)

আমরা আমাদের ব্যাকএন্ড [Render](https://render.com/)-এ ডেপ্লয় করবো, যা Node.js API এবং ডাটাবেসের জন্য দারুণ।

### পূর্বশর্ত (Prerequisites)
1. আপনার সম্পূর্ণ রিপোজিটরি GitHub-এ পুশ (Push) করুন।
2. নিশ্চিত করুন যে আপনার `server/package.json` ফাইলে নিচের স্ক্রিপ্টগুলো আছে (এগুলো আগে থেকেই সেটআপ করা আছে):
   - `"build": "tsc && prisma generate"`
   - `"start": "node dist/app/server.js"`

### Render-এ ডেপ্লয় করার ধাপসমূহ

1. **Sign Up / Log In**: [Render](https://dashboard.render.com/)-এ যান এবং GitHub দিয়ে সাইন ইন করুন।
2. **ডাটাবেস তৈরি করুন (Create Database) (ঐচ্ছিক কিন্তু প্রস্তাবিত)**:
   - **New +** -> **PostgreSQL** এ ক্লিক করুন।
   - এটিকে একটি নাম দিন এবং ডাটাবেস তৈরি করুন।
   - তৈরি হয়ে গেলে, **Internal Database URL** (যদি Render-এই রাখেন) অথবা **External Database URL** কপি করুন।
3. **ওয়েব সার্ভিস তৈরি করুন (Create Web Service)**:
   - **New +** -> **Web Service** এ ক্লিক করুন।
   - আপনার GitHub রিপোজিটরি কানেক্ট করুন।
4. **ওয়েব সার্ভিস কনফিগার করুন**:
   - **Name**: `knowledge-os-backend` (অথবা আপনার পছন্দের নাম)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **এনভায়রনমেন্ট ভেরিয়েবল সেট করুন (Set Environment Variables)**:
   নিচে স্ক্রল করে **Environment Variables** সেকশনে যান এবং আপনার `server/.env` ফাইল থেকে প্রয়োজনীয় ভেরিয়েবলগুলো যোগ করুন:
   - `PORT`: `10000` (Render-এর ডিফল্ট)
   - `DATABASE_URL`: `your_postgresql_database_url` (ধাপ ২ থেকে, অথবা Supabase/Neon-এর মতো আপনার বর্তমান ডাটাবেস প্রোভাইডার থেকে)
   - `JWT_SECRET`: `your_super_secret_jwt_key`
   - `CORS_ORIGIN`: `*` (নিরাপত্তার জন্য ফ্রন্টএন্ড ডেপ্লয়মেন্টের পর এটিকে আপনার Vercel ফ্রন্টএন্ড URL-এ পরিবর্তন করুন, যেমন, `https://knowledge-os.vercel.app`)
6. **ডেপ্লয় করুন (Deploy)**:
   - **Create Web Service** এ ক্লিক করুন।
   - Render আপনার ব্যাকএন্ড বিল্ড করা শুরু করবে। "Live" লেখা আসা পর্যন্ত অপেক্ষা করুন।
   - ডেপ্লয় করা ব্যাকএন্ডের URL কপি করুন (যেমন, `https://knowledge-os-backend.onrender.com`)। ফ্রন্টএন্ডের জন্য আপনার এটি প্রয়োজন হবে।

---

## ফ্রন্টএন্ড ডেপ্লয়মেন্ট (Vercel)

আমরা ফ্রন্টএন্ড [Vercel](https://vercel.com/)-এ ডেপ্লয় করবো, যা Vite এবং React অ্যাপগুলোর জন্য নির্বিঘ্ন হোস্টিং প্রদান করে।

### পূর্বশর্ত (Prerequisites)
1. Render থেকে ডেপ্লয় করা ব্যাকএন্ড URL টি প্রস্তুত রাখুন।

### Vercel-এ ডেপ্লয় করার ধাপসমূহ

1. **Sign Up / Log In**: [Vercel](https://vercel.com/)-এ যান এবং GitHub দিয়ে সাইন ইন করুন।
2. **নতুন প্রজেক্ট যোগ করুন (Add New Project)**:
   - **Add New...** -> **Project** এ ক্লিক করুন।
   - আপনার GitHub রিপোজিটরি ইমপোর্ট (Import) করুন।
3. **প্রজেক্ট কনফিগার করুন**:
   - **Project Name**: `knowledge-os-client`
   - **Framework Preset**: `Vite`
   - **Root Directory**: "Edit" এ ক্লিক করে `client` সিলেক্ট করুন।
4. **বিল্ড এবং আউটপুট সেটিংস (Build and Output Settings)**:
   Vercel সাধারণত Vite-এর জন্য এগুলো স্বয়ংক্রিয়ভাবে ডিটেক্ট করে, কিন্তু যাচাই করে নিন:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **এনভায়রনমেন্ট ভেরিয়েবল সেট করুন (Set Environment Variables)**:
   **Environment Variables** সেকশনটি এক্সপ্যান্ড (Expand) করুন। আপনার `client/.env` (যদি থাকে) থেকে ভেরিয়েবলগুলো যোগ করুন। সবচেয়ে গুরুত্বপূর্ণ হলো API URL সেট করা:
   - `VITE_API_URL`: `https://knowledge-os-backend.onrender.com/api` (আপনার আসল Render ব্যাকএন্ড URL দিয়ে রিপ্লেস করুন)
6. **ডেপ্লয় করুন (Deploy)**:
   - **Deploy** এ ক্লিক করুন।
   - Vercel আপনার সাইট বিল্ড এবং ডেপ্লয় করবে।
7. **ব্যাকএন্ড CORS চূড়ান্ত করুন (Finalize Backend CORS)**:
   - Vercel যখন আপনাকে আপনার ফ্রন্টএন্ড URL (যেমন, `https://knowledge-os.vercel.app`) দেবে, তখন আপনার **Render Dashboard**-এ ফিরে যান।
   - আপনার ব্যাকএন্ড সার্ভিস খুলুন -> **Environment**।
   - আপনার Vercel URL-এর সাথে মেলাতে `CORS_ORIGIN` আপডেট করুন।
   - পরিবর্তনগুলো সেভ করুন (Render স্বয়ংক্রিয়ভাবে ব্যাকএন্ড রিস্টার্ট করবে)।

---

## সমস্যা সমাধান (Troubleshooting)

- **Render-এ ডাটাবেস এরর (Database Errors on Render)**: নিশ্চিত করুন যে আপনি আপনার বিল্ড কমান্ডে `prisma generate` রান করেছেন, এবং যদি আপনার স্কিমা পরিবর্তনের (schema changes) প্রয়োজন হয়, তাহলে আপনার ডেপ্লয় স্ক্রিপ্টের অংশ হিসেবে `npx prisma db push` রান করার বিষয়টি বিবেচনা করুন অথবা প্রোডাকশন ডাটাবেসে কানেক্ট করে লোকালি এটি ম্যানুয়ালি রান করুন।
- **ফ্রন্টএন্ড ডাটা ফেচ (fetch) করছে না**: ব্রাউজারের ডেভেলপার টুলস (F12) খুলুন -> Network ট্যাবে যান। রিকোয়েস্টগুলো ফেইল করছে কিনা তা পরীক্ষা করুন। নিশ্চিত করুন যে Vercel-এ `VITE_API_URL` সঠিকভাবে সেট করা হয়েছে এবং Render-এ CORS যথাযথভাবে কনফিগার করা হয়েছে।
