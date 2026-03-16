import { NextRequest, NextResponse } from 'next/server'
import { rbacMiddleware } from '@/middleware/rbacMiddleware'
import { prisma } from '@/lib/prisma'
import { success, error } from '@/lib/apiResponse'
import { auth } from '@/auth'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(error('Unauthorized', 401), { status: 401 })
  }

  const userId = (session.user as any).id
  const isAdmin = await rbacMiddleware.requireAdmin(userId)
  if (!isAdmin) {
    return NextResponse.json(error('Forbidden', 403), { status: 403 })
  }
  
  const { id } = await params

  if (userId === id) {
    return NextResponse.json(error('Cannot delete yourself', 400), { status: 400 })
  }

  try {
    await prisma.user.delete({
      where: { id }
    })
    return NextResponse.json(success({ message: 'User deleted successfully' }))
  } catch (err) {
    console.error('Failed to delete user', err)
    return NextResponse.json(error('Internal Server Error', 500), { status: 500 })
  }
}
