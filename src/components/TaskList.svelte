<script lang="ts">
  import type { Project, Task } from "../lib/types";
  import TaskListItem from "./TaskListItem.svelte";

  export let project: Project;
  export let tasks: Task[] = [];
</script>

<div class="grid grid-cols-5">
  <div class="border-b py-2 font-medium">Name</div>
  <div class="border-b py-2 font-medium">Description</div>
  <div class="border-b py-2 font-medium">Status</div>
  <div class="border-b py-2 font-medium">Due date</div>
  <div class="border-b py-2 font-medium">Assignee</div>
  {#each tasks as task}
    <TaskListItem {project} {task} />
  {/each}
</div>
