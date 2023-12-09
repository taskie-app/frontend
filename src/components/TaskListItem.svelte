<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project, Task } from "../lib/types";
  import { RiCalendarLine, RiUser3Line } from "svelte-remixicon";

  export let project: Project;
  export let task: Task;
  export let onTaskSelected: (task: Task) => void;

  const LABEL_BY_STATUS = {
    TODO: "Todo",
    IN_PROGRESS: "In progress",
    DONE: "Done",
  };
  const CLASS_BY_STATUS = {
    TODO: "bg-sky-100 text-sky-500",
    IN_PROGRESS: "bg-yellow-100 text-yellow-500",
    DONE: "bg-green-100 text-green-500",
  };
</script>

<div class="grid grid-cols-8 items-center px-4 py-4 gap-2">
  <div class="col-span-2 flex items-center gap-2">
    <input
      type="checkbox"
      value=""
      class="w-5 h-5 rounded"
      checked={task.status == "DONE"}
    />
    <button on:click={() => onTaskSelected(task)}>
      <div class="font-medium">
        {task.name}
      </div>
    </button>
  </div>

  <div class="col-span-3">
    <div class="block overflow-hidden text-ellipsis max-w-full text-gray-400">
      {task.description}
    </div>
  </div>

  <div class="flex justify-end">
    <div class={`${CLASS_BY_STATUS[task.status]} px-2 rounded inline-block`}>
      {LABEL_BY_STATUS[task.status]}
    </div>
  </div>

  <div class="flex items-center justify-end text-gray-400 space-x-1">
    <RiUser3Line size="16px" />
    <div>
      {task.assignedTo?.username ?? "Unassigned"}
    </div>
  </div>

  <div class="flex items-center justify-end text-gray-400 space-x-1">
    <RiCalendarLine size="16px" />
    <div>
      {task.dueDate ?? "No due date"}
    </div>
  </div>
</div>
