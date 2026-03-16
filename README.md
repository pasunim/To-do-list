# Task Management SaaS Starter

โปรเจกต์เริ่มต้นสำหรับแอปพลิเคชัน SaaS ที่เน้นความปลอดภัย ความสามารถในการปรับขนาด และการจัดการงานที่มีประสิทธิภาพ พัฒนาด้วยเทคโนโลยีล่าสุดอย่าง **Next.js 16.1.6** และ **React 19.2.4** โดยใช้โครงสร้างแบบ **Clean Architecture**

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend/Backend:** [Next.js 16.1.6 (App Router)](https://nextjs.org/)
- **UI Framework:** [React 19.2.4](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/) (PostgreSQL)
- **Authentication:** [NextAuth.js v5](https://authjs.dev/)
- **State Management & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Architecture:** Clean Architecture (Services & Repositories Layers)
- **Logging:** Audit Logging & Custom Logger
- **Containerization:** Docker & Docker Compose

## ✨ คุณสมบัติหลัก (Features)

- 🔐 **ระบบพิสูจน์ตัวตน (Authentication):** รองรับการเข้าสู่ระบบด้วย Email/Password และ Google OAuth (NextAuth v5 Beta)
- 🛡️ **ระบบควบคุมสิทธิ์ (RBAC):** จัดการสิทธิ์การใช้งานตามบทบาท (Roles) เช่น USER, ADMIN
- 📝 **การจัดการงาน (Task Management):** ระบบ CRUD พื้นฐาน พร้อมฟีเจอร์ Soft Delete
- 📜 **Audit Logging:** บันทึกทุกกิจกรรมสำคัญที่เกิดขึ้นในระบบ (เช่น การสร้าง/แก้ไข/ลบงาน)
- 🏗️ **Clean Architecture:** แยก Layer ระหว่าง Logic (Service) และ Data Access (Repository) อย่างชัดเจน
- 🐳 **Docker Ready:** พร้อมสำหรับการ deploy ด้วย Docker และ Docker Compose
- ⚡ **Turbopack:** พัฒนาได้รวดเร็วขึ้นด้วย Turbopack ใน Next.js 16

## 🛠️ วิธีการติดตั้ง (Getting Started)

### 1. โคลนโปรเจกต์
```bash
git clone <repository-url>
cd to-do-list
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` โดยอ้างอิงจาก `.env.example`
```bash
cp .env.example .env
```
กรอกข้อมูลที่จำเป็น:
- `DATABASE_URL`: URL สำหรับเชื่อมต่อฐานข้อมูล PostgreSQL
- `NEXTAUTH_SECRET`: คีย์ลับสำหรับ NextAuth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: สำหรับ Google OAuth

### 4. ตั้งค่าฐานข้อมูล (Prisma)
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 5. รันโปรเจกต์
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
src/
├── app/              # Next.js App Router (Routes, API, Pages)
├── components/       # UI Components (Shadcn/Radix)
├── services/         # Business Logic Layer
├── repositories/     # Data Access Layer
├── lib/              # Shared Utilities & Configurations (Auth, Prisma)
├── middleware/       # RBAC & Auth Middleware
└── utils/            # Helper Functions (Logger, Pagination)
```

## 🐳 Docker Deployment

รันแอปพลิเคชันพร้อมฐานข้อมูลผ่าน Docker:
```bash
docker-compose up --build
```

## 📄 ใบอนุญาต (License)
โปรเจกต์นี้อยู่ภายใต้ใบอนุญาต [MIT License](LICENSE)
