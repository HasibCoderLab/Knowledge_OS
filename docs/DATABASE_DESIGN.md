# DATABASE_DESIGN.md - KnowledgeOS Schema Design

KnowledgeOS uses MongoDB as its primary database. The schema is designed to be modular, leveraging Mongoose for modeling and ensuring efficient querying through strategic indexing.

---

## 🏗️ Core Collections

### 1. `users`
Stores core user identity and profile information.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `email` | `String` | User email (unique) | Unique, Sparse |
| `password` | `String` | Hashed password | - |
| `name` | `String` | Display name | - |
| `avatar` | `String` | URL to profile image | - |
| `preferences` | `Object` | Theme, language, etc. | - |
| `createdAt` | `Date` | Account creation timestamp | - |
| `updatedAt` | `Date` | Last update timestamp | - |

### 2. `books`
Stores information about books in the user's library.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `userId` | `ObjectId` | Reference to `users._id` | Unique (User + Book ID) |
| `title` | `String` | Book title | Text |
| `author` | `String` | Author name | Text |
| `category` | `String` | Genre/Category | - |
| `coverUrl` | `String` | URL to book cover image | - |
| `status` | `String` | `reading`, `completed`, `wishlist`, `dropped` | - |
| `totalPages` | `Number` | Total pages in book | - |
| `currentPage`| `Number` | Current page being read | - |
| `startDate` | `Date` | When reading started | - |
| `finishDate` | `Date` | When reading finished | - |
| `rating` | `Number` | User rating (1-5) | - |
| `createdAt` | `Date` | Entry creation timestamp | - |

### 3. `notes`
Stores knowledge captured from books or general thoughts.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `userId` | `ObjectId` | Reference to `users._id` | - |
| `bookId` | `ObjectId` | Reference to `books._id` (Optional) | - |
| `title` | `String` | Note title | Text |
| `content` | `String` | Markdown/Rich text content | Text |
| `tags` | `[String]` | Array of tags | - |
| `isPinned` | `Boolean` | Whether note is pinned | - |
| `isFavorite`| `Boolean` | Whether note is favorited | - |
| `createdAt` | `Date` | Creation timestamp | - |

### 4. `habits`
Stores daily habit definitions and tracking data.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `userId` | `ObjectId` | Reference to `users._id` | - |
| `name` | `String` | Habit name (e.g., "Read 30 Pages") | - |
| `frequency` | `String` | `daily`, `weekly` | - |
| `logs` | `[Object]` | Array of completion dates/times | - |
| `streak` | `Number` | Current consecutive days | - |
| `createdAt` | `Date` | Creation timestamp | - |

### 5. `goals`
Stores long-term and short-term user objectives.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `userId` | `ObjectId` | Reference to `users._id` | - |
| `title` | `String` | Goal title | - |
| `type` | `String` | `short-term`, `long-term` | - |
| `deadline` | `Date` | Target completion date | - |
| `progress` | `Number` | Percentage completed (0-100) | - |
| `status` | `String` | `active`, `completed`, `failed` | - |
| `createdAt` | `Date` | Creation timestamp | - |

### 6. `tasks`
Stores actionable items.

| Field | Type | Description | Index |
| :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier | Primary |
| `userId` | `ObjectId` | Reference to `users._id` | - |
| `title` | `String` | Task description | - |
| `priority` | `String` | `low`, `medium`, `high` | - |
| `dueDate` | `Date` | Task deadline | - |
| `isCompleted`| `Boolean` | Completion status | - |
| `createdAt` | `Date` | Creation timestamp | - |

---

## 🔗 Relationships Summary

- **One-to-Many**:
  - `User` ➡️ `Books`
  - `User` ➡️ `Notes`
  - `User` ➡️ `Habits`
  - `User` ➡️ `Goals`
  - `User` ➡️ `Tasks`
- **One-to-Many (Contextual)**:
  - `Book` ➡️ `Notes` (A note can belong to a specific book)

## ⚡ Indexing Strategy

To ensure high performance as the database grows:

1.  **Compound Indexes**:
    - `{ userId: 1, status: 1 }` on `books` collection for fast filtering of a user's reading list.
    - `{ userId: 1, isCompleted: 1 }` on `tasks` collection.
2.  **Text Indexes**:
    - `title` and `content` on `notes` and `books` for efficient keyword searching.
3.  **Unique Indexes**:
    - `email` on `users` to prevent duplicate accounts.
