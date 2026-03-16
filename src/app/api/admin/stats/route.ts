import { NextResponse } from 'next/server'
import { rbacMiddleware } from '@/middleware/rbacMiddleware'
import { prisma } from '@/lib/prisma'
import { success, error } from '@/lib/apiResponse'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(error('Unauthorized', 401), { status: 401 })
  }

  const userId = (session.user as any).id
  const isAdmin = await rbacMiddleware.requireAdmin(userId)
  if (!isAdmin) {
    return NextResponse.json(error('Forbidden', 403), { status: 403 })
  }

  try {
    const [totalUsers, totalTasks] = await Promise.all([
      prisma.user.count(),
      prisma.task.count(),
    ])

    return NextResponse.json(success({ totalUsers, totalTasks }))
  } catch (err) {
    console.error('Failed to get stats', err)
    return NextResponse.json(error('Internal Server Error', 500), { status: 500 })
  }
}
