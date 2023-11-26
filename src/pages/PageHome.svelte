<script>
  import ProjectItem from "../components/ProjectItem.svelte";
  import Button from "../components/Button.svelte";
  import { onMount } from "svelte";
  import { authenticated } from "../stores/auth";
  import { replace } from "svelte-spa-router";
  let showModal = false;
  const newProject = () => {
    showModal = true;
  };
  onMount(() => {
    if (!$authenticated) {
      replace("/sign-in");
    }
  });
</script>

<div class="flex flex-1 flex-col">
  <div class="h-16 border-b px-8 flex items-center justify-between">
    <h1 class="text-lg font-medium">Projects</h1>
    <Button label="New project" on:click={newProject} />
  </div>
  <div class="flex-1 p-8 space-y-4">
    <ul
      class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      <li class="list-none">
        <ProjectItem />
      </li>
      <li class="list-none">
        <ProjectItem />
      </li>
    </ul>
  </div>
</div>

<div
  class="absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center hidden"
>
  <div class="bg-white w-full max-w-2xl p-8 rounded-xl">
    <h1>New Project</h1>
    <h1 class="text-3xl font-medium">Project name</h1>
    <h1 class="text-xl text-gray-400">Description</h1>
    <div class="border-b my-8"></div>
    <div class="flex items-center justify-end gap-4">
      <button
        class="px-4 py-2 font-medium rounded-lg shadow-sm border border-gray-300 bg-white hover:bg-gray-50"
        >Cancel</button
      >
      <button
        class="px-4 py-2 font-medium text-white rounded-lg shadow-sm border border-brand-600 bg-brand-500 hover:bg-brand-500"
        >Create</button
      >
    </div>
  </div>
</div>
