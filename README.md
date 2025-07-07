# DriveForge

**DriveForge** is a modern cloud file storage platform inspired by Google Drive. It is designed as both a learning vehicle for mastering frontend development, scalable backend design, and AI-assisted engineering workflows.

---

## 🚀 Project Overview
DriveForge delivers a modular, extensible cloud file system with a focus on clean architecture, stream-based file handling, and a professional-grade user experience. The project is built to showcase best practices in full-stack engineering and AI-first product design.

---

## 🗂️ Key Features & Phases

**Phase 1: Core System (MVP)**
- Secure user registration, login, and session handling
- User-specific root folder creation
- File/folder creation, renaming, and soft deletion
- Hierarchical folder structure with recursive logic
- Trash Bin for soft-deleted items and restoration
- Stream-based upload/download for large files
- Ownership-based access control
- Minimal, responsive UI with breadcrumb navigation

**Phase 2: Collaboration & Sharing**
- Invite-based sharing with tokenized links
- User roles and permissions (viewer/editor)
- Shared folder access and audit trail

**Phase 3: UI/UX Polish & Accessibility**
- Drag-and-drop uploads, contextual menus
- Responsive design, keyboard navigation, ARIA support
- Clear loading, error, and success states

**Phase 4: AI Integration**
- Smart folder/tag suggestions
- Predictive file search
- Contextual organization prompts

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite, TypeScript, Material UI (MUI) + Emotion, Context API
- **Backend:** Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT + bcrypt, Busboy (stream-based uploads)
- **Testing:** Jest (planned)
- **AI Integration:** OpenAI API (planned)

---

## 📁 Project Structure & Conventions

- **Modular by Feature:**
  - Group code by domain (e.g., `auth`, `files`, `folders`)
  - Shared utilities/types in `common/` or `utils/`
- **File Naming:**
  - `kebab-case` for files/folders, `PascalCase` for React components
  - Descriptive names, no generic `index.ts` unless scoped
- **Documentation:**
  - Every file starts with a `@fileoverview` comment
  - All functions/components use JSDoc/TSDoc
- **Code Style:**
  - Functional, declarative, and type-safe (TypeScript everywhere)
  - Throw errors (no silent fallbacks), DRY principles
- **Testing & Quality:**
  - Jest for unit/integration tests (planned)
  - ESLint for linting, accessibility best practices
- **AI Compatibility:**
  - Descriptive naming, flat and modular structure, consistent patterns
- **Security & Performance:**
  - Input validation, environment variables for secrets, code splitting, caching, indexing

For full rules, see [`_docs/project-rules.md`](./_docs/project-rules.md).

---

## 🏁 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Docker & Docker Compose

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/driveforge.git
cd driveforge
```

### 2. Setup Environment Variables
- Copy `.env.example` to `.env` in both `/client` and `/server` as needed, and fill in required values.

### 3. Install Dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 4. Setup the Database
- Ensure PostgreSQL is running (locally or via Docker Compose)
- Run Prisma migrations:
```bash
cd server
npx prisma migrate dev
```

### 5. Start the Project with Docker Compose
```bash
docker compose up --build -d
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173)
- The backend API will be available at [http://localhost:3001](http://localhost:8080) (or as configured)

---

## 📚 Documentation
- Project rules: [`_docs/project-rules.md`](./_docs/project-rules.md)
- Tech stack: [`_docs/tech-stack.md`](./_docs/tech-stack.md)
- User flow: [`_docs/user-flow.md`](./_docs/user-flow.md)
- Project overview: [`_docs/project-overview.md`](./_docs/project-overview.md)

---

## 🤝 Contributing
Please read the project rules and follow all conventions. PRs should be modular, well-documented, and pass all linter/tests.

---

## 🧠 Ultimate Goal
DriveForge aims to be a clean, modern showcase of full-stack and AI-first engineering best practices, suitable for both real-world use and as a portfolio-grade reference project. 