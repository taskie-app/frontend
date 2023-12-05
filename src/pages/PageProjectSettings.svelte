<script lang="ts">
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import type { Project, Task, User } from "../lib/types";
  import { api } from "../lib/api";
  import Button from "../components/Button.svelte";
  import { link } from "svelte-spa-router";
  import { fade } from "svelte/transition";

  export let params: { id: string };

  let project: Project;
  $: params, fetchProject();
  let tasks: Task[] = [];
  $: project, project?._id && fetchTasks();
  let inviteMemberPanelVisible = false;

  async function fetchProject() {
    const { id } = params;
    if (!id) return;
    const { project: fetchedProject, error } = await api.getProjectDetails(id);
    if (error) return console.error(error);
    project = fetchedProject;
  }

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

  function addMembers(members: User[]) {
    const newProject = {
      ...project,
      members: [...project.members, ...members],
    };
    project = newProject;
    updateProject();
  }

  function removeMember(member: User) {
    const newProject = {
      ...project,
      members: project.members.filter((m) => m._id != member._id),
    };
    project = newProject;
    updateProject();
  }

  function updateProject() {
    api
      .updateProject(project._id, project)
      .then()
      .catch((error) => console.error(error));
  }

  function deleteProject() {
    api
      .deleteProject(project._id)
      .then()
      .catch((error) => console.error(error));
  }
</script>

{#if project}
  <div class="flex flex-col" in:fade>
    <div class="flex-1 p-8 space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <a
            href={`/projects/`}
            use:link
            class="text-gray-400 hover:text-gray-600">Projects</a
          >
          /
          <a
            href={`/projects/${project._id}`}
            use:link
            class="text-gray-400 hover:text-gray-600">{project.name}</a
          >
          /
          <button class="flex items-center gap-1">
            <div>Settings</div>
          </button>
        </div>
      </div>
      <!-- Name and description -->
      <div class="space-y-2">
        <h1 class="text-3xl font-medium">{project?.name}</h1>
        <h1 class="text-xl text-gray-400">{project?.description}</h1>
      </div>

      <div class="space-y-1">
        <div class="text-2xl">Manager</div>
        <div
          class="inline-flex items-center w-96 bg-gray-50 border rounded px-4 h-10 hover:bg-gray-100 text-left"
        >
          {project.manager.username}
        </div>
      </div>
      <div class="space-y-1">
        <div class="text-2xl">Members</div>
        <div
          class="inline-flex flex-col items-center w-96 bg-gray-50 border rounded px-4 h-10 hover:bg-gray-100 text-left"
        >
          {#each project.members as member}
            <div class="">{member.username}</div>
          {/each}
        </div>
      </div>

      <Button preset="danger" label="Delete project" onClick={deleteProject} />
    </div>
  </div>

  <PanelInviteMember
    bind:visible={inviteMemberPanelVisible}
    {project}
    onMembersSelected={addMembers}
  />
{/if}
