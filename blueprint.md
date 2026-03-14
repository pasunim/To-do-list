# Blueprint: Next.js To-Do List with Firebase

## Overview

A modern, responsive To-Do List web application that allows users to manage their daily tasks securely with user authentication. Each user can only see and manage their own tasks.

## Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Lucide React
- **UI Components:** shadcn/ui
- **Backend/Database:** Firebase Cloud Firestore
- **Authentication:** Firebase Authentication (Email/Password & Google Sign-in)

## Features

### User Authentication
- Login and Register pages.
- Email/Password and Google Sign-in.
- Protected routes for the dashboard.
- Logout functionality.

### Task Management (CRUD)
- Create, Read, Update, and Delete tasks.
- Tasks are associated with the logged-in user.
- Tasks are sorted by creation date.

## Completed Steps

1.  **Project Structure:** Created `/lib` and `/app/context` directories.
2.  **Firebase Configuration:**
    *   Created a `firebase.ts` file in the `/lib` directory.
    *   Added placeholder Firebase configuration to `firebase.ts`.
    *   Created a `.env.local` file with placeholder environment variables for Firebase.
    *   Updated `.gitignore` to include `.env.local`.
3.  **Firebase MCP Integration:** Configured Firebase servers in `.idx/mcp.json`.
4.  **Authentication Context:** Created `AuthContext.tsx` to manage user authentication state.
5.  **UI Pages:**
    *   Created Login page (`app/login/page.tsx`).
    *   Created Signup page (`app/signup/page.tsx`).
    *   Created the main To-Do list page (`app/page.tsx`) with protected routing and a logout button.
6.  **UI Overhaul:**
    *   **Color Palette and Styling:** Updated the `globals.css` file to introduce a new color palette and a subtle noise texture for the background. Adjusted the dark mode colors to ensure a consistent and polished design.
    *   **Login and Signup Pages:** Redesigned the login and signup pages with a modern and visually appealing layout. Replaced the previous design with a centered card layout that includes a clear title, description, and form fields. Updated the styling to match the new color palette and added a link to switch between the login and signup pages.
    *   **Main To-Do List Page:** Updated the main to-do list page to include a clean and modern design. The new design features a centered card that contains the to-do list, a form for adding new tasks, and a logout button.
    *   **Code Quality:** Ran the linter and fixed all identified issues to ensure a clean and consistent codebase.
    *   **Types:** Created a `types.ts` file to define the `Task` interface.
7.  **Task Management (CRUD):**
    *   **`useTasks` hook:** Created a `useTasks` hook to encapsulate the logic for interacting with the Firebase Cloud Firestore database. The hook provides functions for adding, updating, and deleting tasks, as well as for fetching the list of tasks for the current user.
    *   **Main To-Do List Page:** Updated the main to-do list page to use the `useTasks` hook to display the list of tasks, add new tasks, and mark tasks as complete.
    *   **Delete Functionality:** Added a delete button to each task to allow users to remove tasks from their to-do list.

