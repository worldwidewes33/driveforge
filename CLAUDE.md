# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DriveForge is a modern cloud file storage platform built with React 19 + Vite frontend and Express.js + Prisma backend. The project follows a feature-based architecture with comprehensive TypeScript integration and Docker containerization.

## Development Commands

### Client (Frontend)

```bash
cd client
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server (Backend)

```bash
cd server
npm run build    # Compile TypeScript
npm run start    # Production start
npm run dev      # Development with watch mode
```

### Docker Development

```bash
docker compose up --build -d  # Start all services
# Frontend: localhost:5173, Backend: localhost:8080, DB: localhost:2345
```

## Architecture & Code Organization

### Feature-Based Structure

Both frontend and backend are organized by domain features:

- **Backend**: `/server/src/api/{auth,files,folders}/` - each with controllers, routes, services
- **Frontend**: `/client/src/features/` - organized by feature domains
- **Common**: Shared utilities in `/common/` directories

### Database Architecture

- Hierarchical folder structure with recursive parent-child relationships
- Soft deletion pattern using `deletedAt` timestamps
- Ownership-based access control with proper indexing
- Prisma ORM with type-safe database operations

### Key Patterns

- **Stream-based file handling** using Busboy for efficient large file uploads
- **Centralized error handling** with AppError class and consistent HTTP status codes
- **TypeScript-first development** with strict configuration throughout
- **Context API** for React state management (theme, auth)

## Important Implementation Details

### File Upload Strategy

Files are processed as streams using Busboy middleware to handle large uploads efficiently. The system supports hierarchical folder organization with proper cleanup on errors.

### Authentication Flow

JWT-based authentication with bcrypt password hashing. The frontend uses Context API for auth state management, while the backend implements middleware-based route protection.

### Theme System

Material UI with custom theme configuration supporting dark/light modes via React Context. Theme persistence handled through localStorage.

## Code Quality Standards

### TypeScript Requirements

- Strict TypeScript configuration enforced
- All functions require JSDoc/TSDoc documentation
- Interface definitions for all data structures
- Maximum 500 lines per file

### Testing Strategy

Jest is planned but not yet implemented. When adding tests, follow the existing project structure and use the standard Jest configuration.

### File Organization

- Feature-based organization over type-based
- Controllers handle HTTP logic, services handle business logic
- Utilities are shared across features in `/common/` directories

## Development Workflow

### Current Implementation Status

- ✅ Project scaffold with Docker containerization
- ✅ Database schema and API structure
- ✅ Basic React app with MUI theming
- 🔄 Frontend features implementation
- 🔄 Complete API route handlers
- 📋 Authentication UI integration
- 📋 File management functionality

### Branch Strategy

Currently on `feature/frontend-scaffold` branch. The main branch is not explicitly configured - verify branch strategy before creating pull requests.

## Project-Specific Considerations

### Documentation Standards

This project has exceptional documentation in `/_docs/` directory. Always reference existing documentation for context and maintain the same level of detail when adding new features.

**Key Documentation References:**

- **`_docs/project-overview.md`** - Four-phase development plan, feature roadmap, and project goals
- **`_docs/project-rules.md`** - Comprehensive coding standards, file organization, naming conventions, and AI compatibility requirements
- **`_docs/tech-stack.md`** - Detailed technology decisions, best practices, limitations, and conventions for each tool
- **`_docs/user-flow.md`** - Complete user journey specifications from registration through advanced features

**Key Standards to Follow:**

- **File Organization:** Feature-based modular structure, maximum 500 lines per file
- **Naming:** kebab-case for files, PascalCase for components, descriptive names always
- **Documentation:** Every file needs `@fileoverview` comment, all functions need JSDoc/TSDoc
- **Code Style:** Functional/declarative patterns, strict TypeScript, centralized error handling
- **Testing:** Jest for unit/integration tests, accessibility compliance, security validation

### Performance Considerations

- Stream-based file processing to handle large uploads
- Proper database indexing for folder hierarchy queries
- Memory-efficient error handling and cleanup

### Security Implementation

- JWT token validation middleware
- Input sanitization and validation
- Proper error messages that don't leak sensitive information
- File upload security measures
