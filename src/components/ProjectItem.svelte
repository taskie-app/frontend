<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import type { Project } from "../lib/types";
  import MemberItem from "./MemberItem.svelte";
  import MoreIcon from "../icons/MoreIcon.svelte";
  export let project: Project;
  function openProjectDetails() {
    push(`/projects/${project._id}`);
  }
</script>

<button
  class="flex flex-col p-4 border rounded w-full"
  on:click={openProjectDetails}
>
  <div class="flex items-start justify-between w-full">
    <h2 class="text-xl">{project.name}</h2>
    <!-- <button
      class="rounded-full hover:bg-gray-5 0 h-8 w-8 flex items-center justify-center"
      on:click|stopPropagation={() => {
        console.log("Options");
      }}
    >
      <MoreIcon />
    </button> -->
  </div>
  <h3 class="text-gray-400">{project.description}</h3>

  <div class="flex items-center -space-x-2 mt-8">
    <MemberItem member={project?.manager} />
    {#each project?.members as member}
      <MemberItem {member} />
    {/each}
  </div>
</button>
