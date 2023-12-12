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
  import ProjectMembers from "../components/ProjectMembers.svelte";
  import ProjectSideBar from "../components/ProjectSideBar.svelte";
  import { RiAddLine } from "svelte-remixicon";
  import { ProjectTab } from "../lib/constants";
  import PageLayout from "../components/PageLayout.svelte";

  export let params: { id: string };

  let panelCreateTask: any;
  let panelInviteMember: any;
  let panelTaskDetails: any;

  // on params change, get the project
  $: project = $projects.filter((project) => project._id == params.id)[0];
  // on project change, fetchTasks
  $: project && fetchTasks();

  let tasks: Task[] = [];
  let tab: ProjectTab = ProjectTab.TASKS;

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
  <PageLayout>
    <SideBar />
    <ProjectSideBar {project} bind:currentTab={tab} />
    <div class="flex-1">
      <!-- <MenuBar title={`Projects / ${project.name}`} /> -->
      <div class="px-8 pt-8">
        <!-- <div class="text-3xl font-medium">{project.name}</div>
        <div class="text-lg text-gray-400">{project.description}</div>

        <div class="flex items-center gap-1 mt-4">
          <div class="flex items-center -space-x-2">
            {#each project.members as member}
              <div
                class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"
              ></div>
            {/each}
          </div>
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-brand-500"
            on:click={() => panelInviteMember?.show()}
          >
            <RiAddLine size="20px" class="text-brand-500" />
          </button>
        </div>
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
        </div> -->

        {#if tab == ProjectTab.TASKS}
          <TaskList
            {project}
            bind:tasks
            onTaskSelected={viewTaskDetails}
            onCreateTaskClicked={() => panelCreateTask?.show()}
          />
        {/if}

        {#if tab == ProjectTab.KANBAN}
          <TaskBoard
            {project}
            bind:tasks
            onTaskSelected={viewTaskDetails}
            onCreateTaskClicked={() => panelCreateTask?.show()}
          />
        {/if}

        {#if tab == ProjectTab.SETTINGS}
          <ProjectSettings bind:project />
        {/if}
      </div>
    </div>
  </PageLayout>

  <PanelCreateTask bind:this={panelCreateTask} bind:tasks {project} />
  <PanelTaskDetails bind:this={panelTaskDetails} bind:tasks {project} />
{/if}
