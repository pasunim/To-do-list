export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}

export function getPaginationParams(params: PaginationParams) {
  const page = Math.max(1, params.page || 1)
  const limit = Math.min(100, Math.max(1, params.limit || 10))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function createPaginationResult<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginationResult<T> {
  return {
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  }
}
