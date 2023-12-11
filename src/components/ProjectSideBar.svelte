<script lang="ts">
  import { ProjectTab } from "../lib/constants";
  import type { Project } from "../lib/types";
  import {
    RiDashboardLine,
    RiSettings3Line,
    RiTableLine,
    RiTodoLine,
    RiUserSettingsLine,
  } from "svelte-remixicon";

  export let project: Project;
  export let currentTab: ProjectTab;
</script>

<div
  class="flex flex-col w-[240px] h-screen sticky top-0 left-0 border-r bg-gray-100 p-4"
>
  <div class="flex gap-2 items-center">
    <div class="w-10 h-10 rounded bg-gray-200"></div>
    <div class="space-y-0.5">
      <div class="font-medium leading-none">{project.name}</div>
      <div class="text-gray-400 text-sm leading-none">Marketing</div>
    </div>
  </div>

  <div class="h-4"></div>

  <button
    class={`flex items-center gap-2 px-4 hover:bg-gray-200 h-12 rounded ${
      currentTab == ProjectTab.TASKS
        ? "text-brand-500 bg-gray-200"
        : "text-gray-700"
    }`}
    on:click={() => (currentTab = ProjectTab.TASKS)}
  >
    <RiTodoLine size="20px" />
    <div>Tasks</div>
  </button>
  <button
    class={`flex items-center gap-2 px-4 hover:bg-gray-200 h-12 rounded ${
      currentTab == ProjectTab.KANBAN
        ? "text-brand-500 bg-gray-200"
        : "text-gray-700"
    }`}
    on:click={() => (currentTab = ProjectTab.KANBAN)}
  >
    <RiTableLine size="20px" />

    <div>Kanban</div>
  </button>
  <button
    class={`flex items-center gap-2 px-4 hover:bg-gray-200 h-12 rounded ${
      currentTab == ProjectTab.MEMBERS
        ? "text-brand-500 bg-gray-200"
        : "text-gray-700"
    }`}
    on:click={() => (currentTab = ProjectTab.MEMBERS)}
  >
    <RiUserSettingsLine size="20px" />
    <div>Members</div>
  </button>
  <button
    class={`flex items-center gap-2 px-4 hover:bg-gray-200 h-12 rounded ${
      currentTab == ProjectTab.SETTINGS
        ? "text-brand-500 bg-gray-200"
        : "text-gray-700"
    }`}
    on:click={() => (currentTab = ProjectTab.SETTINGS)}
  >
    <RiSettings3Line size="20px" />
    <div>Settings</div>
  </button>
</div>
