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
  export let onCreateProjectClick: () => void;
  export let sort: string;
  export let filter: string;
</script>

<div class="flex px-8 py-4 gap-4">
  <div class="flex items-center gap-1">
    <RiArrowUpDownLine class="text-gray-400" size="18px" />
    <div class="text-sm font-medium text-gray-400">SORT</div>
    <button class="flex items-center ml-2">
      <select
        bind:value={sort}
        class="text-sm font-medium border-none bg-transparent outline-none focus:ring-0"
      >
        <option value="name">Name A-Z</option>
        <option value="-name">Name Z-A</option>
      </select>
    </button>
  </div>
  <!-- <div class="flex items-center gap-1">
    <RiFilterLine class="text-gray-400" size="18px" />
    <div class="text-sm font-medium text-gray-400">FILTER</div>
    <button class="text-sm font-medium flex items-center ml-2">
      <select
        bind:value={filter}
        class="border-none bg-transparent outline-none focus:ring-0"
      >
        <option>Done</option>
      </select>

      <ChevronDownIcon class="w-5" />
    </button>
  </div> -->
  <div class="flex-1"></div>
  <!-- <button
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
  </button> -->
  <button
    class="flex items-center gap-1 text-brand-500"
    on:click={onCreateProjectClick}
  >
    <RiAddCircleLine size="18px" />
    <div class="">New Project</div>
  </button>
</div>
