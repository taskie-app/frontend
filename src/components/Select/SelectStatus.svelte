<script lang="ts">
  import { RiArrowDownSLine } from "svelte-remixicon";
  import type { Task } from "../../lib/types";
  export let status: Task["status"];

  const CLASS_BY_STATUS = {
    TODO: "bg-blue-600 hover:bg-blue-500",
    IN_PROGRESS: "bg-amber-500 hover:bg-amber-400",
    DONE: "bg-green-600 hover:bg-green-500",
  };

  const LABEL_BY_STATUS = {
    TODO: "TODO",
    IN_PROGRESS: "IN PROGRESS",
    DONE: "DONE",
  };

  $: label = LABEL_BY_STATUS[status];

  let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
  function select(v: Task["status"]) {
    status = v;
    expanded = false;
  }
</script>

<div class="space-y-0.5">
  <div class="text-sm font-medium">Status</div>
  <div class="relative w-full">
    <button
      class={`w-full flex items-center justify-between rounded px-3 h-10 text-left text-sm text-white font-medium ${CLASS_BY_STATUS[status]}`}
      on:click={toggle}
    >
      {label}
      <RiArrowDownSLine size="20px" />
    </button>
    <div
      class:hidden={!expanded}
      class="absolute w-full z-10 bg-white border rounded shadow"
    >
      <div class="flex flex-col w-full">
        <button
          class="w-full text-left p-2 hover:bg-gray-100"
          on:click={() => select("TODO")}
        >
          <div
            class="inline-flex items-center bg-blue-500 rounded-sm h-6 px-2 text-white text-sm font-medium"
          >
            TODO
          </div>
        </button>
        <button
          class="w-full text-left p-2 hover:bg-gray-100"
          on:click={() => select("IN_PROGRESS")}
        >
          <div
            class="inline-flex items-center bg-amber-500 rounded-sm h-6 px-2 text-white text-sm font-medium"
          >
            IN PROGRESS
          </div>
        </button>
        <button
          class="w-full text-left p-2 hover:bg-gray-100"
          on:click={() => select("DONE")}
        >
          <div
            class="inline-flex items-center bg-green-600 rounded-sm h-6 px-2 text-white text-sm font-medium"
          >
            DONE
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
