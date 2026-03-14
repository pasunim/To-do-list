# Next.js 16 SaaS Starter Application - Development Plan

## Project Overview
Production-ready SaaS starter application using Next.js 16 with PostgreSQL, following clean architecture principles and real engineering standards.

## Tech Stack

### Frontend
- Next.js 16 (App Router, React Server Components)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Hook Form
- Zod

### Backend
- Server Actions
- Route Handlers
- Prisma ORM
- PostgreSQL
- Auth.js (NextAuth)

### Authentication Providers
- Email / Password
- Google OAuth

### Security
- bcrypt password hashing
- JWT sessions
- API session validation

## Architecture - Clean Architecture

### Layers
1. **Controllers** (API routes)
2. **Services** (business logic)
3. **Repositories** (database access)
4. **Database** (Prisma)

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   └── dashboard/
│   └── api/
│       ├── tasks/
│       └── users/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── tasks/
│   └── forms/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validators.ts
│   └── apiResponse.ts
├── repositories/
│   ├── taskRepository.ts
│   ├── userRepository.ts
│   └── auditRepository.ts
├── services/
│   ├── taskService.ts
│   ├── authService.ts
│   └── auditService.ts
├── middleware/
│   ├── authMiddleware.ts
│   └── rbacMiddleware.ts
├── utils/
│   ├── logger.ts
│   └── pagination.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

## Database Schema

### Tables
- **User**
- **Task**
- **Role**
- **UserRole**
- **AuditLog**
- **Account**
- **Session**
- **VerificationToken**

### Task Table Features
- Soft delete with `deletedAt` timestamp
- Deleted tasks should not appear in queries

## RBAC (Role Based Access Control)

### Roles
- **admin**
- **user**

Users can have multiple roles. Create middleware to check role permissions.

### Example
- Only admin can view all users
- Users can manage their own tasks

## Task Management Features

### User Capabilities
- Create task
- Edit task
- Delete task
- Toggle completion

### Search
- Search fields: title, description
- Use PostgreSQL LIKE or ILIKE

### Pagination
- Query parameters: page, limit
- Response format:
  ```json
  {
    "items": [],
    "total": 0,
    "page": 1,
    "pages": 0
  }
  ```

## Audit Log

### AuditLog Table Fields
- id
- userId
- action
- entity
- entityId
- metadata
- createdAt

### Tracked Actions
- TASK_CREATED
- TASK_UPDATED
- TASK_DELETED
- LOGIN

## API Design

### REST Style APIs
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/[id]`
- `DELETE /api/tasks/[id]`

### Query Parameters
- search
- page
- limit

## API Response Standard

### Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Logger

Create centralized logger supporting:
- info
- warn
- error

### Logging Targets
- API requests
- Errors
- Authentication events

## Validation

Use Zod to validate:
- Request body
- Query parameters

## Security Features
- Session validation
- Ownership verification
- RBAC validation
- Password hashing with bcrypt

## UI Requirements

### Dashboard Components (shadcn/ui)
- Add task form
- Task list
- Search bar
- Pagination
- Edit dialog
- Delete confirmation

### User Experience
- Show loading states
- Show empty state
- Show error states
- Use toast notifications

## DevOps

### Docker Setup
- **Dockerfile** - Next.js app containerization
- **docker-compose.yml** - Services:
  - Next.js app
  - PostgreSQL

## Migration
Use Prisma migration system.

## Seed Data
Generate seed script creating:
- Admin user
- Normal user
- Example tasks

## Environment Variables

### .env.example
```env
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Database Connection

PostgreSQL connection string:
```
postgresql://neondb_owner:npg_Ca0XEdv5qfhg@ep-lucky-night-a1ptqpio-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Development Tasks (27 Total)

### Phase 1: Project Setup & Dependencies (3 tasks)
1. Initialize Next.js 16 project with TypeScript and App Router
2. Install all required dependencies (Tailwind, shadcn/ui, Prisma, Auth.js, Zod, etc.)
3. Configure Tailwind CSS and install shadcn/ui components

### Phase 2: Database & Schema (3 tasks)
4. Create Prisma schema with all required tables
5. Configure PostgreSQL connection and run Prisma migrations
6. Create seed script with admin user, normal user, and example tasks

### Phase 3: Authentication & RBAC (2 tasks)
7. Set up Auth.js configuration (Email/Password and Google OAuth)
8. Implement RBAC middleware and role-based access control

### Phase 4: Core Architecture (4 tasks)
9. Create logger utility (info, warn, error)
10. Create API response standard format
11. Implement repository layer (taskRepository, userRepository, auditRepository)
12. Implement service layer (taskService, authService, auditService)

### Phase 5: API Routes (2 tasks)
13. Create authentication API routes (login, register, OAuth)
14. Create task API routes with CRUD operations

### Phase 6: Features Implementation (4 tasks)
15. Implement pagination utility
16. Implement search functionality with PostgreSQL LIKE/ILIKE
17. Implement soft delete for tasks (deletedAt field)
18. Implement audit logging for all system actions

### Phase 7: UI Components & Pages (3 tasks)
19. Create UI components (dashboard, task list, forms, dialogs)
20. Create auth pages (login, register)
21. Create dashboard page with task management

### Phase 8: User Experience (2 tasks)
22. Implement loading states, empty states, and error states
23. Add toast notifications

### Phase 9: DevOps & Testing (4 tasks)
24. Create environment variables template (.env.example)
25. Create Dockerfile for Next.js app
26. Create docker-compose.yml with Next.js and PostgreSQL services
27. Test the complete application (npm install, migrate, dev)

## Success Criteria

The generated project must:
1. Behave like a real SaaS starter template
2. Run successfully with:
   - `npm install`
   - `npx prisma migrate dev`
   - `npm run dev`

## Goal

Create a production-ready, scalable SaaS starter application that demonstrates:
- Clean architecture principles
- Best security practices
- Modern Next.js features
- Comprehensive error handling
- Type-safe development
- Professional UI/UX
