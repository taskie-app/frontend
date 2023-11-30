<script>
  import SideBarLink from "../components/SideBarLink.svelte";
  import { projects } from "../stores/projectStore";
</script>

<div
  class="flex flex-col w-64 h-screen sticky top-0 left-0 border-r bg-gray-50"
>
  <div class="h-16 border-b px-4 flex items-center">
    <div class="inline-block relative w-full">
      <button
        class="w-full flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <div class="h-6 w-6 rounded-full bg-gray-100"></div>
        <div class="font-medium">nguyenhaiduc</div>
      </button>
      <!-- <div
        class="absolute mt-2 bg-white border rounded-md shadow-md min-w-[320px] p-4"
      >
        Sign out
      </div> -->
    </div>
  </div>
  <div class="flex flex-1 flex-col p-4 gap-2">
    <SideBarLink href="/" label="Overview" />
    <SideBarLink href="/tasks" label="My tasks" />
    <div class="border-b my-4"></div>
    <p class="text-xs font-medium text-gray-400 px-2">YOUR PROJECTS</p>

    {#each $projects as project}
      <SideBarLink href={`/projects/${project._id}`} label={project.name} />
    {/each}
  </div>
</div>
