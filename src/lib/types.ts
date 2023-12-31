export type ApiResult<T> = Promise<T & { error: string | null }>;

export type User = {
  _id: string;
  name: string;
  username: string;
  avatar_url: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  manager: User;
  members: User[];
};

export type Task = {
  _id: string;
  projectId: string;
  name: string;
  description: {
    text: string;
    html: string;
  };
  assignedTo?: User;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
};

export type Comment = {
  _id: string;
  task: string;
  author: User;
  content: string;
};
