# KnowledgeOS Backend

Production-grade backend for KnowledgeOS — a Personal Knowledge Operating System.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (via Prisma ORM)
- **Validation:** Zod
- **Auth:** JWT + Refresh Tokens + bcrypt
- **Security:** Helmet, CORS, Rate Limiting

## Architecture

```
server/
├── src/
│   ├── app/                  # App entry & config
│   │   ├── app.ts            # Express app setup
│   │   ├── server.ts         # Server bootstrap
│   │   └── config/           # Environment, DB, providers
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication & users
│   │   ├── users/            # User profiles
│   │   ├── library/          # Book library
│   │   ├── reading/          # Reading sessions
│   │   ├── journal/          # Journal entries
│   │   ├── calendar/         # Calendar events
│   │   ├── goals/            # Goal management
│   │   ├── tasks/            # Task management
│   │   ├── analytics/        # Analytics & insights
│   │   ├── settings/         # User settings
│   │   └── notifications/    # Notifications
│   ├── middleware/            # Auth, validation, error, rate-limit
│   ├── shared/               # Response helpers, errors, asyncHandler
│   ├── utils/                # Logger, token utilities
│   ├── types/                # Shared TypeScript types
│   ├── routes/               # Centralized route registry
│   └── prisma/               # Prisma schema
```

### Layered Pattern

Every module follows:

```
Controller → Service → Repository → Prisma → MongoDB
```

- **Controllers** — handle HTTP; no business logic
- **Services** — business rules & orchestration
- **Repositories** — data access layer

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Group         | Endpoints                                     |
| ------------- | --------------------------------------------- |
| Auth          | POST /auth/register, /login, /logout, /refresh |
| Users         | GET /users/me, PATCH /users/me                |
| Library       | GET /library                                  |
| Reading       | GET /reading/sessions                         |
| Journal       | GET /journal                                  |
| Calendar      | GET /calendar/events                          |
| Goals         | GET /goals                                    |
| Tasks         | GET /tasks                                    |
| Analytics     | GET /analytics                                |
| Settings      | GET /settings                                 |
| Notifications | GET /notifications                            |

## Response Format

Success:
```json
{ "success": true, "message": "", "data": {} }
```

Error:
```json
{ "success": false, "message": "", "errors": [] }
```

## Getting Started

```bash
# Install
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Push schema to MongoDB
pnpm prisma:push

# Run dev
pnpm dev
```

## Environment Variables

See `.env` for required variables.

## Sprint Roadmap

1. ✅ **Sprint 1** — Backend Foundation (setup, Prisma, auth, shared architecture)
2. 📅 **Sprint 2** — User, Library, Reading, Journal
3. 📅 **Sprint 3** — Calendar, Goals, Tasks, Activity Feed
4. 📅 **Sprint 4** — Analytics, Notifications, Search, Settings
5. 📅 **Sprint 5** — AI, Knowledge Graph, Calendar Sync, RAG
