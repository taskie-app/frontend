<script lang="ts">
  import type { Project, Task } from "../lib/types";
  import {
    RiAddCircleLine,
    RiArrowUpDownLine,
    RiFilterLine,
    RiUser3Line,
    RiCheckboxMultipleLine,
  } from "svelte-remixicon";
  import TaskListItem from "./TaskListItem.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
  export let onCreateTaskClick: () => void;
  export let onTaskSelected: (task: Task) => void;

  const sortFunctions = {
    name: (t1: Task, t2: Task) => (t1.name > t2.name ? 1 : -1),
    "-name": (t1: Task, t2: Task) => (t1.name > t2.name ? -1 : 1),
    date: (t1: Task, t2: Task) => {
      if (t1.dueDate && t2.dueDate) return t1.dueDate > t2.dueDate ? 1 : -1;
      if (!t1.dueDate && !t2.dueDate) return 0;
      return t1.dueDate ? -1 : 1;
    },
    "-date": (t1: Task, t2: Task) => {
      if (t1.dueDate && t2.dueDate) return t1.dueDate > t2.dueDate ? -1 : 1;
      if (!t1.dueDate && !t2.dueDate) return 0;
      return t1.dueDate ? -1 : 1;
    },
  };

  let sort: keyof typeof sortFunctions;
  let statusFilter: string;
  let assigneeFilter: string;
  $: assigneeOptions = project.members.map((m) => m.username);
  $: filteredTasks = tasks.filter((t) => {
    const satisfiedStatus = !statusFilter || t.status == statusFilter;
    const satisfiedAssignee =
      !assigneeFilter || t.assignedTo?.username == assigneeFilter;
    return satisfiedAssignee && satisfiedStatus;
  });
  $: filteredAndSortedTasks = filteredTasks.sort(sortFunctions[sort]);
</script>

<div class="bg-white rounded border overflow-hidden">
  <div class="flex px-4 py-4 gap-4">
    <div class="flex items-center">
      <RiArrowUpDownLine class="text-gray-400" size="18px" />
      <div class="text-sm font-medium text-gray-400 ml-1">SORT</div>
      <button class="flex items-center">
        <select
          bind:value={sort}
          class="text-sm font-medium border-none bg-transparent outline-none focus:ring-0"
        >
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="date">Due date</option>
          <option value="-date">Due date</option>
        </select>
      </button>
    </div>

    <div class="flex items-center">
      <RiCheckboxMultipleLine class="text-gray-400" size="18px" />
      <div class="text-sm font-medium text-gray-400 ml-1">STATUS</div>
      <button class="text-sm font-medium flex items-center">
        <select
          bind:value={statusFilter}
          class="border-none bg-transparent outline-none focus:ring-0"
        >
          <option value="">All</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
      </button>
    </div>

    <div class="flex items-center">
      <RiUser3Line class="text-gray-400" size="18px" />
      <div class="text-sm font-medium text-gray-400 ml-1">ASSIGNEE</div>
      <button class="text-sm font-medium flex items-center">
        <select
          bind:value={assigneeFilter}
          class="border-none bg-transparent outline-none focus:ring-0"
        >
          <option value="">All</option>
          {#each assigneeOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </button>
    </div>

    <div class="flex-1"></div>
    <button
      class="flex items-center gap-1 text-brand-500"
      on:click={onCreateTaskClick}
    >
      <RiAddCircleLine size="18px" />
      <div class="">New task</div>
    </button>
  </div>
  {#each filteredAndSortedTasks as task}
    <TaskListItem {project} {task} {onTaskSelected} />
  {/each}
</div>
