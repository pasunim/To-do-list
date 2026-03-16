export interface ApiResponse<T = unknown> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pages: number
}

export function success<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  }
}

export function error(code: string, message: string): ApiError {
  return {
    success: false,
    error: {
      code,
      message,
    },
  }
}

export function paginated<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): ApiResponse<PaginatedResponse<T>> {
  return {
    success: true,
    data: {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  }
}
