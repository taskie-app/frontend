<script lang="ts">
  import MemberItem from "../components/MemberItem.svelte";
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import PanelCreateTask from "../components/PanelCreateTask.svelte";
  import TaskBoard from "../components/TaskBoard.svelte";
  import { projects } from "../stores/projectStore";
  import type { Task } from "../lib/types";
  import { api } from "../lib/api";
  import TaskList from "../components/TaskList.svelte";

  export let params: { id: string };

  let tasks: Task[] = [];
  let tasksDisplayMode: "BOARD" | "LIST" = "BOARD";
  let inviteMemberPanelVisible = false;
  let createTaskPanelVisible = false;

  // on params change, update the project
  $: project = $projects.filter((project) => project._id == params.id)[0];
  // on project change, fetchTasks
  $: project && fetchTasks();

  async function fetchTasks() {
    const { tasks: fetchedTasks, error } = await api.getProjectTasks(
      project._id
    );
    if (error) {
      alert(error);
    } else {
      tasks = fetchedTasks;
    }
  }

  async function changeTaskStatus(
    taskId: Task["_id"],
    newStatus: Task["status"]
  ) {
    // change the tasks state for instant feedback
    tasks = tasks.map((task) =>
      task._id == taskId ? { ...task, status: newStatus } : task
    );

    // update status to db
    // if fail, undo the tasks state change
  }

  function changeTasksDisplayMode(newMode: "BOARD" | "LIST") {
    tasksDisplayMode = newMode;
  }
</script>

<div class="flex flex-col">
  <div class="flex-1 p-8 space-y-4">
    <div>
      <h1 class="text-3xl font-medium">{project?.name}</h1>
      <h1 class="text-xl text-gray-400">{project?.description}</h1>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex -space-x-2">
        <MemberItem />
        <MemberItem />
        <MemberItem />
      </div>
      <button
        class="px-3 h-8 flex items-center gap-1 text-sm font-medium rounded-full shadow-sm border border-gray-300 bg-white hover:bg-gray-50"
        on:click={() => (inviteMemberPanelVisible = true)}
      >
        Invite</button
      >
      <div class="flex-1"></div>
      <button on:click={() => changeTasksDisplayMode("LIST")}>List</button>
      <button on:click={() => changeTasksDisplayMode("BOARD")}>Board</button>
      <button>Settings</button>
      <button on:click={() => (createTaskPanelVisible = true)}>New task</button>
    </div>

    {#if tasksDisplayMode == "BOARD"}
      <TaskBoard {project} {tasks} onTaskDropped={changeTaskStatus} />
    {:else}
      <TaskList {project} {tasks} />
    {/if}
  </div>
</div>

<PanelInviteMember bind:visible={inviteMemberPanelVisible} {project} />
<PanelCreateTask bind:visible={createTaskPanelVisible} {project} />
