import { NextRequest, NextResponse } from 'next/server'
import { rbacMiddleware } from '@/middleware/rbacMiddleware'
import { prisma } from '@/lib/prisma'
import { success, error } from '@/lib/apiResponse'
import { auth } from '@/auth'

export async function PUT(
  request: NextRequest,
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
    return NextResponse.json(error('Cannot modify your own role here', 400), { status: 400 })
  }

  try {
    const body = await request.json()
    const { role } = body

    if (!role) {
      return NextResponse.json(error('Role is required', 400), { status: 400 })
    }

    const roleRecord = await prisma.role.findUnique({
      where: { name: role }
    })

    if (!roleRecord) {
      return NextResponse.json(error('Invalid role', 400), { status: 400 })
    }

    const existing = await prisma.userRole.findUnique({
      where: {
        userId_roleId: {
          userId: id,
          roleId: roleRecord.id
        }
      }
    })

    if (!existing) {
      await prisma.userRole.create({
        data: {
          userId: id,
          roleId: roleRecord.id
        }
      })
    }

    return NextResponse.json(success({ message: 'Role added successfully' }))
  } catch (err) {
    console.error('Failed to add role', err)
    return NextResponse.json(error('Internal Server Error', 500), { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
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
    return NextResponse.json(error('Cannot modify your own role here', 400), { status: 400 })
  }

  try {
    const body = await request.json()
    const { role } = body 

    if (!role) {
      return NextResponse.json(error('Role is required', 400), { status: 400 })
    }

    const roleRecord = await prisma.role.findUnique({
      where: { name: role }
    })

    if (!roleRecord) {
      return NextResponse.json(error('Invalid role', 400), { status: 400 })
    }

    await prisma.userRole.deleteMany({
      where: {
        userId: id,
        roleId: roleRecord.id
      }
    })

    return NextResponse.json(success({ message: 'Role removed successfully' }))
  } catch (err) {
    console.error('Failed to remove role', err)
    return NextResponse.json(error('Internal Server Error', 500), { status: 500 })
  }
}
