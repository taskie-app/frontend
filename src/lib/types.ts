export type ApiResult<T> = Promise<{ data: T; error: Error | null }>;

export type Project = {
  _id: string;
  name: string;
  description: string;
  manager: unknown;
  members: unknown;
};
