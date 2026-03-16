import { NextRequest, NextResponse } from 'next/server'
import { rbacMiddleware } from '@/middleware/rbacMiddleware'
import { userRepository } from '@/repositories/userRepository'
import { success, error } from '@/lib/apiResponse'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(error('Unauthorized', 401), { status: 401 })
  }

  const userId = (session.user as any).id
  const isAdmin = await rbacMiddleware.requireAdmin(userId)
  if (!isAdmin) {
    return NextResponse.json(error('Forbidden', 403), { status: 403 })
  }

  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    const result = await userRepository.getAll(page, limit)
    
    const usersWithRoles = result.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      roles: user.userRoles.map(ur => ur.role.name)
    }))

    return NextResponse.json(success({
      items: usersWithRoles,
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages
    }))
  } catch (err) {
    console.error('Failed to get users', err)
    return NextResponse.json(error('Internal Server Error', 500), { status: 500 })
  }
}
