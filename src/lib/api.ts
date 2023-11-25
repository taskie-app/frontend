class Api {
  async signUp(email: string, password: string) {}

  async signIn(email: string, password: string) {}

  async getProjects() {}

  async createProject() {}

  async getProjectDetails(id: string) {}
}

export const api = new Api();
