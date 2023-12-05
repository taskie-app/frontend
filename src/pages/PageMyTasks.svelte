<script lang="ts">
  import type { Task, User } from "../lib/types";
  import { api } from "../lib/api";
  import TaskList from "../components/TaskList.svelte";
  import { onMount } from "svelte";

  let tasks: Task[] = [];
  $: console.log(tasks);

  onMount(() => {
    fetchTasks();
  });

  async function fetchTasks() {
    const { tasks: fetchedTasks, error } = await api.getUserTasks();
    if (error) {
      console.error(error);
    } else {
      tasks = fetchedTasks;
    }
  }
</script>

{#if tasks.length}
  <!-- content here -->

  <div class="flex flex-col">
    <div class="flex-1 p-8 space-y-4">
      <!-- Name and description -->
      <div class="space-y-2">
        <h1 class="text-3xl font-medium">My tasks</h1>
        <!-- <h1 class="text-xl text-gray-400">{project?.description}</h1> -->
      </div>
      <TaskList {tasks} />
    </div>
  </div>
{/if}
