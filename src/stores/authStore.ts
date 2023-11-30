import { writable } from "svelte/store";

export const initializing = writable(true);

export const authenticated = writable(false);
