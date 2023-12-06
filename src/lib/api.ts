import axios, { Axios } from "axios";
import type { ApiResult, Project, Task, User } from "./types";
import { API_BASE_URL } from "./config";

class Api {
  private axios: Axios;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
    });
  }
  async signUp(
    username: string,
    password: string
  ): ApiResult<{ token: string }> {
    const { data } = await this.axios.post("/users", {
      username,
      password,
    });
    const { token, error } = data;
    return { token, error };
  }

  async signIn(
    username: string,
    password: string
  ): ApiResult<{ token: string }> {
    const { data } = await this.axios.post("/users/sign-in", {
      username,
      password,
    });
    const { token, error } = data;
    return { token, error };
  }

  async signOut() {
    const { data } = await this.axios.post("/users/sign-out");
    const { error } = data;
    return { error };
  }

  async getAuthenticated(): ApiResult<{ authenticated: boolean }> {
    const { data } = await this.axios.get("/authenticated/");
    const { authenticated, error } = data;
    return { authenticated, error };
  }

  async getUsers(filter: { username?: string }): ApiResult<{ users: User[] }> {
    const { username } = filter;
    const { data } = await this.axios.get(`/users?username=${username}`);
    const { users, error } = data;
    return { users, error };
  }

  async updateUser(id: string, newData: User) {
    const { data } = await this.axios.put(`/users/${id}`, newData);
  }

  async getProjects(): ApiResult<{ projects: Project[] }> {
    const { data } = await this.axios.get("/projects/");
    const { projects, error } = data;
    return { projects, error };
  }

  async createProject(
    name: string,
    description: string
  ): ApiResult<{ project: Project }> {
    const { data } = await this.axios.post("/projects/", {
      name,
      description,
    });
    const { project, error } = data;
    if (error) console.error(error);
    return { project, error };
  }

  async getProjectDetails(id: string): ApiResult<{ project: Project }> {
    const { data } = await this.axios.get(`/projects/${id}`);
    const { project, error } = data;
    return { project, error };
  }

  async updateProject(
    id: string,
    newData: Project
  ): ApiResult<{ project: Project }> {
    const { data } = await this.axios.put(`/projects/${id}`, newData);
    const { project, error } = data;
    return { project, error };
  }

  async deleteProject(id: string) {
    const { data } = await this.axios.delete(`/projects/${id}`);
    const { error } = data;
    return { error };
  }

  async deleteAllProjects() {
    const { data } = await this.axios.delete("/projects/");
    const { error } = data;
    return { error };
  }

  async createTask(projectId: string, name: string, description: string) {
    const { data } = await this.axios.post("/tasks/", {
      projectId,
      name,
      description,
    });
    const { task, error } = data;
    return { task, error };
  }

  async getTask(taskId: string): ApiResult<{ task: Task }> {
    const { data } = await this.axios.get(`/tasks/${taskId}`);
    const { task, error } = data;
    return { task, error };
  }

  async getProjectTasks(id: string): ApiResult<{ tasks: Task[] }> {
    const { data } = await this.axios.get(`/tasks?projectId=${id}`);
    const { tasks, error } = data;
    return { tasks, error };
  }

  async getUserTasks(): ApiResult<{ tasks: Task[] }> {
    const { data } = await this.axios.get(`/tasks`);
    const { tasks, error } = data;
    return { tasks, error };
  }

  async updateTask(taskId: string, newData: Task): ApiResult<{ task: Task }> {
    const { data } = await this.axios.put(`/tasks/${taskId}`, newData);
    const { task, error } = data;
    return { task, error };
  }

  async deleteTask(taskId: string) {
    const { data } = await this.axios.delete(`/tasks/${taskId}`);
    const { error } = data;
    return { error };
  }
}

export const api = new Api(API_BASE_URL);
