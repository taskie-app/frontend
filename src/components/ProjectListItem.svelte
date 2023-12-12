<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project } from "../lib/types";
  import UserAvatar from "./UserAvatar.svelte";

  export let project: Project;
</script>

<div
  class="group bg-white border border-gray-100 rounded-md shadow-sm flex items-center gap-6 px-6 py-2 m-2 cursor-pointer hover:shadow-md transition-all duration-300"
>
  <img src="" alt="" class="w-10 h-10 rounded-full bg-gray-100" />
  <a href={`/projects/${project._id}`} use:link class="flex-1">
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
  <div class="flex -space-x-2 w-32 justify-end">
    {#each project.members as member}
      <div class="border-2 border-white rounded-full">
        <UserAvatar u={member} size={10} />
      </div>
    {/each}
  </div>
</div>
