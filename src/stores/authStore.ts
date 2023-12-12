import { writable } from "svelte/store";
import type { User } from "../lib/types";

export const initializing = writable(true);

export const authenticated = writable(false);

export const user = writable<User>();
