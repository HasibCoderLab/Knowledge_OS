# CODING_STANDARDS.md - KnowledgeOS Development Standards

To maintain a high-quality, professional codebase, all contributors (including AI agents) must adhere to these standards.

---

## 🚀 Language & Runtime
- **Language**: Modern JavaScript (ES6+).
- **Module System**: ECMAScript Modules (**ESM**) (`import`/`export`). Avoid `require()`.
- **Runtime**: Node.js (Backend) and Browser (Frontend).

## 📝 Documentation (JSDoc)
Every function, class, and complex logic block **must** be documented using JSDoc. This is our primary way of providing "pseudo-typing" in a JavaScript environment.

**Example:**
```javascript
/**
 * Calculates the reading progress percentage for a book.
 * 
 * @param {number} current - The current page number.
 * @param {number} total - The total number of pages in the book.
 * @returns {number} The progress percentage (0-100).
 * @throws {Error} If total is zero or less.
 */
const calculateProgress = (current, total) => {
  if (total <= 0) throw new Error("Total pages must be greater than zero.");
  return Math.round((current / total) * 100);
};
```

## 🎨 Naming Conventions
- **Variables & Functions**: `camelCase` (e.g., `getUserData`, `isBookCompleted`).
- **Classes & Components**: `PascalCase` (e.g., `UserAuth`, `BookCard`).
- **Files**: `kebab-case` (e.g., `auth-controller.js`, `user-profile.jsx`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`, `DEFAULT_THEME`).
- **Private Variables/Methods**: Prefix with underscore `_` (e.g., `_internalHelper`).

## 🛠️ Tooling & Formatting
- **Linting**: ESLint (configured for ESM and best practices).
- **Formatting**: Prettier (consistent indentation, quotes, and semicolons).
- **Validation**: **Zod** for all schema validations (both client and server).

## 🛡️ Error Handling Strategy
### Backend (Express)
1.  **Local Handling**: Use `try/catch` in controllers or an `asyncHandler` wrapper to catch errors.
2.  **Custom Error Classes**: Use specialized error classes (e.g., `ApiError`, `NotFoundError`, `ValidationError`) to pass semantic information.
3.  **Centralized Middleware**: A single error-handling middleware must catch all errors and return a standardized JSON response.
    - *Do not send raw stack traces to the client in production.*

### Frontend (React)
1.  **Graceful Failure**: Use Error Boundaries to prevent the whole app from crashing on a component error.
2.  **User Feedback**: Always provide visual feedback (toasts, error messages, loading states) for failed API calls.

## 🏗️ Design Patterns
- **Controller-Service-Model**:
  - **Controller**: Handles request/response and input extraction.
  - **Service**: Contains the core business logic and orchestration.
  - **Model**: Handles database interaction.
- **Composition over Inheritance**: In React, prefer composing components using props and hooks rather than complex inheritance hierarchies.
- **Single Responsibility Principle (SRP)**: Every function and component should do one thing well.

## 🧪 Quality Assurance
- **Code Review Checklist**:
  - [ ] Does the code follow the naming conventions?
  - [ ] Is there JSDoc for all new functions?
  - [ ] Is error handling implemented for all edge cases?
  - [ ] Is there any code duplication that could be refactored?
  - [ ] Does the code pass linting and formatting?
  - [ ] Are all new features documented in `docs/`?
