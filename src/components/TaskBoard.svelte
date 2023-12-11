<script lang="ts">
  import type { Project, Task } from "../lib/types";
  import { dropzone } from "../lib/dnd";
  import { api } from "../lib/api";
  import TaskBoardItem from "./TaskBoardItem.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
  export let onTaskSelected: (task: Task) => void;

  $: todoTasks = tasks.filter((task) => task.status == "TODO");
  $: inProgressTasks = tasks.filter((task) => task.status == "IN_PROGRESS");
  $: doneTasks = tasks.filter((task) => task.status == "DONE");

  async function changeTaskStatus(
    taskId: Task["_id"],
    newStatus: Task["status"]
  ) {
    // change the tasks state for instant feedback
    tasks = tasks.map((task) =>
      task._id == taskId ? { ...task, status: newStatus } : task
    );

    // @ts-ignore
    const { error } = await api.updateTask(taskId, { status: newStatus });
    if (error) {
      console.error(error);
    }
  }
</script>

<div class="grid grid-cols-3 gap-4 overflow-y-hidden">
  <div
    class="flex flex-col gap-4 bg-white border overflow-hidden p-4 rounded dropzone"
    use:dropzone={{
      on_dropzone(taskId) {
        changeTaskStatus(taskId, "TODO");
      },
    }}
  >
    <div class="flex items-center justify-between gap-2 py-2">
      <div
        class="text-lg font-medium bg-sky-100 text-sky-500 px-4 py-0.5 rounded"
      >
        Todo
      </div>
      <div class="border rounded-full px-5">
        <p class="text-lg">{todoTasks.length}</p>
      </div>
    </div>
    {#each todoTasks as task}
      <TaskBoardItem {task} {project} {onTaskSelected} />
    {/each}
  </div>
  <div
    class="flex flex-col gap-4 bg-white border overflow-hidden p-4 rounded dropzone"
    use:dropzone={{
      on_dropzone(taskId) {
        changeTaskStatus(taskId, "IN_PROGRESS");
      },
    }}
  >
    <div class="flex items-center justify-between gap-2 py-2">
      <div
        class="text-lg font-medium bg-yellow-100 text-yellow-500 px-4 py-0.5 rounded"
      >
        In progress
      </div>
      <div class="border rounded-full px-5">
        <p class="text-lg">{inProgressTasks.length}</p>
      </div>
    </div>
    {#each inProgressTasks as task}
      <TaskBoardItem {task} {project} {onTaskSelected} />
    {/each}
  </div>
  <div
    class="flex flex-col gap-4 bg-white border overflow-hidden p-4 rounded dropzone"
    use:dropzone={{
      on_dropzone(taskId) {
        changeTaskStatus(taskId, "DONE");
      },
    }}
  >
    <div class="flex items-center justify-between gap-2 py-2">
      <div
        class="text-lg font-medium bg-green-100 text-green-500 px-4 py-0.5 rounded"
      >
        Done
      </div>
      <div class="border rounded-full px-5">
        <p class="text-lg">{doneTasks.length}</p>
      </div>
    </div>
    {#each doneTasks as task}
      <TaskBoardItem {task} {project} {onTaskSelected} />
    {/each}
  </div>
</div>

<style>
  .dropzone {
  }

  .dropzone:global(.droppable) {
    background-color: #f5f5f5;
  }
</style>
