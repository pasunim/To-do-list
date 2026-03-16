import { auditRepository } from '@/repositories/auditRepository'
import { logger } from '@/utils/logger'

export interface AuditLogInput {
  userId: string
  action: string
  entity: string
  entityId?: string
  metadata?: Record<string, unknown>
}

export class AuditService {
  async log(input: AuditLogInput): Promise<void> {
    try {
      await auditRepository.create(input)
      logger.info('Audit log created', { action: input.action, entity: input.entity })
    } catch (error) {
      logger.error('Failed to create audit log', { input, error })
    }
  }

  async findByUserId(userId: string, page: number = 1, limit: number = 10) {
    try {
      return await auditRepository.findByUserId(userId, page, limit)
    } catch (error) {
      logger.error('Failed to fetch audit logs', { userId, error })
      throw error
    }
  }

  async findByEntity(entity: string, entityId?: string, page: number = 1, limit: number = 10) {
    try {
      return await auditRepository.findByEntity(entity, entityId, page, limit)
    } catch (error) {
      logger.error('Failed to fetch audit logs by entity', { entity, entityId, error })
      throw error
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      return await auditRepository.findAll(page, limit)
    } catch (error) {
      logger.error('Failed to fetch all audit logs', { error })
      throw error
    }
  }
}

export const auditService = new AuditService()
