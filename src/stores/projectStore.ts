import { writable } from "svelte/store";
import { type Project } from "../lib/types";

export const projects = writable<Project[]>([]);
