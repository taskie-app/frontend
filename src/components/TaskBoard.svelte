<script lang="ts">
  import type { Project, Task, User } from "../lib/types";
  import { dropzone } from "../lib/dnd";
  import { api } from "../lib/api";
  import TaskBoardItem from "./TaskBoardItem.svelte";
  import { link } from "svelte-spa-router";
  import Button from "./Button.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
  export let onTaskSelected: (task: Task) => void;
  export let onCreateTaskClicked: () => void;

  let nameFilter: string = "";
  let assigneeFilter: User | null = null;

  $: filteredTasks = tasks.filter((t) => {
    const satisfiedName =
      !nameFilter || t.name.toLowerCase().includes(nameFilter.toLowerCase());
    const satisfiedAssignee =
      !assigneeFilter || t.assignedTo?._id == assigneeFilter._id;
    return satisfiedName && satisfiedAssignee;
  });

  $: todoTasks = filteredTasks.filter((task) => task.status == "TODO");
  $: inProgressTasks = filteredTasks.filter(
    (task) => task.status == "IN_PROGRESS"
  );
  $: doneTasks = filteredTasks.filter((task) => task.status == "DONE");

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

<div class="text-gray-400">
  <a href="/projects" use:link> Projects </a>
  /
  <a href="/projects" use:link> {project.name} </a>
  /
  <span>Kanban board</span>
</div>
<div class="text-3xl font-semibold mt-4 mb-4">Kanban board</div>
<div class="flex items-center gap-4">
  <input
    type="text"
    class="border-gray-300 rounded"
    placeholder="Search by task name..."
    bind:value={nameFilter}
  />

  <div class="flex items-center gap-0.5">
    {#each project.members as member}
      <button
        class:border-brand-500={assigneeFilter?._id == member._id}
        class="w-8 h-8 rounded-full bg-gray-200 border-2 transition-all duration-100 hover:scale-110"
        on:click={() => {
          if (!assigneeFilter || assigneeFilter._id != member._id) {
            assigneeFilter = member;
            return;
          }
          assigneeFilter = null;
        }}
      ></button>
    {/each}
  </div>

  <div class="flex-1"></div>

  <Button preset="primary" label="Add task" onClick={onCreateTaskClicked} />
</div>
<div class="grid grid-cols-3 gap-4 overflow-y-hidden mt-4">
  <div
    class="flex flex-col gap-4 bg-gray-100 overflow-hidden p-4 rounded dropzone"
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
    class="flex flex-col gap-4 bg-gray-100 overflow-hidden p-4 rounded dropzone"
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
    class="flex flex-col gap-4 bg-gray-100 overflow-hidden p-4 rounded dropzone"
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
