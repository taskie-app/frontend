<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project } from "../lib/types";
  import UserAvatar from "./UserAvatar.svelte";

  export let project: Project;
</script>

<div
  class="group bg-white rounded-sm border shadow-sm flex flex-col items-center py-8 cursor-pointer hover:bg-gray-50 transition-all duration-300"
>
  <div
    class="w-20 h-20 bg-gray-100 text-gray-400 uppercase text-2xl font-bold flex items-center justify-center rounded"
  >
    {project.name.slice(0, 2)}
  </div>
  <a href={`/projects/${project._id}`} use:link>
    <div
      class="text-lg font-medium group-hover:text-brand-500 duration-300 mt-4"
    >
      {project.name}
    </div>
  </a>
  <!-- <div class="flex flex-col items-center">
    <div class="text-xl">
      <span>60</span>
      /
      <span class="text-gray-400">148</span>
    </div>
    <div class="text-sm text-gray-400">Tasks completed</div>
  </div> -->

  <div class="bg-green-100 text-sm text-green-500 px-3 py-1 rounded mt-1">
    Marketing
  </div>

  <div class="flex -space-x-2 mt-6">
    {#each project.members as member}
      <div class="border-2 border-white rounded-full">
        <UserAvatar u={member} size={10} />
      </div>
    {/each}
  </div>
</div>
