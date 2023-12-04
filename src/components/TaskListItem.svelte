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
</script>

<a href={`/tasks/${project._id}/${task._id}`} class="contents" use:link>
  <div class="whitespace-nowrap py-2 text-gray-700">{task.name}</div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {task.description}
  </div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {LABEL_BY_STATUS[task.status]}
  </div>
  <div class="whitespace-nowrap py-2 text-gray-700">{task.dueDate}</div>
  <div class="whitespace-nowrap py-2 text-gray-700">
    {task.assignedTo?.username ?? "Unassigned"}
  </div>
</a>
