import { userRepository, UserWithRoles } from '@/repositories/userRepository'
import { auditService } from './auditService'
import { logger } from '@/utils/logger'
import { RegisterInput, LoginInput } from '@/lib/validators'

export class AuthService {
  async register(input: RegisterInput) {
    try {
      const existingUser = await userRepository.findByEmail(input.email)

      if (existingUser) {
        logger.warn('Registration attempt with existing email', { email: input.email })
        return {
          success: false,
          error: {
            code: 'EMAIL_EXISTS',
            message: 'Email already registered',
          },
        }
      }

      const user = await userRepository.create(input)

      await auditService.log({
        userId: user.id,
        action: 'USER_REGISTERED',
        entity: 'User',
        entityId: user.id,
        metadata: { email: user.email, name: user.name },
      })

      logger.info('User registered successfully', { userId: user.id, email: user.email })

      return {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.userRoles.map((ur: { role: { name: string } }) => ur.role.name),
        },
      }
    } catch (error) {
      logger.error('Failed to register user', { email: input.email, error })
      return {
        success: false,
        error: {
          code: 'REGISTRATION_FAILED',
          message: 'Failed to register user',
        },
      }
    }
  }

  async login(input: LoginInput) {
    try {
      const user = await userRepository.verifyPassword(input.email, input.password)

      if (!user) {
        logger.warn('Login attempt with invalid credentials', { email: input.email })
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        }
      }

      await auditService.log({
        userId: user.id,
        action: 'LOGIN',
        entity: 'User',
        entityId: user.id,
        metadata: { email: user.email },
      })

      logger.info('User logged in successfully', { userId: user.id, email: user.email })

      return {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.userRoles.map((ur: { role: { name: string } }) => ur.role.name),
        },
      }
    } catch (error) {
      logger.error('Failed to login user', { email: input.email, error })
      return {
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          message: 'Failed to login',
        },
      }
    }
  }

  async getUserById(id: string) {
    try {
      const user = await userRepository.findById(id)

      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        }
      }

      return {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.userRoles.map((ur: { role: { name: string } }) => ur.role.name),
        },
      }
    } catch (error) {
      logger.error('Failed to fetch user', { userId: id, error })
      return {
        success: false,
        error: {
          code: 'FETCH_USER_FAILED',
          message: 'Failed to fetch user',
        },
      }
    }
  }

  async hasRole(userId: string, roleName: string): Promise<boolean> {
    return userRepository.hasRole(userId, roleName)
  }

  async isAdmin(userId: string): Promise<boolean> {
    return userRepository.isAdmin(userId)
  }
}

export const authService = new AuthService()
