<script>
  import ProjectItem from "../components/ProjectItem.svelte";
  import { onMount } from "svelte";
  import { authenticated } from "../stores/auth";
  import { replace } from "svelte-spa-router";
  import { api } from "../lib/api";
  import { projects } from "../stores/projectStore";
  let modalVisible = false;
  let name = "";
  let description = "";

  function showModal() {
    modalVisible = true;
  }

  function hideModal() {
    modalVisible = false;
  }

  function submitCreate() {
    api.createProject(name, description);
  }
</script>

<div class="flex flex-1 flex-col">
  <div class="h-16 border-b px-8 flex items-center justify-between">
    <h1 class="text-lg font-medium">Projects</h1>
    <button on:click={showModal}>New Project</button>
  </div>
  <div class="flex-1 p-8 space-y-4">
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

<div
  class={`absolute top-0 left-0 w-screen h-screen ${
    modalVisible ? "flex" : "hidden"
  } bg-black/50 items-center justify-center`}
>
  <div class="bg-white w-full max-w-2xl">
    <input
      type="text"
      name=""
      id=""
      placeholder="Project name"
      bind:value={name}
    />
    <input
      type="text"
      name=""
      id=""
      placeholder="Description"
      bind:value={description}
    />
    <button on:click={hideModal}>Cancel</button>
    <button on:click={submitCreate}>Create</button>
  </div>
</div>
