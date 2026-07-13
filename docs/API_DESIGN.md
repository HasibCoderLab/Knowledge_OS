# API_DESIGN.md - KnowledgeOS API Specification

## 🌐 Base URL
`https://<api-url>/api/v1`

## 🛠️ Versioning Strategy
All endpoints are prefixed with `/api/v1` to allow for breaking changes in the future without disrupting existing clients.

---

## 📦 Response Formats

### 🟢 Success Response
Standardized success response for all non-error endpoints.

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### 🔴 Error Response
Standardized error response for all failed requests.

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} 
  }
}
```
*`details` is used for validation errors (e.g., Zod error objects).*

---

## 📑 Endpoint Definitions

### 🔐 Authentication & Users
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and receive tokens | No |
| `POST` | `/auth/refresh` | Refresh Access Token | No (needs Refresh Token) |
| `GET` | `/users/me` | Get current user profile | Yes |
| `PATCH` | `/users/me` | Update user profile | Yes |

### 📚 Books & Reading
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/books` | List all user books | Yes |
| `POST` | `/books` | Add a new book | Yes |
| `GET` | `/books/:id` | Get book details | Yes |
| `PATCH` | `/books/:id` | Update book (status, progress, etc.) | Yes |
| `DELETE`| `/books/:id` | Remove a book | Yes |

### 📝 Notes & Knowledge
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/notes` | List all notes (with filters) | Yes |
| `POST` | `/notes` | Create a new note | Yes |
| `GET` | `/notes/:id` | Get note details | Yes |
| `PATCH` | `/notes/:id` | Update a note | Yes |
| `DELETE`| `/notes/:id` | Delete a note | Yes |
| `GET` | `/books/:id/notes` | Get all notes for a specific book | Yes |

### 🎯 Goals & Tasks
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/goals` | List all goals | Yes |
| `POST` | `/goals` | Create a new goal | Yes |
| `GET` | `/tasks` | List all tasks | Yes |
| `POST` | `/tasks` | Create a new task | Yes |
| `PATCH` | `/tasks/:id` | Update task (status, etc.) | Yes |

### 🔥 Habits
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/habits` | List all habits | Yes |
| `POST` | `/habits` | Create a new habit | Yes |
| `POST` | `/habits/:id/check`| Mark habit as completed for today | Yes |
| `GET` | `/habits/stats` | Get habit completion history/stats | Yes |

---

## 🚦 HTTP Status Codes Used
- `200 OK`: Success.
- `201 Created`: Resource created successfully.
- `204 No Content`: Successful deletion.
- `400 Bad Request`: Validation error or malformed request.
- `401 Unauthorized`: Authentication failed or missing.
- `403 Forbidden`: Authenticated but lacks permission.
- `404 Not Found`: Resource not found.
- `429 Too Many Requests`: Rate limiting.
- `500 Internal Server Error`: Unexpected server error.
