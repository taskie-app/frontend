<script lang="ts">
  import { link } from "svelte-spa-router";
  import { draggable } from "../lib/dnd";
  import type { Project, Task } from "../lib/types";

  export let project: Project;
  export let task: Task;
</script>

<a href={`/tasks/${project._id}/${task._id}`} use:link use:draggable={task._id}>
  <div class="border rounded bg-white p-4 space-y-8">
    <div>
      <h1 class="text-xl font-medium">{task.name}</h1>
      <p class="text-gray-400">{task.description}</p>
    </div>

    <div
      class="inline-flex items-center text-sm ml-auto px-3 h-6 rounded-full text-gray-600 bg-gray-100"
    >
      {task.assignedTo?.username ?? "Unassigned"}
    </div>
  </div>
</a>
