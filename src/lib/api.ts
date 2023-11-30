import axios, { Axios } from "axios";
import type { ApiResult, Project } from "./types";
import { API_BASE_URL } from "./config";

class Api {
  private axios: Axios;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }
  async signUp(email: string, password: string): ApiResult<{ token: string }> {
    const { data } = await this.axios.post("/users", {
      email,
      password,
    });
    const { token, error } = data;
    return { data: { token }, error };
  }

  async signIn(email: string, password: string): ApiResult<{ token: string }> {
    const { data } = await this.axios.post("/users/sign-in", {
      email,
      password,
    });
    const { token, error } = data;
    return { data: { token }, error };
  }

  async getAuthenticated(): ApiResult<{ authenticated: boolean }> {
    return { data: { authenticated: true }, error: null };
  }

  async getProjects(): ApiResult<{ projects: Project[] }> {
    const { data } = await this.axios.get("/projects/");
    const { projects, error } = data;
    return { data: { projects }, error };
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
    return { data: { project }, error };
  }

  async getProjectDetails(id: string) {
    const { data } = await this.axios.get(`/projects/${id}`);
    return { data: data.data, error: data.error };
  }

  async getProjectTasks(id: string) {
    const { data } = await this.axios.get(`/tasks?projectId=${id}`);
    const { tasks, error } = data;
    return { data: { tasks }, error };
  }
}

export const api = new Api(API_BASE_URL);
