<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project, Task } from "../lib/types";
  import { RiCalendarLine, RiUser3Line } from "svelte-remixicon";

  export let project: Project;
  export let task: Task;
  export let onTaskSelected: (task: Task) => void;

  const LABEL_BY_STATUS = {
    TODO: "TODO",
    IN_PROGRESS: "IN PROGRESS",
    DONE: "DONE",
  };
  const CLASS_BY_STATUS = {
    TODO: "bg-blue-500 text-white",
    IN_PROGRESS: "bg-amber-500 text-white",
    DONE: "bg-green-500 text-white",
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
      {task.description?.text}
    </div>
  </div>

  <div class="flex justify-end">
    <div
      class={`${
        CLASS_BY_STATUS[task.status]
      } px-2 rounded-sm font-medium text-sm py-1 inline-block`}
    >
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
