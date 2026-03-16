import { prisma } from '@/lib/prisma'
import { Task } from '@prisma/client'
import { getPaginationParams } from '@/utils/pagination'

export interface TaskSearchParams {
  search?: string
  page?: number
  limit?: number
}

export class TaskRepository {
  async create(
    data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
  ): Promise<Task> {
    return prisma.task.create({ data })
  }

  async findById(id: string): Promise<Task | null> {
    return prisma.task.findFirst({
      where: { id, deletedAt: null },
    })
  }

  async findByUserId(userId: string, params?: TaskSearchParams) {
    const { page, limit, skip } = getPaginationParams(params || {})
    const search = params?.search

    const where: any = {
      userId,
      deletedAt: null,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ])

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async findAll(params?: TaskSearchParams) {
    const { page, limit, skip } = getPaginationParams(params || {})
    const search = params?.search

    const where: any = {
      deletedAt: null,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ])

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async update(
    id: string,
    userId: string,
    data: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>
  ): Promise<Task | null> {
    return prisma.task.updateMany({
      where: { id, userId, deletedAt: null },
      data,
    }).then(() => this.findById(id))
  }

  async softDelete(id: string, userId: string): Promise<Task | null> {
    return prisma.task.updateMany({
      where: { id, userId, deletedAt: null },
      data: { deletedAt: new Date() },
    }).then(() => this.findById(id))
  }

  async toggleComplete(id: string, userId: string): Promise<Task | null> {
    const task = await this.findById(id)
    if (!task) return null

    return this.update(id, userId, { completed: !task.completed })
  }
}

export const taskRepository = new TaskRepository()
