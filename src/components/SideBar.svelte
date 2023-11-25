<script>
  import SideBarLink from "../components/SideBarLink.svelte";
</script>

<div class="flex flex-col w-64 h-screen sticky top-0 left-0 border-r">
  <div class="flex flex-1 flex-col p-4 gap-2">
    <SideBarLink href="/" label="Overview" />
    <SideBarLink href="/tasks" label="My tasks" />
    <div class="border-b my-4"></div>
    <p class="text-xs font-medium text-gray-400 px-2">YOUR PROJECTS</p>
    <SideBarLink href="/projects/1" label="Landing page" />
    <SideBarLink href="/projects/2" label="Taskie app" />
  </div>
</div>
