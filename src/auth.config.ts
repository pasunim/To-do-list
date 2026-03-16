import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isAdmin = nextUrl.pathname.startsWith('/admin')
      const isAuthPage = nextUrl.pathname.startsWith('/auth')

      if (isDashboard || isAdmin) {
        if (isLoggedIn) return true
        return false // Redirect to login
      } else if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
        return true
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.roles = (user as any).roles || []
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.roles = token.roles
      }
      return session
    },
  },
  providers: [], // Add empty providers to satisfy NextAuthConfig
} satisfies NextAuthConfig
