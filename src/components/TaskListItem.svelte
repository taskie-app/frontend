<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { Project, Task } from "../lib/types";

  export let project: Project;
  export let task: Task;

  const LABEL_BY_STATUS = {
    TODO: "Todo",
    IN_PROGRESS: "In progress",
    DONE: "Done",
  };
  const CLASS_BY_STATUS = {
    TODO: "bg-gray-200",
    IN_PROGRESS: "bg-blue-200",
    DONE: "bg-green-200",
  };
</script>

<a href={`/my-tasks`} class="contents" use:link>
  <div class="whitespace-nowrap py-2 text-gray-700">{task.name}</div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {task.description}
  </div>
  <div class={`whitespace-nowrap py-1.5`}>
    <div
      class={`px-2 py-0.5 rounded inline-block ${CLASS_BY_STATUS[task.status]}`}
    >
      {LABEL_BY_STATUS[task.status]}
    </div>
  </div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {task.dueDate ?? "No due date"}
  </div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {task.assignedTo?.username ?? "Unassigned"}
  </div>
</a>
