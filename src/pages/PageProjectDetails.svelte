<script lang="ts">
  import type { Task } from "../lib/types";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";
  import SideBar from "../components/SideBar.svelte";
  import MenuBar from "../components/MenuBar.svelte";
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import PanelCreateTask from "../components/PanelCreateTask.svelte";
  import PanelTaskDetails from "../components/PanelTaskDetails.svelte";
  import TabButton from "../components/TabButton.svelte";
  import TaskList from "../components/TaskList.svelte";
  import TaskBoard from "../components/TaskBoard.svelte";
  import ProjectSettings from "../components/ProjectSettings.svelte";

  enum Tab {
    TASKS,
    KANBAN,
    SETTINGS,
  }

  export let params: { id: string };

  let panelCreateTask: any;
  let panelInviteMember: any;
  let panelTaskDetails: any;

  // on params change, get the project
  $: project = $projects.filter((project) => project._id == params.id)[0];
  // on project change, fetchTasks
  $: project && fetchTasks();

  let tasks: Task[] = [];
  let tab: Tab = Tab.TASKS;

  $: filterdTasks = tasks.filter((t) => true);

  async function fetchTasks() {
    const { tasks: fetchedTasks, error } = await api.getProjectTasks(
      project._id
    );
    if (error) return console.error(error);
    tasks = fetchedTasks;
  }

  function viewTaskDetails(t: Task) {
    panelTaskDetails?.show(t);
  }
</script>

{#if project}
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <MenuBar title={`Projects / ${project.name}`} />
      <div class="px-8 pt-8">
        <div class="text-3xl font-medium">{project.name}</div>
        <div class="text-lg text-gray-400">{project.description}</div>
        <div class="flex items-center justify-between my-4">
          <div class="flex gap-4">
            <TabButton bind:currentTab={tab} value={Tab.TASKS} label="TASKS" />
            <TabButton
              bind:currentTab={tab}
              value={Tab.KANBAN}
              label="KANBAN"
            />
            <TabButton
              bind:currentTab={tab}
              value={Tab.SETTINGS}
              label="SETTINGS"
            />
          </div>
          <div class="flex items-center -space-x-2">
            {#each [1, 2, 3] as member}
              <div
                class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"
              ></div>
            {/each}
          </div>
        </div>

        {#if tab == Tab.TASKS}
          <TaskList
            {project}
            bind:tasks
            onTaskSelected={viewTaskDetails}
            onCreateTaskClick={() => panelCreateTask?.show()}
          />
        {/if}

        {#if tab == Tab.KANBAN}
          <TaskBoard {project} bind:tasks onTaskSelected={viewTaskDetails} />
        {/if}

        {#if tab == Tab.SETTINGS}
          <ProjectSettings
            bind:project
            onInviteMemberClicked={() => panelInviteMember?.show()}
          />
        {/if}
      </div>
    </div>
  </div>

  <PanelInviteMember
    bind:this={panelInviteMember}
    bind:members={project.members}
    {project}
  />
  <PanelCreateTask bind:this={panelCreateTask} bind:tasks {project} />
  <PanelTaskDetails bind:this={panelTaskDetails} bind:tasks {project} />
{/if}
