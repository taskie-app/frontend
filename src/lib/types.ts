export type ApiResult<T> = Promise<{ data: T; error: Error | null }>;
