# Knowledge OS - Full Deployment Setup Guide

This guide provides step-by-step instructions to deploy the Knowledge OS project. 
The project is a monorepo containing a React/Vite frontend (`client`) and an Express/Prisma Node.js backend (`server`).

## Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)

---

## Backend Deployment (Render)

We will deploy the backend to [Render](https://render.com/), which is great for Node.js APIs and databases.

### Prerequisites
1. Push your full repository to GitHub.
2. Make sure your `server/package.json` has the following scripts (they are already set up):
   - `"build": "tsc && prisma generate"`
   - `"start": "node dist/app/server.js"`

### Steps to Deploy on Render

1. **Sign Up / Log In**: Go to [Render](https://dashboard.render.com/) and sign in with GitHub.
2. **Create Database (Optional but Recommended)**: 
   - Click **New +** -> **PostgreSQL**.
   - Give it a name and create the database.
   - Once created, copy the **Internal Database URL** (if keeping on Render) or **External Database URL**.
3. **Create Web Service**:
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.
4. **Configure Web Service**:
   - **Name**: `knowledge-os-backend` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Set Environment Variables**:
   Scroll down to the **Environment Variables** section and add the required variables from your `server/.env` file:
   - `PORT`: `10000` (Render default)
   - `DATABASE_URL`: `your_postgresql_database_url` (from step 2, or your existing database provider like Supabase/Neon)
   - `JWT_SECRET`: `your_super_secret_jwt_key`
   - `CORS_ORIGIN`: `*` (Change this to your Vercel frontend URL after frontend deployment for security, e.g., `https://knowledge-os.vercel.app`)
6. **Deploy**:
   - Click **Create Web Service**. 
   - Render will start building your backend. Wait for it to show "Live".
   - Copy the deployed backend URL (e.g., `https://knowledge-os-backend.onrender.com`). You will need this for the frontend.

---

## Frontend Deployment (Vercel)

We will deploy the frontend to [Vercel](https://vercel.com/), which provides seamless hosting for Vite and React apps.

### Prerequisites
1. Have the deployed Backend URL from Render ready.

### Steps to Deploy on Vercel

1. **Sign Up / Log In**: Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. **Add New Project**:
   - Click **Add New...** -> **Project**.
   - Import your GitHub repository.
3. **Configure Project**:
   - **Project Name**: `knowledge-os-client`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and select `client`.
4. **Build and Output Settings**:
   Vercel usually detects these automatically for Vite, but verify:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Set Environment Variables**:
   Expand the **Environment Variables** section. Add your variables from `client/.env` (if any). Crucially, set the API URL:
   - `VITE_API_URL`: `https://knowledge-os-backend.onrender.com/api` (Replace with your actual Render backend URL)
6. **Deploy**:
   - Click **Deploy**.
   - Vercel will build and deploy your site.
7. **Finalize Backend CORS**:
   - Once Vercel gives you your frontend URL (e.g., `https://knowledge-os.vercel.app`), go back to your **Render Dashboard**.
   - Open your backend service -> **Environment**.
   - Update `CORS_ORIGIN` to match your Vercel URL.
   - Save changes (Render will automatically restart the backend).

---

## Troubleshooting

- **Database Errors on Render**: Make sure you have run `prisma generate` in your build command, and if you need to push schema changes, consider running `npx prisma db push` as part of your deploy script or running it manually locally connecting to the production DB.
- **Frontend not fetching data**: Open browser developer tools (F12) -> Network tab. Check if the requests are failing. Ensure `VITE_API_URL` is set correctly in Vercel and CORS is properly configured on Render.
