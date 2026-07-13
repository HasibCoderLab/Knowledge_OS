# AGENT.md - KnowledgeOS Instruction Manual

## 🌟 Project Vision
KnowledgeOS is a personal operating system designed for continuous learning, reading, knowledge management, productivity, and self-improvement. It is built to be a long-term, production-grade tool that evolves with the user's needs.

## 🎯 Project Goals
- **Scalability**: Modular architecture to support new features without refactoring existing ones.
- **Maintainability**: Clean, documented, and well-structured code.
- **Reliability**: Robust error handling and data integrity.
- **Portfolio-Quality**: Demonstrating senior-level engineering practices (SOLID, Clean Code, Modular Design).

## 🏗️ Architecture Philosophy
**Feature-Based Modular Architecture**:
- Each feature is isolated and contains its own logic, UI, and data requirements.
- **Separation of Concerns**:
  - **UI Layer**: Presentational components (React).
  - **Business Logic Layer**: Services and Hooks.
  - **API Layer**: Express controllers and routes.
  - **Database Layer**: Mongoose models and repository patterns.
  - **Validation Layer**: Zod schemas for both frontend and backend.
  - **Utilities/Shared**: Cross-cutting concerns (auth, formatting, etc.).

## 💻 Coding Philosophy
- **Clean Code**: Readable, meaningful names, and small, single-responsibility functions.
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **DRY (Don't Repeat Yourself)**: Minimize duplication through reusable utilities and components.
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering.
- **YAGNI (You Ain't Gonna Need It)**: Implement only what is required for the current milestone.
- **Strict JavaScript (ESM)**: Using modern ECMAScript Modules.
- **JSDoc**: Mandatory documentation for all functions, classes, and complex logic to ensure "pseudo-typing" and clarity.

## 📂 Folder Conventions
- `client/`: Frontend application (React).
- `server/`: Backend application (Node/Express).
- `docs/`: Project documentation.
- **Feature Isolation**: Logic related to a feature (e.g., `books`) should be grouped together where possible.

## 🏷️ Naming Conventions
- **Variables/Functions**: `camelCase`
- **Components/Classes**: `PascalCase`
- **Files**: `kebab-case` (e.g., `book-card.jsx`, `auth-middleware.js`)
- **Constants**: `UPPER_SNAKE_CASE`
- **Database Collections**: `plural_snake_case`

## ⚛️ React Conventions
- **Functional Components**: Use hooks exclusively.
- **Composition over Inheritance**: Build complex UIs from smaller, reusable pieces.
- **Hooks-First**: Extract business logic into custom hooks.
- **State Management**: Use local state, Context API, or dedicated libraries (Zustand/TanStack Query) based on complexity.

## 🚀 Express Conventions
- **Controller-Service Pattern**: 
  - `routes/`: Define endpoints.
  - `controllers/`: Handle HTTP request/response.
  - `services/`: Contain core business logic.
  - `models/`: Database schemas.
- **Centralized Error Handling**: Use a global error-handling middleware.

## 🍃 MongoDB Conventions
- **Mongoose**: Use schemas for data modeling.
- **Normalization vs. Denormalization**: Use embedding for small, tightly coupled data; use references for larger, independent collections.
- **Indexing**: Implement indexes on frequently queried fields to ensure performance.

## 🛡️ Security & Validation
- **Authentication**: JWT-based authentication with Refresh Tokens.
- **Input Validation**: Use **Zod** for strict schema validation on both client and server.
- **Sanitization**: Protect against XSS and injection attacks.
- **Environment Variables**: Never hardcode secrets; use `.env` files.

## 🛠️ Git Workflow & Commits
- **Branching**: Use feature branches (e.g., `feat/book-management`, `fix/auth-bug`).
- **Commit Convention**: Follow [Conventional Commits](https://www.conventionalcommits.org/).
  - `feat:`: A new feature.
  - `fix:`: A bug fix.
  - `docs:`: Documentation only changes.
  - `style:`: Changes that do not affect the meaning of the code (white-space, formatting).
  - `refactor:`: A code change that neither fixes a bug nor adds a feature.
  - `test:`: Adding missing tests or correcting existing tests.
  - `chore:`: Changes to the build process or auxiliary tools/libraries.

## ✅ Definition of Done
A task is complete when:
1. The feature works as expected according to requirements.
2. Code is clean, modular, and follows all coding standards.
3. JSDoc is provided for all new functions/modules.
4. Error handling is implemented for all edge cases.
5. Code is linted and passes all quality checks.
6. Documentation in `docs/` is updated if necessary.
