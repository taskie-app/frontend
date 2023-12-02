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

    <div class="flex items-center justify-between">
      <div class="bg-brand-100 px-2 py-1 rounded-md">
        <p class="text-sm font-medium text-brand-600"></p>
      </div>
      <div class="w-10 h-10 rounded-full bg-gray-100"></div>
    </div>
  </div>
</a>
