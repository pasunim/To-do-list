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

## Current Plan: To-Do List Implementation

1.  **Task Data Structure:** Define the data structure for a task.
2.  **Firestore Integration:** Set up Firestore rules and functions to interact with the database.
3.  **CRUD Functionality:** Implement Create, Read, Update, and Delete operations for tasks.
4.  **UI Components:** Create UI components for adding, displaying, and editing tasks.
