# ARCHITECTURE.md - KnowledgeOS System Architecture

## 🏛️ High-Level Overview
KnowledgeOS follows a **Modular, Feature-Based, Layered Architecture**. The system is split into two primary domains: the **Client** (Frontend) and the **Server** (Backend), communicating over a **RESTful API**.

The core philosophy is to treat every major feature (e.g., `books`, `habits`, `auth`) as a self-contained module that can be developed, tested, and scaled independently.

---

## 🏗️ System Layers

### 1. Client Side (Frontend)
The frontend is a Single Page Application (SPA) built with React. It is organized into layers to separate presentation from logic.

- **View Layer (Components)**: Purely presentational or logic-light components. They receive data via props or hooks and trigger actions via callbacks.
- **Logic Layer (Hooks/Services)**: Custom React hooks that encapsulate business logic, API calls (via TanStack Query), and complex state transformations.
- **State Management Layer**:
  - **Server State**: Managed by **TanStack Query** (caching, synchronization, loading/error states).
  - **Client State**: Managed by **Zustand** or **React Context** (UI themes, user preferences, modals).
- **Data Access Layer**: Services/API wrappers that use `fetch` or `axios` to interact with the backend.

### 2. Server Side (Backend)
The backend is a Node.js application using Express. It follows a **Controller-Service-Repository** pattern to ensure strict separation of concerns.

- **Routing Layer**: Defines API endpoints and maps them to specific controllers.
- **Controller Layer**: Handles the HTTP lifecycle. It extracts data from requests, validates it, calls the appropriate service, and sends the response. It contains **no business logic**.
- **Service Layer**: The heart of the application. Contains all business rules, calculations, and orchestration of multiple models. It is unaware of HTTP.
- **Data Access Layer (Models)**: Mongoose models that define the data structure and interact with MongoDB.
- **Middleware Layer**: Handles cross-cutting concerns:
  - **Authentication**: Verifying JWTs.
  - **Validation**: Using **Zod** to validate request bodies/params.
  - **Error Handling**: Centralized middleware to catch and format errors.

---

## 🔄 Data Flow Example: Adding a New Book

1. **User Action**: User clicks "Save Book" in the UI.
2. **Client Logic**: A `useAddBook` hook is called. It uses `TanStack Query`'s `useMutation`.
3. **API Call**: The mutation triggers a `POST /api/v1/books` request.
4. **Server Routing**: Express routes the request to `bookController.createBook`.
5. **Validation**: `authMiddleware` verifies the user; `bookValidationMiddleware` uses **Zod** to validate the request body.
6. **Service Execution**: The controller calls `bookService.createBook(userData, bookData)`.
7. **Business Logic**: `bookService` performs checks (e.g., "Does this book already exist for this user?") and then calls `BookModel.create()`.
8. **Database**: MongoDB persists the new document.
9. **Response**: The service returns the new book; the controller sends a `201 Created` response with the book data.
10. **UI Update**: `TanStack Query` invalidates the `books` cache, triggering a re-fetch and updating the UI automatically.

---

## 🛡️ Security Architecture
- **Identity**: Stateless authentication using JWTs.
- **Protection**:
  - **Input**: Strict schema validation at the boundary (API layer).
  - **Access**: Role-based or ownership-based access control (RBAC/OBAC) implemented in the Service layer.
  - **Transport**: All communication should occur over HTTPS.

---

## 📦 Modular Design Strategy
To prevent "Spaghetti Code," each feature module is encouraged to be "pluggable."

**Example Module Structure (`server/modules/books/`):**
- `books.routes.js`
- `books.controller.js`
- `books.service.js`
- `books.model.js`
- `books.validation.js`

This allows developers to understand a feature's entire lifecycle by looking at a single directory.
