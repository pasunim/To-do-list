import { authService } from '@/services/authService'
import { logger } from '@/utils/logger'
import { error } from '@/lib/apiResponse'

export class RBACMiddleware {
  async requireAuth(request: Request): Promise<{ userId: string } | null> {
    try {
      const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')

      if (!sessionToken) {
        logger.warn('Unauthorized access attempt', { path: request.url })
        return null
      }

      const userId = this.getUserIdFromToken(sessionToken)

      if (!userId) {
        logger.warn('Invalid session token', { path: request.url })
        return null
      }

      return { userId }
    } catch (error) {
      logger.error('Auth middleware error', { error })
      return null
    }
  }

  async requireRole(userId: string, roleName: string): Promise<boolean> {
    return authService.hasRole(userId, roleName)
  }

  async requireAdmin(userId: string): Promise<boolean> {
    return authService.isAdmin(userId)
  }

  private getUserIdFromToken(token: string): string | null {
    try {
      const decoded = JSON.parse(atob(token))
      return decoded.userId || null
    } catch {
      return null
    }
  }
}

export const rbacMiddleware = new RBACMiddleware()
