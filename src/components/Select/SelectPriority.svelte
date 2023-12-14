<script lang="ts">
  import { RiArrowDownSLine, RiArrowUpLine } from "svelte-remixicon";
  import type { Task } from "../../lib/types";

  const ICON_CLASS_BY_PRIORITY = {
    HIGH: "text-red-500",
    MEDIUM: "text-amber-500",
    LOW: "text-green-500",
  };

  export let priority: Task["priority"];

  $: label = priority;

  let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
  function select(p: Task["priority"]) {
    priority = p;
    expanded = false;
  }
</script>

<div class="space-y-0.5">
  <div class="text-sm font-medium">Priority</div>
  <div class="relative w-full">
    <button
      class="w-full flex items-center justify-start gap-1 rounded px-3 h-10 text-left text-sm font-medium bg-gray-200"
      on:click={toggle}
    >
      <RiArrowUpLine size="16px" class={ICON_CLASS_BY_PRIORITY[priority]} />
      {label}
    </button>
    <div
      class:hidden={!expanded}
      class="absolute w-full z-10 bg-white border rounded shadow"
    >
      <div class="flex flex-col w-full">
        <button
          class="w-full flex items-center justify-start gap-1 rounded px-3 h-10 text-left text-sm font-medium hover:bg-gray-200"
          on:click={() => select("HIGH")}
        >
          <RiArrowUpLine size="16px" class={ICON_CLASS_BY_PRIORITY["HIGH"]} />
          HIGH
        </button>
      </div>
      <div class="flex flex-col w-full">
        <button
          class="w-full flex items-center justify-start gap-1 rounded px-3 h-10 text-left text-sm font-medium hover:bg-gray-200"
          on:click={() => select("MEDIUM")}
        >
          <RiArrowUpLine size="16px" class={ICON_CLASS_BY_PRIORITY["MEDIUM"]} />
          MEDIUM
        </button>
      </div>
      <div class="flex flex-col w-full">
        <button
          class="w-full flex items-center justify-start gap-1 rounded px-3 h-10 text-left text-sm font-medium hover:bg-gray-200"
          on:click={() => select("LOW")}
        >
          <RiArrowUpLine size="16px" class={ICON_CLASS_BY_PRIORITY["LOW"]} />
          LOW
        </button>
      </div>
    </div>
  </div>
</div>
