import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
