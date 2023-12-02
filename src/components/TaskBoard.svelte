<script lang="ts">
  import TaskItem from "./TaskItem.svelte";
  import type { Project, Task } from "../lib/types";
  import { dropzone } from "../lib/dnd";
  import TaskBoardItem from "./TaskBoardItem.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
  export let onTaskDropped: (
    taskId: Task["_id"],
    status: Task["status"]
  ) => void;

  $: todoTasks = tasks.filter((task) => task.status == "TODO");
  $: inProgressTasks = tasks.filter((task) => task.status == "IN_PROGRESS");
  $: doneTasks = tasks.filter((task) => task.status == "DONE");
</script>

<div class="flex-1 flex gap-4 overflow-y-hidden">
  <div
    class="flex flex-col w-[320px] gap-4"
    use:dropzone={{
      on_dropzone(taskId) {
        onTaskDropped(taskId, "TODO");
      },
    }}
  >
    <div class="flex items-center gap-2 py-2 border-b-2 border-b-gray-500">
      <h2 class="text-xl font-medium">Todo</h2>
      <div class="border rounded-full px-3">
        <p class="text-sm">{todoTasks.length}</p>
      </div>
    </div>
    {#each todoTasks as task}
      <TaskBoardItem {task} {project} />
    {/each}
  </div>
  <div
    class="flex flex-col w-[320px] gap-4"
    use:dropzone={{
      on_dropzone(taskId) {
        onTaskDropped(taskId, "IN_PROGRESS");
      },
    }}
  >
    <div class="flex items-center gap-2 py-2 border-b-2 border-b-blue-500">
      <h2 class="text-xl font-medium">In progress</h2>
      <div class="border rounded-full px-3">
        <p class="text-sm">{inProgressTasks.length}</p>
      </div>
    </div>
    {#each inProgressTasks as task}
      <TaskBoardItem {task} {project} />
    {/each}
  </div>
  <div
    class="flex flex-col w-[320px] gap-4"
    use:dropzone={{
      on_dropzone(taskId) {
        onTaskDropped(taskId, "DONE");
      },
    }}
  >
    <div class="flex items-center gap-2 py-2 border-b-2 border-b-green-500">
      <h2 class="text-xl font-medium">Done</h2>
      <div class="border rounded-full px-3">
        <p class="text-sm">{doneTasks.length}</p>
      </div>
    </div>
    {#each doneTasks as task}
      <TaskBoardItem {task} {project} />
    {/each}
  </div>
</div>
