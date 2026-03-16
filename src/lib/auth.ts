import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { authService } from '@/services/authService'
import { userRepository } from '@/repositories/userRepository'
import { authConfig as baseAuthConfig } from '@/auth.config'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      roles?: string[]
    }
  }
}

export const authConfig: NextAuthConfig = {
  ...baseAuthConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const result = await authService.login({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        if (!result.success || !result.data) {
          return null
        }

        return {
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          roles: result.data.roles,
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    ...baseAuthConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existingUser = await userRepository.findByEmail(user.email)

        if (!existingUser) {
          return false
        }

        user.id = existingUser.id
      }

      return true
    },
  },
}
