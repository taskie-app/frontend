<script lang="ts">
  import MemberItem from "../components/MemberItem.svelte";
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import PanelCreateTask from "../components/PanelCreateTask.svelte";
  import TaskBoard from "../components/TaskBoard.svelte";
  import { projects } from "../stores/projectStore";
  import type { Task } from "../lib/types";
  import { api } from "../lib/api";
  import TaskList from "../components/TaskList.svelte";
  import Button from "../components/Button.svelte";
  import SearchIcon from "../icons/SearchIcon.svelte";
  import { link } from "svelte-spa-router";
  import LinkIcon from "../icons/LinkIcon.svelte";

  export let params: { id: string };

  let tasks: Task[] = [];
  let tasksDisplayMode: "BOARD" | "LIST" = "BOARD";
  let taskNameSearch = "";
  let inviteMemberPanelVisible = false;
  let createTaskPanelVisible = false;
  $: filterdTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(taskNameSearch.trim().toLowerCase())
  );

  // on params change, update the project
  $: project = $projects.filter((project) => project._id == params.id)[0];
  // on project change, fetchTasks
  $: project && fetchTasks();

  async function fetchTasks() {
    const { tasks: fetchedTasks, error } = await api.getProjectTasks(
      project._id
    );
    if (error) {
      console.error(error);
    } else {
      tasks = fetchedTasks;
    }
  }

  function addTask(task: Task) {
    tasks = [...tasks, task];
  }

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

  function changeTasksDisplayMode(newMode: "BOARD" | "LIST") {
    tasksDisplayMode = newMode;
  }
</script>

<div class="flex flex-col">
  <div class="flex-1 p-8 space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <a
          href={`/projects/`}
          use:link
          class="text-gray-400 hover:text-gray-600">Projects</a
        >
        /
        <button class="flex items-center gap-1">
          <div>{project?.name}</div>
          <LinkIcon />
        </button>
      </div>
    </div>
    <!-- Name and description -->
    <div class="space-y-2">
      <h1 class="text-3xl font-medium">{project?.name}</h1>
      <h1 class="text-xl text-gray-400">{project?.description}</h1>
    </div>

    <!-- Tools row -->
    <div class="flex items-center gap-2">
      <!-- Manage members -->
      <div class="flex items-center">
        <div class="flex -space-x-2">
          <MemberItem />
          <MemberItem />
          <MemberItem />
        </div>
        <Button
          onClick={() => (inviteMemberPanelVisible = true)}
          preset="secondary"
          label="Invite"
          rounded
        />
      </div>

      <div class="flex-1"></div>

      <!-- Manage tasks -->
      <div
        class="flex items-center bg-white border border-black/20 rounded h-8 px-1"
      >
        <button
          class:bg-gray-100={tasksDisplayMode == "LIST"}
          class:text-gray-500={tasksDisplayMode != "LIST"}
          class="px-4 h-6 rounded text-sm font-medium"
          on:click={() => changeTasksDisplayMode("LIST")}>List</button
        >
        <button
          class:bg-gray-100={tasksDisplayMode == "BOARD"}
          class:text-gray-500={tasksDisplayMode != "BOARD"}
          class="px-4 h-6 rounded text-sm font-medium"
          on:click={() => changeTasksDisplayMode("BOARD")}>Board</button
        >
      </div>
      <div
        class="border border-black/20 rounded overflow-hidden flex items-center px-2 h-8 gap-1"
      >
        <SearchIcon />
        <input
          type="text"
          class="border-none outline-none focus:ring-0 px-0 text-sm"
          placeholder="Search for task..."
          bind:value={taskNameSearch}
        />
      </div>
      <Button
        preset="primary"
        label="New task"
        onClick={() => {
          createTaskPanelVisible = true;
        }}
      />
    </div>

    {#if tasksDisplayMode == "BOARD"}
      <TaskBoard
        {project}
        tasks={filterdTasks}
        onTaskDropped={changeTaskStatus}
      />
    {:else}
      <!-- <TaskList {project} {tasks} /> -->
    {/if}
  </div>
</div>

<PanelInviteMember bind:visible={inviteMemberPanelVisible} {project} />
<PanelCreateTask
  bind:visible={createTaskPanelVisible}
  {project}
  onTaskCreated={addTask}
/>
