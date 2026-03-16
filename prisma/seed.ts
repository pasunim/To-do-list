import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  })

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: { name: 'user' },
  })

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      userRoles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  })

  const userPassword = await bcrypt.hash('user123', 10)

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Normal User',
      password: userPassword,
      userRoles: {
        create: {
          roleId: userRole.id,
        },
      },
    },
  })

  await prisma.task.createMany({
    data: [
      {
        title: 'Complete project setup',
        description: 'Set up the Next.js project with all dependencies',
        completed: true,
        userId: adminUser.id,
      },
      {
        title: 'Design database schema',
        description: 'Create Prisma schema with all required tables',
        completed: true,
        userId: adminUser.id,
      },
      {
        title: 'Implement authentication',
        description: 'Set up Auth.js with email/password and Google OAuth',
        completed: false,
        userId: adminUser.id,
      },
      {
        title: 'Create task management features',
        description: 'Implement CRUD operations for tasks',
        completed: false,
        userId: normalUser.id,
      },
      {
        title: 'Build dashboard UI',
        description: 'Create a beautiful dashboard with shadcn/ui components',
        completed: false,
        userId: normalUser.id,
      },
      {
        title: 'Add search functionality',
        description: 'Implement search with PostgreSQL ILIKE',
        completed: false,
        userId: normalUser.id,
      },
    ],
  })

  console.log('Seed completed successfully!')
  console.log('Admin user: admin@example.com / admin123')
  console.log('Normal user: user@example.com / user123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
