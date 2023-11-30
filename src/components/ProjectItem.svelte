<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project } from "../lib/types";
  export let project: Project;
</script>

<a href={`/projects/${project._id}`} use:link
  ><div
    class="h-44 !px-0 group pt-5 pb-0 group relative text-left bg-surface-100 border border-surface rounded-md p-5 flex flex-row h-32 transition ease-in-out duration-150 cursor-pointer hover:bg-overlay-hover hover:border-control"
  >
    <div class="flex h-full w-full flex-col space-y-2">
      <div class="w-full justify-between space-y-1.5 px-5">
        <p class="flex-shrink truncate text-sm pr-4">{project.name}</p>
        <span class="text-sm lowercase text-foreground-light"
          >{project.description}</span
        >
        <div class="flex items-center space-x-1.5"></div>
      </div>
      <div class="w-full !mt-auto"></div>
    </div>
    <div
      class=" absolute right-4 top-4 text-foreground-lighter transition-all duration-200 group-hover:right-3 group-hover:text-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="sbui-icon"><polyline points="9 18 15 12 9 6"></polyline></svg
      >
    </div>
  </div></a
>
