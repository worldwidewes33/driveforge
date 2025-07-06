# Project Rules: DriveForge

This document defines the rules and conventions for building and maintaining the DriveForge codebase. These standards ensure the project is modular, scalable, easy to understand, and highly compatible with modern AI tools.

---

## 1. **Directory Structure**

- **Modular by Feature:**
  - Group backend and frontend code by feature/domain (e.g., `auth`, `files`, `folders`).
  - Each feature should have its own `controllers/`, `routes/`, `services/`, and `types/` as needed.
- **Separation of Concerns:**
  - Keep shared utilities, constants, and types in clearly named `common/` or `utils/` folders.
- **Docs and Planning:**
  - All documentation, rules, and planning files live in the `_docs/` directory.
- **Example Structure:**
  ```
  /client
    /src
      /features
        /auth
        /files
        /folders
      /components
      /contexts
      /utils
      /theme.ts
      App.tsx
      main.tsx
  /server
    /src
      /api
        /auth
        /files
        /folders
        /common
      /types
      /utils
      app.ts
      server.ts
  /_docs
    tech-stack.md
    project-overview.md
    user-flow.md
    project-rules.md
  ```

---

## 2. **File Naming Conventions**

- **Descriptive Names:**
  - File and folder names must clearly describe their contents or purpose (e.g., `file-controllers.ts`, `auth-services.ts`).
- **Case:**
  - Use `kebab-case` for files and folders (e.g., `file-controllers.ts`).
  - Use `PascalCase` for React components (e.g., `FileList.tsx`).
- **Extensions:**
  - Use `.ts` for TypeScript, `.tsx` for React components, `.md` for documentation.
- **No Generic Names:**
  - Avoid names like `index.ts` or `utils.ts` unless absolutely necessary and scoped within a feature.

---

## 3. **File Size and Organization**

- **Maximum File Length:**
  - No file should exceed 500 lines. Split large files into smaller, focused modules.
- **Single Responsibility:**
  - Each file should have a clear, single purpose.
- **Highly Navigable:**
  - Organize files so that searching by feature or function is fast and intuitive.

---

## 4. **Documentation and Comments**

- **File Overview:**
  - Every file must start with a `@fileoverview` comment summarizing its contents and purpose.
- **Function Documentation:**
  - All functions (including React components) must have JSDoc or TSDoc comments describing their purpose, parameters, and return values.
  - Example:
    ```ts
    /**
     * @description Uploads a file to the server.
     * @param req Express request object
     * @param res Express response object
     * @returns Promise<void>
     */
    async function uploadFile(req: Request, res: Response): Promise<void> { ... }
    ```
- **Block Comments:**
  - Use block comments to explain complex logic or important decisions.
- **No Redundant Comments:**
  - Comments should add value, not restate obvious code.

---

## 5. **Code Style and Patterns**

- **Functional and Declarative:**
  - Prefer functional programming and declarative patterns over classes and imperative code.
- **Type Safety:**
  - Use TypeScript everywhere. Avoid `any` type unless absolutely necessary.
- **Error Handling:**
  - Throw errors instead of using fallback values. Use centralized error handling.
- **DRY Principle:**
  - Avoid code duplication by extracting reusable logic into functions or modules.
- **State Management:**
  - Use Context API for MVP; migrate to Redux Toolkit if state complexity grows.

---

## 6. **AI Compatibility**

- **Descriptive Naming:**
  - Use clear, descriptive names for files, functions, and variables to maximize compatibility with semantic and regex/grep-based code search tools.
- **Flat and Modular Structure:**
  - Avoid deep nesting; keep the structure as flat as possible while maintaining modularity.
- **Consistent Patterns:**
  - Follow consistent patterns for controllers, services, routes, and components to aid AI understanding and navigation.

---

## 7. **Testing and Quality**

- **Testing:**
  - Use Jest for unit and integration tests. Write tests for all critical business logic.
- **Linting:**
  - Use ESLint with TypeScript rules. Fix all linter errors and warnings before committing.
- **Accessibility:**
  - Follow accessibility best practices, especially in the frontend (ARIA, keyboard navigation, color contrast).

---

## 8. **Security and Performance**

- **Security:**
  - Never log or expose sensitive data. Use environment variables for secrets. Validate all inputs.
- **Performance:**
  - Optimize for performance at every layer (frontend, backend, database). Use code splitting, caching, and indexing as appropriate.

---

## 9. **Continuous Improvement**

- **Documentation:**
  - Keep `_docs/` up to date as the project evolves.
- **Refactoring:**
  - Regularly refactor code to maintain clarity, modularity, and scalability.
- **Review:**
  - All code should be reviewed for adherence to these rules before merging.

---

By following these rules, DriveForge will remain modular, scalable, and easy to navigate for both humans and AI tools, supporting rapid development and future growth. 