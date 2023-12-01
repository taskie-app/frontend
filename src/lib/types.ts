export type ApiResult<T> = Promise<T & { error: string | null }>;

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

export type Task = {
  _id: string;
  name: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};
