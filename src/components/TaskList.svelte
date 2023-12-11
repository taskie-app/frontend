<script lang="ts">
  import type { Project, Task, User } from "../lib/types";
  import {
    RiAddCircleLine,
    RiArrowUpDownLine,
    RiFilterLine,
    RiUser3Line,
    RiCheckboxMultipleLine,
  } from "svelte-remixicon";
  import TaskListItem from "./TaskListItem.svelte";
  import { link } from "svelte-spa-router";
  import Button from "./Button.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
  export let onCreateTaskClicked: () => void;
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
  let nameFilter: string;
  let priorityFilter: string;
  let assigneeFilter: User | null;
  $: assigneeOptions = project.members.map((m) => m.username);
  $: filteredTasks = tasks.filter((t) => {
    const satisfiedName =
      !nameFilter || t.name.toLowerCase().includes(nameFilter.toLowerCase());
    const satisfiedPriority = !priorityFilter || t.priority == priorityFilter;
    const satisfiedAssignee =
      !assigneeFilter || t.assignedTo?._id == assigneeFilter._id;
    return satisfiedName && satisfiedAssignee && satisfiedPriority;
  });
  $: filteredAndSortedTasks = filteredTasks.sort(sortFunctions[sort]);
</script>

<div class="text-gray-400">
  <a href="/projects" use:link> Projects </a>
  /
  <a href="/projects" use:link> {project.name} </a>
  /
  <span>Tasks</span>
</div>
<div class="text-3xl font-semibold mt-4 mb-4">Tasks</div>
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
    <div class="text-sm font-medium text-gray-400 ml-1">PRIORITY</div>
    <button class="text-sm font-medium flex items-center">
      <select
        bind:value={priorityFilter}
        class="border-none bg-transparent outline-none focus:ring-0"
      >
        <option value="">All</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </button>
  </div>

  <div class="flex-1"></div>

  <Button preset="primary" label="Add task" onClick={onCreateTaskClicked} />
</div>
<div class="bg-white rounded border mt-4">
  {#each filteredAndSortedTasks as task}
    <TaskListItem {project} {task} {onTaskSelected} />
  {/each}
</div>
