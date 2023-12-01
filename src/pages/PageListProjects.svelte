<script>
  import ProjectItem from "../components/ProjectItem.svelte";
  import { fetchProjects, projects } from "../stores/projectStore";
  import PanelCreateProject from "../components/PanelCreateProject.svelte";
  import { onMount } from "svelte";
  let createProjectPanelVisible = false;

  onMount(() => {
    fetchProjects();
  });
</script>

<div class="flex flex-1 flex-col">
  <div class="flex-1 p-8 space-y-4">
    <button
      class="border"
      on:click={() => {
        createProjectPanelVisible = true;
      }}>New project</button
    >

    <h1>Projects</h1>

    <ul
      class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      {#each $projects as project}
        <li class="list-none">
          <ProjectItem {project} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<PanelCreateProject bind:visible={createProjectPanelVisible} />
