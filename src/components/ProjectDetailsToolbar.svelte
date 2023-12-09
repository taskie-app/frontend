<script lang="ts">
  import {
    FilterIcon,
    ChevronDownIcon,
  } from "@rgossiaux/svelte-heroicons/outline";
  import {
    RiAddCircleLine,
    RiArrowUpDownLine,
    RiDashboardLine,
    RiFilterLine,
    RiListCheck,
  } from "svelte-remixicon";

  export let displayMode: "LIST" | "BOARD" = "BOARD";
  export let onCreateTaskClick: () => void;
  export let sort: string;
  export let filter: string;
</script>

<!-- <div class="flex px-8 pt-4 gap-4">
  <button
    class="font-medium text-brand-500 border-b-2 border-brand-500 inline-block"
  >
    TASKS
  </button>
  <button class="font-medium text-gray-400 hover:text-gray-800 inline-block">
    SETTINGS
  </button>
</div> -->
<div class="flex px-8 py-4 gap-4">
  <div class="flex items-center gap-1">
    <RiArrowUpDownLine class="text-gray-400" size="18px" />
    <div class="text-sm font-medium text-gray-400">SORT</div>
    <button class="flex items-center ml-2">
      <select
        bind:value={sort}
        class="text-sm font-medium border-none bg-transparent outline-none focus:ring-0"
      >
        <option>Name A-Z</option>
        <option>Name Z-A</option>
        <option value="">Due date</option>
      </select>
    </button>
  </div>
  <div class="flex items-center gap-1">
    <RiFilterLine class="text-gray-400" size="18px" />
    <div class="text-sm font-medium text-gray-400">FILTER</div>
    <button class="text-sm font-medium flex items-center ml-2">
      <select
        bind:value={filter}
        class="border-none bg-transparent outline-none focus:ring-0"
      >
        <option>Done</option>
      </select>

      <!-- <ChevronDownIcon class="w-5" /> -->
    </button>
  </div>
  <div class="flex-1"></div>
  <button
    class={`flex items-center gap-1 ${displayMode != "LIST" && "opacity-50"}`}
    on:click={() => (displayMode = "LIST")}
  >
    <RiListCheck size="18px" />
    <div class="text-sm font-medium">LIST</div>
  </button>
  <button
    class={`flex items-center gap-1 ${displayMode != "BOARD" && "opacity-50"}`}
    on:click={() => (displayMode = "BOARD")}
  >
    <RiDashboardLine size="18px" />
    <div class="text-sm font-medium">BOARD</div>
  </button>
  <button
    class="flex items-center gap-1 text-brand-500"
    on:click={onCreateTaskClick}
  >
    <RiAddCircleLine size="18px" />
    <div class="">New task</div>
  </button>
</div>