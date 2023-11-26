import axios, { Axios } from "axios";
import type { ApiResult } from "./types";

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

  async getAuthenticated() {
    return { error: true };
  }

  async getProjects() {}

  async createProject() {}

  async getProjectDetails(id: string) {}
}

export const api = new Api("//localhost:4000");
