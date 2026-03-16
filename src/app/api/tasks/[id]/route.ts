import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { taskService } from '@/services/taskService'
import { updateTaskSchema } from '@/lib/validators'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be logged in',
          },
        },
        { status: 401 }
      )
    }

    const body = await request.json()

    const validationResult = updateTaskSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: validationResult.error.errors[0]?.message || 'Invalid input',
          },
        },
        { status: 400 }
      )
    }

    const userId = (session.user as any).id
    const { id } = await params

    const task = await taskService.update(id, userId, validationResult.data)

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update task',
        },
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be logged in',
          },
        },
        { status: 401 }
      )
    }

    const userId = (session.user as any).id
    const { id } = await params

    await taskService.delete(id, userId)

    return NextResponse.json({
      success: true,
      data: { message: 'Task deleted successfully' },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete task',
        },
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be logged in',
          },
        },
        { status: 401 }
      )
    }

    const userId = (session.user as any).id
    const { id } = await params

    const task = await taskService.toggleComplete(id, userId)

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error('PATCH /api/tasks/[id] error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to toggle task completion',
        },
      },
      { status: 500 }
    )
  }
}
