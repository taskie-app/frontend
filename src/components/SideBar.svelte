<script>
  import SideBarLink from "../components/SideBarLink.svelte";
  import { projects } from "../stores/projectStore";
</script>

<div
  class="flex flex-col w-64 h-screen sticky top-0 left-0 border-r bg-gray-50"
>
  <div class="h-16 border-b px-4 flex items-center">
    <div class="inline-block relative w-full">
      <div class="text-xl font-medium">Taskie</div>
    </div>
  </div>
  <div class="flex flex-1 flex-col p-4 gap-2">
    <SideBarLink href="/projects" label="Projects" />
    <SideBarLink href="/tasks" label="My tasks" />
    <div class="border-b my-4"></div>
    <p class="text-xs font-medium text-gray-400 px-2">YOUR PROJECTS</p>

    {#each $projects as project}
      <SideBarLink href={`/projects/${project._id}`} label={project.name} />
    {/each}
  </div>
</div>
