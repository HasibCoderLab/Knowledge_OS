# Mock API → Real Backend Migration Guide

## Current State

The frontend (`client/`) currently uses mock APIs via `mockApi` in `client/src/services/mocks/mockApi.ts`.

All data is static and stored in memory.

## Target State

Frontend will call the real backend at `http://localhost:5000/api/v1` via the Axios client in `client/src/services/api/`.

## Migration Strategy

### Step 1: Update API Base URL

The Axios client already points to `http://localhost:5000/api/v1` (configured via `VITE_API_URL`).

### Step 2: Replace Mock Calls with Real API Calls

**Current (mock):**
```ts
import { mockApi } from '../services/mocks/mockApi';

const books = await mockApi.getBooks();
```

**Future (real):**
```ts
import api from '../services/api/axios';

const response = await api.get('/library');
const books = response.data.data;
```

### Step 3: Response Format Alignment

Mock API returns:
```ts
{ success: true, data: [...] }
```

Real API returns:
```json
{ "success": true, "message": "", "data": [...] }
```

These are compatible — no frontend changes needed for the response structure.

### Step 4: Authentication Flow

**Current:** Uses `mockAuth` service → stores token in localStorage.

**Future:** Backend auth flow:
- `POST /api/v1/auth/register` — returns `{ user, accessToken, refreshToken }`
- `POST /api/v1/auth/login` — returns `{ user, accessToken, refreshToken }`
- `POST /api/v1/auth/logout` — invalidates refresh token
- `GET /api/v1/auth/me` — returns current user

The `authStore` already uses the `authService` (`client/src/services/api/auth.service.ts`) which calls the real API.

### Step 5: Gradual Migration

Modules can be migrated one at a time:

1. Auth — already connected via `authService`
2. User — update `getUser()` to call `/users/me`
3. Books — update `getBooks()` to call `/library`
4. Reading — update `getReadingSessions()` to call `/reading/sessions`
5. Journal — update `getJournalEntries()` to call `/journal`
6. Calendar — update `getEvents()` to call `/calendar/events`
7. Goals — update `getGoals()` to call `/goals`
8. Tasks — update `getTasks()` to call `/tasks`
9. Analytics — update analytics calls to `/analytics`
10. Settings — update settings calls to `/settings`
11. Notifications — update `/notifications`

### Key Compatibility Points

| Feature | Mock API Path | Real API Path |
|---------|--------------|---------------|
| Auth | mockAuth.login/register | POST /auth/login, /auth/register |
| Books | mockApi.getBooks() | GET /library |
| Reading | mockApi.getReadingSessions() | GET /reading/sessions |
| Journal | mockApi.getJournalEntries() | GET /journal |
| Events | mockApi.getEvents() | GET /calendar/events |
| Goals | mockApi.getGoals() | GET /goals |
| Tasks | mockApi.getTasks() | GET /tasks |
| Notifications | mockApi.getNotifications() | GET /notifications |

### No Frontend Rewrites Needed

- Response format (`{ success, data }`) is identical
- All IDs remain strings
- All types are compatible
- The Axios client already handles token injection

Simply swap `mockApi` calls with `api` calls.
