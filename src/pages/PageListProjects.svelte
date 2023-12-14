<script lang="ts">
  import ProjectBoardItem from "../components/ProjectBoardItem.svelte";
  import ProjectListItem from "../components/ProjectListItem.svelte";
  import { fetchProjects, projects } from "../stores/projectStore";
  import PanelCreateProject from "../components/PanelCreateProject.svelte";
  import { onMount } from "svelte";
  import SideBar from "../components/SideBar.svelte";
  import MenuBar from "../components/MenuBar.svelte";
  import ListProjectsToolbar from "../components/ListProjectsToolbar.svelte";
  import type { Project } from "../lib/types";
  import PageLayout from "../components/PageLayout.svelte";

  const sortFunctions = {
    name: (p1: Project, p2: Project) => (p1.name > p2.name ? 1 : -1),
    "-name": (p1: Project, p2: Project) => (p1.name > p2.name ? -1 : 1),
  };

  let createProjectPanel: any;

  let sort: keyof typeof sortFunctions = "name";
  let filter = "done";
  let displayMode: "LIST" | "BOARD" = "BOARD";

  onMount(() => {
    fetchProjects();
  });
</script>

<PageLayout>
  <SideBar />
  <div class="flex flex-col flex-1">
    <!-- <MenuBar title="" /> -->
    <div class="text-3xl font-semibold px-8 mt-4">Projects</div>
    <ListProjectsToolbar
      bind:sort
      bind:filter
      bind:displayMode
      onCreateProjectClick={() => createProjectPanel?.show()}
    />
    <div class="">
      {#if displayMode == "LIST"}
        <ul>
          {#each $projects as project}
            <li class="list-none">
              <ProjectListItem {project} />
            </li>
          {/each}
        </ul>
      {:else}
        <ul
          class="px-8 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"
        >
          {#each $projects as project}
            <li class="list-none">
              <ProjectBoardItem {project} />
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</PageLayout>

<PanelCreateProject bind:this={createProjectPanel} />
