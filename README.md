# KnowledgeOS

A comprehensive personal knowledge management and productivity platform built with modern web technologies. KnowledgeOS combines reading tracking, journaling, goal setting, task management, habit tracking, and analytics into a unified SaaS application.

## 🚀 Overview

KnowledgeOS is a production-ready personal knowledge operating system designed for lifelong learners, avid readers, and productivity enthusiasts. It provides tools to track reading progress, capture insights, set and achieve goals, manage tasks, build habits, and gain insights through analytics.

## ✨ Features

### 📚 Library & Reading Tracker
- **Book Management**: Add, categorize, and track books (wishlist, reading, completed, paused, dropped)
- **Reading Sessions**: Log reading sessions with pages read, duration, start/end pages
- **Progress Tracking**: Visual progress bars, reading streaks, total pages read
- **Rich Metadata**: Authors, categories, ratings, tags, cover images, start/finish dates

### 📝 Journal & Notes
- **Structured Journaling**: Title, content, mood tracking (great/good/neutral/bad/terrible)
- **Tagging System**: Organize entries with custom tags
- **Search & Filter**: Full-text search across entries, filter by mood, date, tags
- **Rich Content**: Markdown-ready content with timestamps

### 🎯 Goals & Progress
- **Goal Types**: Short-term and long-term goals
- **Progress Tracking**: Visual progress bars, current/target values
- **Priority Levels**: Low, medium, high priority
- **Status Management**: Not started, in progress, completed, failed
- **Deadline Tracking**: Optional deadlines with overdue indicators

### ✅ Task Management
- **Kanban-style**: TODO, In Progress, Done statuses
- **Prioritization**: Low, medium, high priority
- **Due Dates**: Calendar integration with overdue highlighting
- **Categories**: Custom categorization
- **Goal Linking**: Optional association with goals

### 🔄 Habit Tracking
- **Flexible Frequencies**: Daily, weekly, custom
- **Streak Calculation**: Automatic current/longest streak tracking
- **Visual Calendar**: 28-day heatmap visualization
- **Logging System**: Daily completion logs with notes

### 📊 Analytics Dashboard
- **Reading Analytics**: Books completed, pages read, sessions, streaks
- **Goal Analytics**: Progress rates, completion rates, category breakdown
- **Task Analytics**: Completion rates, priority distribution, overdue tracking
- **Habit Analytics**: Consistency rates, streak analytics, frequency analysis

### 🔐 Authentication & Security
- **JWT-based Auth**: Access tokens (15min) + Refresh tokens (7 days)
- **Secure Password Storage**: bcrypt with configurable salt rounds
- **Token Rotation**: Automatic refresh token rotation on each use
- **Protected Routes**: Server-side middleware + client-side guards
- **Logout Security**: Server-side token invalidation + client cache clearing

### 👤 User Profile & Settings
- **Profile Management**: Name, username, bio, location, website
- **Social Links**: GitHub, LinkedIn, Twitter/X
- **Avatar Support**: Gravatar integration + custom URLs
- **Preferences**: Theme (light/dark/system), language (EN/BN), timezone
- **Change Password**: Secure password change with current password verification

## 🏗 Architecture

### System Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                        KnowledgeOS                              │
├──────────────────────┬──────────────────────────────────────────┤
│      Frontend        │              Backend                      │
│  (React + TypeScript)│        (Node.js + Express + TypeScript)   │
├──────────────────────┼──────────────────────────────────────────┤
│  • React 19          │  • Express 5                             │
│  • Vite 6            │  • Prisma ORM                            │
│  • TanStack Query v5 │  • MongoDB                               │
│  • React Router v7   │  • JWT (jsonwebtoken)                    │
│  • Tailwind CSS v3   │  • bcryptjs                              │
│  • Framer Motion     │  • Zod v4 (validation)                   │
│  • Zustand           │  • Helmet, CORS, Rate Limiting           │
└──────────────────────┴──────────────────────────────────────────┘
```

### Backend Layer Structure (Clean Architecture)
```
src/modules/
├── auth/           # Authentication (register, login, refresh, logout)
├── users/          # User profile & password management
├── library/        # Book management
├── reading/        # Reading sessions
├── journal/        # Journal entries
├── goals/          # Goal management
├── tasks/          # Task management
├── habits/         # Habit tracking
├── analytics/      # Aggregated analytics
├── settings/       # User preferences
├── activities/     # Activity logging
├── notifications/  # Notification system
├── calendar/       # Calendar events
└── ai/             # AI conversations
```

Each module follows **Repository Pattern**:
```
Controller → Service → Repository → Prisma → MongoDB
```

### Frontend Structure
```
src/
├── components/       # Reusable UI components
├── layouts/          # Page layouts (MainLayout, AuthLayout)
├── pages/            # Route-level pages
├── features/         # Feature-specific components & logic
├── services/         # API layer (TanStack Query + Axios)
├── store/            # Zustand state management
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── i18n/             # Internationalization (EN/BN)
```

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Library |
| TypeScript | 5.9 | Type Safety |
| Vite | 6 | Build Tool |
| TanStack Query | 5 | Server State Management |
| React Router | 7 | Routing |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 12 | Animations |
| Zustand | 5 | Client State |
| Axios | 1.7 | HTTP Client |
| Zod | 4 | Schema Validation |
| Lucide React | 0.4 | Icons |
| React Hook Form | 7 | Form Handling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22+ | Runtime |
| Express | 5 | Web Framework |
| TypeScript | 5.9 | Type Safety |
| Prisma | 6 | ORM |
| MongoDB | 8+ | Database |
| JWT | 9 | Authentication |
| bcryptjs | 3 | Password Hashing |
| Zod | 4 | Validation |
| Helmet | 8 | Security Headers |
| CORS | 2.8 | Cross-Origin |
| Express Rate Limit | 7 | Rate Limiting |

## 📦 Project Structure

```
KnowledgeOS/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── components/         # Shared UI Components
│   │   │   ├── ui/            # Base UI Components (Button, Input, Card, Modal, etc.)
│   │   │   └── layout/        # Layout Components (Sidebar, TopNavbar, Footer)
│   │   ├── pages/             # Page Components
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── dashboard/     # Main Dashboard
│   │   │   ├── library/       # Book Library
│   │   │   ├── reading/       # Reading Tracker
│   │   │   ├── journal/       # Journal
│   │   │   ├── goals/         # Goals
│   │   │   ├── tasks/         # Tasks
│   │   │   ├── habits/        # Habits
│   │   │   ├── analytics/     # Analytics Dashboard
│   │   │   ├── calendar/      # Calendar
│   │   │   ├── profile/       # User Profile
│   │   │   └── settings/      # Settings (Profile, Account, Language, About)
│   │   ├── features/          # Feature-specific Components
│   │   ├── services/          # API Layer
│   │   │   └── api/           # TanStack Query + Axios
│   │   ├── store/             # Zustand Stores (authStore, toastStore)
│   │   ├── hooks/             # Custom Hooks
│   │   ├── types/             # TypeScript Types
│   │   ├── i18n/              # Internationalization
│   │   ├── layouts/           # Page Layouts
│   │   └── utils/             # Utilities
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                     # Backend Application
│   ├── src/
│   │   ├── app/               # App Configuration
│   │   ├── middleware/        # Express Middleware
│   │   ├── modules/           # Feature Modules (Clean Architecture)
│   │   ├── shared/            # Shared Utilities (errors, responses, asyncHandler)
│   │   ├── utils/             # Utilities (token, logger)
│   │   ├── routes/            # Route Aggregation
│   │   ├── types/             # TypeScript Types
│   │   └── app.ts             # Express App Setup
│   ├── prisma/
│   │   └── schema.prisma      # Database Schema
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                # Root Workspace (pnpm)
├── pnpm-workspace.yaml
└── README.md
```

## 🗄 Database Schema

### Core Models
```prisma
model User {
  id                String   @id @default(auto()) @map("_id") @db.ObjectId
  email             String   @unique
  password          String
  name              String
  username          String?  @unique
  avatar            String?
  bio               String?
  location          String?
  website           String?
  github            String?
  linkedin          String?
  twitter           String?
  refreshToken      String?
  emailVerified     Boolean  @default(false)
  verificationToken String?
  resetToken        String?
  resetTokenExp     DateTime?
  theme             String   @default("system")
  language          String   @default("en")
  timezone          String   @default("UTC")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  books             Book[]
  readingSessions   ReadingSession[]
  journalEntries    JournalEntry[]
  goals             Goal[]
  tasks             Task[]
  habits            Habit[]
  calendarEvents    CalendarEvent[]
  notifications     Notification[]
  activities        Activity[]
  analyticsSnapshots AnalyticsSnapshot[]
  notes             Note[]
  settings          UserSettings?
}

model Book {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  userId          String   @db.ObjectId
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title           String
  author          String
  category        String?
  coverUrl        String?
  status          String   @default("wishlist")
  totalPages      Int?
  currentPage     Int      @default(0)
  startDate       DateTime?
  finishDate      DateTime?
  rating          Int?
  tags            String[]
  notes           Note[]
  readingSessions ReadingSession[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ReadingSession {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  userId          String   @db.ObjectId
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  bookId          String   @db.ObjectId
  book            Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
  date            DateTime
  pagesRead       Int
  durationMinutes Int
  startPage       Int
  endPage         Int
  createdAt       DateTime @default(now())
}

model JournalEntry {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  content   String
  mood      String
  date      DateTime
  tags      String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Goal {
  id            String        @id @default(auto()) @map("_id") @db.ObjectId
  userId        String        @db.ObjectId
  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  title         String
  description   String?
  type          String        @default("short-term")
  deadline      DateTime?
  progress      Int           @default(0)
  status        String        @default("NOT_STARTED")
  priority      String        @default("medium")
  targetValue   Float         @default(100)
  currentValue  Float         @default(0)
  progressLogs  GoalProgress[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Task {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @db.ObjectId
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String
  description String?
  priority    String   @default("medium")
  status      String   @default("TODO")
  dueDate     DateTime?
  isCompleted Boolean  @default(false)
  goalId      String?  @db.ObjectId
  category    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Habit {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  userId      String     @db.ObjectId
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  description String?
  frequency   String     @default("daily")
  logs        HabitLog[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model HabitLog {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  habitId   String   @db.ObjectId
  habit     Habit    @relation(fields: [habitId], references: [id], onDelete: Cascade)
  date      DateTime
  completed Boolean  @default(true)
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm 9+
- MongoDB 8+ (local or Atlas)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/KnowledgeOS.git
cd KnowledgeOS

# Install dependencies (root + client + server)
pnpm install

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your configuration

# Generate Prisma Client
cd server && pnpm prisma generate

# Run database migrations (if needed)
# pnpm prisma migrate dev

# Start development servers (from root)
pnpm dev
```

### Environment Variables

**server/.env**
```env
# Database
DATABASE_URL="mongodb://localhost:27017/knowledgeos"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# bcrypt
BCRYPT_SALT_ROUNDS=12

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL="http://localhost:5173"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Available Scripts

```bash
# Root
pnpm dev              # Start both client & server (concurrently)
pnpm build            # Build both client & server
pnpm lint             # Lint all packages

# Client
cd client
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm lint             # ESLint

# Server
cd server
pnpm dev              # Start with tsx watch
pnpm build            # TypeScript compile + Prisma generate
pnpm start            # Run compiled JS
pnpm prisma generate  # Generate Prisma Client
pnpm prisma migrate dev  # Run migrations
pnpm prisma studio    # Open Prisma Studio
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout (invalidate refresh token) |
| GET | `/api/v1/users/me` | Get current user profile |
| PATCH | `/api/v1/users/me` | Update profile |
| PATCH | `/api/v1/users/me/password` | Change password |

### Library (Books)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/library` | List books (paginated, filterable) |
| POST | `/api/v1/library` | Create book |
| GET | `/api/v1/library/:id` | Get book by ID |
| PATCH | `/api/v1/library/:id` | Update book |
| DELETE | `/api/v1/library/:id` | Delete book |

### Reading Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/reading/sessions` | List sessions |
| POST | `/api/v1/reading/sessions` | Create session |
| GET | `/api/v1/reading/sessions/:id` | Get session |
| PATCH | `/api/v1/reading/sessions/:id` | Update session |
| DELETE | `/api/v1/reading/sessions/:id` | Delete session |

### Journal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/journal` | List entries |
| POST | `/api/v1/journal` | Create entry |
| GET | `/api/v1/journal/:id` | Get entry |
| PATCH | `/api/v1/journal/:id` | Update entry |
| DELETE | `/api/v1/journal/:id` | Delete entry |

### Goals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/goals` | List goals |
| POST | `/api/v1/goals` | Create goal |
| GET | `/api/v1/goals/:id` | Get goal |
| PATCH | `/api/v1/goals/:id` | Update goal |
| DELETE | `/api/v1/goals/:id` | Delete goal |
| POST | `/api/v1/goals/:id/progress` | Log progress |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | List tasks |
| POST | `/api/v1/tasks` | Create task |
| GET | `/api/v1/tasks/:id` | Get task |
| PATCH | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

### Habits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/habits` | List habits |
| POST | `/api/v1/habits` | Create habit |
| GET | `/api/v1/habits/:id` | Get habit |
| PATCH | `/api/v1/habits/:id` | Update habit |
| DELETE | `/api/v1/habits/:id` | Delete habit |
| POST | `/api/v1/habits/:id/logs` | Log habit completion |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard` | Dashboard summary |
| GET | `/api/v1/analytics/reading` | Reading analytics |
| GET | `/api/v1/analytics/goals` | Goals analytics |
| GET | `/api/v1/analytics/tasks` | Tasks analytics |
| GET | `/api/v1/analytics/habits` | Habits analytics |

## 🎨 UI/UX Design System

### Design Principles
- **Premium SaaS Quality**: Inspired by Linear, Notion, Vercel, GitHub, Arc
- **Consistent Spacing**: 4px base unit (4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64)
- **Typography Scale**: Clamp-based fluid typography
- **Color System**: Semantic colors (primary, success, warning, danger, info)
- **Dark Mode First**: System preference detection with manual toggle
- **Micro-interactions**: Framer Motion animations (hover, tap, enter/exit)

### Component Library
- **Button**: Primary, Secondary, Outline, Ghost, Danger variants + loading states
- **Input/Textarea**: Label, error, help text, disabled, required
- **Card**: Base, hoverable, with optional title/subtitle
- **Modal**: Portal-based, focus trap, ESC to close, backdrop click
- **Dropdown**: Keyboard navigable, click outside to close
- **Avatar**: Image fallback to initials, multiple sizes (sm, md, lg, xl)
- **Badge**: Variants (default, success, warning, danger, info)
- **Skeleton**: Loading placeholders matching component shapes
- **Toast**: Success, error, info, warning with auto-dismiss

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Wide**: > 1280px

## 🌐 Internationalization (i18n)

Supported languages: **English** (default), **Bengali (বাংলা)**

```typescript
// Adding new translations
// client/src/i18n/locales/en.ts
export const en = {
  common: { save: 'Save', cancel: 'Cancel' },
  auth: { login: { title: 'Welcome Back' } },
  // ...
}

// client/src/i18n/locales/bn.ts
export const bn = {
  common: { save: 'সংরক্ষণ', cancel: 'বাতিল' },
  auth: { login: { title: 'আপনার স্বাগতম' } },
  // ...
}
```

## 🔒 Security Considerations

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: RS256 signing, short-lived access tokens (15min)
- **Refresh Token Rotation**: New refresh token on each use
- **Rate Limiting**: 100 req/15min per IP (configurable)
- **CORS**: Strict origin validation
- **Helmet**: Security headers (CSP, HSTS, X-Frame-Options)
- **Input Validation**: Zod schemas on all endpoints
- **SQL/NoSQL Injection**: Prisma parameterized queries
- **XSS Prevention**: React auto-escaping + CSP

## 🧪 Testing Strategy

```bash
# Unit Tests (Vitest)
pnpm test

# E2E Tests (Playwright)
pnpm test:e2e

# Type Checking
pnpm typecheck
```

### Test Coverage Areas
- Authentication flows (register, login, refresh, logout)
- CRUD operations for all entities
- Validation schemas (Zod)
- React components (React Testing Library)
- API integration (MSW mocking)

## 🚀 Deployment

### Docker (Recommended)
```dockerfile
# Dockerfile.example
FROM node:22-alpine
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["pnpm", "start"]
```

### Environment-Specific Builds
```bash
# Production
NODE_ENV=production pnpm build

# Client builds to dist/
# Server compiles to dist/
```

### Health Check
```
GET /api/v1/health
```

## 📈 Performance Optimizations

### Frontend
- **Code Splitting**: Route-based lazy loading with React.lazy + Suspense
- **TanStack Query**: Stale-while-revalidate, 5min cache, background refetch
- **Memoization**: React.memo, useMemo, useCallback for expensive computations
- **Virtualization**: Large lists (react-window) for libraries/logs
- **Image Optimization**: WebP, lazy loading, responsive images

### Backend
- **Prisma**: Connection pooling, query optimization
- **Indexes**: MongoDB compound indexes on frequent queries
- **Pagination**: Cursor/offset-based with 20-100 items per page
- **Caching**: Redis-ready for session/data caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Commit Convention (Conventional Commits)
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting, missing semicolons
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance
```

### Code Quality
- **ESLint**: Airbnb + TypeScript + React hooks
- **Prettier**: Consistent formatting
- **TypeScript**: Strict mode, no `any`
- **Husky**: Pre-commit hooks

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Linear, Notion, Vercel, GitHub, Arc Browser, Readwise
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database**: MongoDB + Prisma

---

**Built with ❤️ for lifelong learners and productivity enthusiasts.**