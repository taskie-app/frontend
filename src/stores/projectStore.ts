import { writable } from "svelte/store";
import { type Project } from "../lib/types";
import { api } from "../lib/api";

export const projects = writable<Project[]>([]);

export const fetchProjects = async () => {
  const { projects: fetchedProjects, error } = await api.getProjects();
  if (error) {
    console.error(error);
  } else {
    projects.set(fetchedProjects);
  }
};

export const deleteAllProjects = async () => {
  const { error } = await api.deleteAllProjects();
  if (error) {
    console.error(error);
  } else {
    projects.set([]);
  }
};
