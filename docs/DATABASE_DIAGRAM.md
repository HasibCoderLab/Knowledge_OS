# KnowledgeOS Database Schema (Prisma + MongoDB)

## Entity Relationship Diagram

```
User (1) ──────< Book (N)
  │                │
  │                └──────< Note (N)
  │                └──────< ReadingSession (N)
  │
  ├──────< JournalEntry (N)
  ├──────< Goal (N)
  │         └──────< GoalProgress (N)
  ├──────< Task (N)
  ├──────< Habit (N)
  │         └──────< HabitLog (N)
  ├──────< CalendarEvent (N)
  ├──────< Notification (N)
  ├──────< Activity (N)
  ├──────< AnalyticsSnapshot (N)
  ├──────< AIConversation (N)
  └──────< UserSettings (1)
```

## Models

### User
Core user identity. Links to all other entities via `userId`.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | Auto-generated |
| email | String | Unique |
| password | String | bcrypt hashed |
| name | String | Display name |
| avatar | String? | URL |
| bio | String? | Short bio |
| location | String? | User location |
| refreshToken | String? | JWT refresh token |
| emailVerified | Boolean | Default: false |
| theme | String | system/dark/light |
| language | String | en/bn |

### Book
A book in the user's library.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| title | String | |
| author | String | |
| category | String? | |
| coverUrl | String? | |
| status | String | reading/completed/wishlist/dropped |
| totalPages | Int? | |
| currentPage | Int | Default: 0 |
| rating | Int? | 1-5 |

### Note
Notes linked to books or standalone.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| bookId | ObjectId? | FK → Book (optional) |
| title | String | |
| content | String | Markdown |
| tags | String[] | |
| isPinned | Boolean | |
| isFavorite | Boolean | |

### ReadingSession
Tracks individual reading sessions.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| bookId | ObjectId | FK → Book |
| date | DateTime | |
| pagesRead | Int | |
| durationMinutes | Int | |
| startPage | Int | |
| endPage | Int | |

### JournalEntry
Daily journal entries with mood tracking.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| title | String | |
| content | String | |
| mood | String | great/good/neutral/bad/terrible |
| date | DateTime | |
| tags | String[] | |

### Goal
Short-term or long-term goals.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| title | String | |
| type | String | short-term/long-term |
| deadline | DateTime? | |
| progress | Int | 0-100 |
| status | String | active/completed/failed |
| priority | String | low/medium/high |

### GoalProgress
Progress updates for goals.

| Field | Type |
|-------|------|
| id | ObjectId |
| goalId | ObjectId (FK → Goal) |
| value | Int |
| note | String? |
| date | DateTime |

### Task
Actionable todo items.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| title | String | |
| priority | String | low/medium/high |
| dueDate | DateTime? | |
| isCompleted | Boolean | |
| category | String? | |

### Habit
Repeating habits with tracking.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User) |
| name | String |
| frequency | String (daily/weekly) |
| logs | HabitLog[] |

### HabitLog
Daily completion records.

| Field | Type |
|-------|------|
| id | ObjectId |
| habitId | ObjectId (FK → Habit) |
| date | DateTime |
| completed | Boolean |

### CalendarEvent
Events from any provider.

| Field | Type | Notes |
|-------|------|-------|
| id | ObjectId | |
| userId | ObjectId | FK → User |
| title | String | |
| date | DateTime | |
| type | String | reading/task/habit/goal/journal/other |
| provider | String | local/google/apple/outlook |
| providerId | String? | External system ID |

### AnalyticsSnapshot
Periodic analytics snapshots.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User) |
| date | DateTime |
| type | String (daily/weekly/monthly) |
| data | Json |

### Notification
User notifications.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User) |
| title | String |
| message | String |
| type | String (info/success/warning/achievement) |
| read | Boolean |

### Activity
Unified activity feed events.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User) |
| type | String |
| action | String |
| entityId | String? |
| entityType | String? |
| metadata | Json? |

### UserSettings
User preferences.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User, unique) |
| notifications | Boolean |
| theme | String |
| language | String |

### AIConversation
Future AI chat history.

| Field | Type |
|-------|------|
| id | ObjectId |
| userId | ObjectId (FK → User) |
| title | String? |
| messages | Json[] |

## Key Design Decisions

1. **All entities reference User** — every feature is user-scoped
2. **Cascade deletes** — removing a user removes all their data
3. **Indexes on userId** — all queries filter by user for performance
4. **No duplicated data** — normalized relationships
5. **Json type for flexible data** — AnalyticsSnapshot.data and Activity.metadata use Prisma's Json type for schema-less flexibility
