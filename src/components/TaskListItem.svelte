<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project, Task } from "../lib/types";
  import { RiCalendarLine, RiUser3Line, RiArrowUpLine } from "svelte-remixicon";

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
  const ICON_CLASS_BY_PRIORITY = {
    HIGH: "text-red-500",
    MEDIUM: "text-amber-500",
    LOW: "text-green-500",
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
  class="flex items-center px-4 py-4 gap-2 hover:bg-gray-100"
  on:click={() => onTaskSelected(task)}
  role="button"
>
  <div class="col-span-2 flex items-center gap-2">
    <!-- <input
      type="checkbox"
      value=""
      class="w-5 h-5 rounded"
      checked={task.status == "DONE"}
    /> -->
    <div class="w-64 font-medium">
      {task.name}
    </div>
  </div>

  <div class="flex-1 text-ellipsis text-gray-400 line-clamp-1">
    {task.description?.text}
  </div>

  <div class="w-24 flex justify-end">
    <div
      class={`flex items-center bg-gray-200 px-2 rounded-sm font-medium text-sm  py-1`}
    >
      <RiArrowUpLine
        size="16px"
        class={ICON_CLASS_BY_PRIORITY[task.priority]}
      />
      {task.priority}
    </div>
  </div>

  <div class="w-32 flex justify-end">
    <div
      class={`${
        CLASS_BY_STATUS[task.status]
      } px-2 rounded-sm font-medium text-sm py-1 inline-block`}
    >
      {LABEL_BY_STATUS[task.status]}
    </div>
  </div>

  <div class="w-32 flex items-center justify-end text-gray-400 space-x-1">
    <RiUser3Line size="16px" />
    <div>
      {task.assignedTo?.username ?? "Unassigned"}
    </div>
  </div>

  <div class="w-32 flex items-center justify-end text-gray-400 space-x-1">
    <RiCalendarLine size="16px" />
    <div>
      {task.dueDate ?? "No due date"}
    </div>
  </div>
</div>
