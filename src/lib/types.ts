export type ApiResult<T> = Promise<{ data: T; error: string | null }>;

export type User = {
  _id: string;
  name: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  manager: unknown;
  members: unknown;
};
