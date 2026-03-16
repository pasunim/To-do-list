import { prisma } from '@/lib/prisma'
import { AuditLog } from '@prisma/client'

export interface AuditLogInput {
  userId: string
  action: string
  entity: string
  entityId?: string
  metadata?: Record<string, unknown>
}

export class AuditRepository {
  async create(data: AuditLogInput): Promise<AuditLog> {
    return prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata as any,
      },
    })
  }

  async findByUserId(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.auditLog.count({ where: { userId } }),
    ])

    return {
      logs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async findByEntity(entity: string, entityId?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const where: any = { entity }

    if (entityId) {
      where.entityId = entityId
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ])

    return {
      logs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.auditLog.count(),
    ])

    return {
      logs,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }
}

export const auditRepository = new AuditRepository()
