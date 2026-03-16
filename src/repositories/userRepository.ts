import { prisma } from '@/lib/prisma'
import { User, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

export type UserWithRoles = User & {
  userRoles: Array<{
    role: Role
  }>
}

export class UserRepository {
  async findById(id: string): Promise<UserWithRoles | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    }) as Promise<UserWithRoles | null>
  }

  async findByEmail(email: string): Promise<UserWithRoles | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    }) as Promise<UserWithRoles | null>
  }

  async create(data: {
    name: string
    email: string
    password: string
  }): Promise<UserWithRoles> {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    })

    const userRole = await prisma.role.findUnique({
      where: { name: 'user' },
    })

    if (userRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id,
        },
      })
    }

    return this.findById(user.id) as Promise<UserWithRoles>
  }

  async verifyPassword(
    email: string,
    password: string
  ): Promise<UserWithRoles | null> {
    const user = await this.findByEmail(email)

    if (!user || !user.password) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return null
    }

    return user
  }

  async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ])

    return {
      users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async hasRole(userId: string, roleName: string): Promise<boolean> {
    const userRole = await prisma.userRole.findFirst({
      where: {
        userId,
        role: {
          name: roleName,
        },
      },
    })

    return !!userRole
  }

  async isAdmin(userId: string): Promise<boolean> {
    return this.hasRole(userId, 'admin')
  }
}

export const userRepository = new UserRepository()
