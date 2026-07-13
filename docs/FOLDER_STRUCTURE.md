# FOLDER_STRUCTURE.md - Project Directory Map

The project follows a modular structure, separating the client and server into two main directories.

## 📂 Root Directory
```text
knowledge-os/
├── client/                 # React Frontend (Vite)
├── server/                 # Node.js/Express Backend
├── docs/                   # Project Documentation
├── .gitignore
├── README.md
└── package.json            # Root package (for workspace management if used)
```

---

## 📂 Client Structure (`client/`)
Organized by feature and shared resources.

```text
client/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, global styles
│   ├── components/         # Shared UI components (Button, Input, Modal, etc.)
│   ├── config/             # API clients, constants, environment config
│   ├── features/           # FEATURE-BASED MODULES
│   │   ├── auth/           # Auth-related components, hooks, services
│   │   ├── dashboard/      # Dashboard components and logic
│   │   ├── books/          # Book library, progress, and details
│   │   ├── notes/          # Note editor and list
│   │   ├── habits/         # Habit tracker and heatmap
│   │   └── ...             # Other features (goals, tasks, etc.)
│   ├── hooks/              # Global reusable hooks
│   ├── layouts/            # Page layouts (MainLayout, AuthLayout)
│   ├── pages/              # Route-level components (mapping to routes)
│   ├── services/           # API abstraction layer (TanStack Query wrappers)
│   ├── store/              # Global state (Zustand / Context)
│   ├── utils/              # Pure utility functions (formatting, math)
│   ├── App.jsx             # Main App component & Routing
│   └── main.jsx            # Entry point
├── index.html
├── tailwind.config.js
└── package.json
```

---

## 📂 Server Structure (`server/`)
Organized by the Controller-Service pattern within feature modules.

```text
server/
├── src/
│   ├── config/             # DB connection, Cloudinary config, etc.
│   ├── middleware/         # Global middleware (Error handler, Auth, Logger)
│   ├── modules/            # FEATURE-BASED MODULES
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.validation.js
│   │   ├── books/
│   │   │   ├── books.controller.js
│   │   │   ├── books.service.js
│   │   │   ├── books.model.js
│   │   │   ├── books.routes.js
│   │   │   └── books.validation.js
│   │   └── ...             # Other modules (habits, tasks, notes, etc.)
│   ├── utils/              # Error classes, formatters, etc.
│   ├── app.js              # Express app configuration
│   └── server.js           # Entry point (Server listener)
├── .env                    # Environment variables
└── package.json
```

---

## 🔑 Key Concepts in Structure

1.  **Feature Isolation**: If you want to remove the "Habit" feature, you primarily delete the `server/src/modules/habits` and `client/src/features/habits` directories.
2.  **Separation of Logic**: The `controller` only knows about HTTP. The `service` only knows about business rules. The `model` only knows about the database.
3.  **Centralized Utilities**: Common logic (like date formatting) lives in `utils/` to prevent duplication.
