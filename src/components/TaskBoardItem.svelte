<script lang="ts">
  import { link } from "svelte-spa-router";
  import { draggable } from "../lib/dnd";
  import type { Project, Task } from "../lib/types";
  import { RiCalendarLine, RiUser3Line } from "svelte-remixicon";

  export let project: Project;
  export let task: Task;
  export let onTaskSelected: (task: Task) => void;
</script>

<button
  use:draggable={task._id}
  on:click={() => onTaskSelected(task)}
  class="text-left"
>
  <div class=" rounded-sm shadow bg-white p-4 space-y-8 overflow-hidden">
    <div>
      <h1 class="text-xl font-medium">{task.name}</h1>
      <p class="text-gray-400">{task.description.text}</p>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center text-gray-400 space-x-1">
        <RiUser3Line size="16px" />
        <div>
          {task.assignedTo?.username ?? "Unassigned"}
        </div>
      </div>

      <div class="flex items-center text-gray-400 space-x-1">
        <RiCalendarLine size="16px" />
        <div>
          {task.dueDate ?? "No due date"}
        </div>
      </div>
    </div>
  </div>
</button>
