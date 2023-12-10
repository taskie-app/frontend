<script>
  import SideBarLink from "../components/SideBarLink.svelte";
  import { projects } from "../stores/projectStore";
</script>

<div
  class="flex flex-col w-[240px] h-screen sticky top-0 left-0 border-r bg-white"
>
  <div class="h-16 px-4 flex items-center">
    <div class="inline-block relative w-full">
      <div class="text-xl font-medium">Taskie</div>
    </div>
  </div>
  <div class="flex flex-1 flex-col">
    <SideBarLink href="/projects" label="Projects" />
    <SideBarLink href="/my-tasks" label="My tasks" />
    <div class="border-b my-4"></div>
    <p class="text-xs text-gray-400 px-2 mb-2">YOUR PROJECTS</p>

    {#each $projects as project}
      <SideBarLink href={`/projects/${project._id}`} label={project.name} />
    {/each}
  </div>
</div>
