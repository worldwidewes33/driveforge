# User Flow: DriveForge

This document outlines the end-to-end user journey through DriveForge. It is structured to align with key features from the core system (Phase 1) and highlights how these features are interconnected. This guide will inform future project architecture, UI design, and implementation planning.

---

## 1. Registration & Authentication

### Entry Point
- User lands on the home/login page.
- If new, they select “Sign Up” and enter email and password.

### Flow
1. User registers → system creates a new user record.
2. Root folder is automatically generated for the user.
3. User is redirected to the main file browser interface.

---

## 2. File & Folder Navigation

### Entry Point
- Upon login or successful registration, user is placed in their root folder.

### Flow
1. User sees a list of folders and files (owned by them, in the current folder).
2. Breadcrumb navigation allows user to traverse up the hierarchy.
3. Clicking on a folder navigates into it (updates the current folder context).

---

## 3. File Upload

### Entry Point
- User clicks “Upload” or drags a file into the UI.

### Flow
1. File is uploaded using a stream-based method.
2. Metadata (file name, MIME type, size) is stored in the database.
3. File appears in the current folder view.

---

## 4. Folder Creation

### Entry Point
- User clicks “New Folder”.

### Flow
1. User inputs a folder name.
2. Folder is created and linked to the current folder as its parent.
3. Folder is displayed in the current view.

---

## 5. File and Folder Actions

### Entry Point
- User opens a context menu or selects a file/folder.

### Actions
- Rename file/folder
- Download file
- Soft delete file/folder
  - If folder, all descendants are also marked deleted
  - Deleted items are moved to the Trash Bin view

---

## 6. Trash Bin & Restore

### Entry Point
- User navigates to “Trash”.

### Flow
1. Trash displays all soft-deleted files and folders.
2. User can restore or permanently delete any item.
3. Restoration returns item to its previous parent folder.

---

## 7. Sharing (Planned Phase 2)

### Entry Point
- User opens a folder’s share menu.

### Flow
1. User generates an invite link or adds another user by email.
2. Shared user gains view or edit access.
3. Access control enforced by backend on all relevant routes.

---

## 8. Advanced Interactions (Planned Phase 3)

- Drag-and-drop support for moving files and folders
- Contextual action menus for quick interaction
- Responsive layout adapts to screen size
- Keyboard navigation

---

## 9. Intelligent Features (Planned Phase 4)

- Suggested folders or tags based on file context
- Predictive search for faster navigation
- Prompts to clean up or organize storage

---

This flow document will evolve as development progresses and should remain tightly aligned with the product phases and feature set.
