<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project } from "../lib/types";

  export let project: Project;
  let members = Array(5).fill(0);
</script>

<div
  class="group bg-white rounded-md shadow-sm flex flex-col items-center gap-6 py-8 cursor-pointer hover:shadow-md transition-all duration-300"
>
  <img src="" alt="" class="w-20 h-20 rounded-full bg-gray-50" />
  <a href={`/projects/${project._id}`} use:link>
    <div class="text-lg font-medium group-hover:text-brand-500 duration-300">
      {project.name}
    </div>
  </a>
  <div class="flex flex-col items-center">
    <div class="text-xl">
      <span>60</span>
      /
      <span class="text-gray-400">148</span>
    </div>
    <div class="text-sm text-gray-400">Tasks completed</div>
  </div>
  <div class="flex -space-x-2">
    {#each members as member}
      <div
        class="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"
      ></div>
    {/each}
  </div>
</div>
