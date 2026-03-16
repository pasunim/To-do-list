import { taskRepository } from '@/repositories/taskRepository'
import { auditService } from './auditService'
import { Task } from '@prisma/client'
import { logger } from '@/utils/logger'

export interface CreateTaskInput {
  title: string
  description?: string
  userId: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  completed?: boolean
}

export class TaskService {
  async create(input: CreateTaskInput): Promise<Task> {
    try {
      const task = await taskRepository.create({
        title: input.title,
        description: input.description || null,
        completed: false,
        userId: input.userId,
      })

      await auditService.log({
        userId: input.userId,
        action: 'TASK_CREATED',
        entity: 'Task',
        entityId: task.id,
        metadata: { title: task.title },
      })

      logger.info('Task created', { taskId: task.id, userId: input.userId })
      return task
    } catch (error) {
      logger.error('Failed to create task', { userId: input.userId, error })
      throw error
    }
  }

  async findById(id: string, userId: string): Promise<Task | null> {
    const task = await taskRepository.findById(id)

    if (task && task.userId !== userId) {
      return null
    }

    return task
  }

  async findByUserId(userId: string, params?: {
    search?: string
    page?: number
    limit?: number
  }) {
    try {
      const result = await taskRepository.findByUserId(userId, params)
      return result
    } catch (error) {
      logger.error('Failed to fetch tasks', { userId, error })
      throw error
    }
  }

  async findAll(params?: {
    search?: string
    page?: number
    limit?: number
  }) {
    try {
      const result = await taskRepository.findAll(params)
      return result
    } catch (error) {
      logger.error('Failed to fetch all tasks', { error })
      throw error
    }
  }

  async update(
    id: string,
    userId: string,
    input: UpdateTaskInput
  ): Promise<Task | null> {
    try {
      const task = await this.findById(id, userId)

      if (!task) {
        logger.warn('Task not found or unauthorized', { taskId: id, userId })
        return null
      }

      const updatedTask = await taskRepository.update(id, userId, input)

      if (updatedTask) {
        await auditService.log({
          userId,
          action: 'TASK_UPDATED',
          entity: 'Task',
          entityId: id,
          metadata: input,
        })

        logger.info('Task updated', { taskId: id, userId })
      }

      return updatedTask
    } catch (error) {
      logger.error('Failed to update task', { taskId: id, userId, error })
      throw error
    }
  }

  async delete(id: string, userId: string): Promise<Task | null> {
    try {
      const task = await this.findById(id, userId)

      if (!task) {
        logger.warn('Task not found or unauthorized', { taskId: id, userId })
        return null
      }

      const deletedTask = await taskRepository.softDelete(id, userId)

      if (deletedTask) {
        await auditService.log({
          userId,
          action: 'TASK_DELETED',
          entity: 'Task',
          entityId: id,
          metadata: { title: task.title },
        })

        logger.info('Task deleted', { taskId: id, userId })
      }

      return deletedTask
    } catch (error) {
      logger.error('Failed to delete task', { taskId: id, userId, error })
      throw error
    }
  }

  async toggleComplete(id: string, userId: string): Promise<Task | null> {
    try {
      const task = await this.findById(id, userId)

      if (!task) {
        logger.warn('Task not found or unauthorized', { taskId: id, userId })
        return null
      }

      const updatedTask = await taskRepository.toggleComplete(id, userId)

      if (updatedTask) {
        await auditService.log({
          userId,
          action: 'TASK_TOGGLED',
          entity: 'Task',
          entityId: id,
          metadata: { completed: updatedTask.completed },
        })

        logger.info('Task toggled', { taskId: id, userId, completed: updatedTask.completed })
      }

      return updatedTask
    } catch (error) {
      logger.error('Failed to toggle task', { taskId: id, userId, error })
      throw error
    }
  }
}

export const taskService = new TaskService()
