export type ApiFetchOptions = RequestInit & {
    url: string
    params?: Record<string, string | number | boolean | undefined | null>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>
}

export type ApiFetchResult<T> =
    | {
          error: ApiError
          data?: never
      }
    | {
          error?: never
          data: T
      }

export interface ApiError extends Error {
    code: number
    error: string
}
