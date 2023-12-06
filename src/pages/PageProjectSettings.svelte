<script lang="ts">
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import type { Project, Task, User } from "../lib/types";
  import { api } from "../lib/api";
  import Button from "../components/Button.svelte";
  import { link, replace } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import TrashIcon from "../icons/TrashIcon.svelte";
  import AlertDialog from "../components/AlertDialog.svelte";
  import { fetchProjects, projects } from "../stores/projectStore";

  export let params: { id: string };

  let project: Project;
  $: params, fetchProject();

  let inviteMemberPanelVisible = false;
  let deleteProjectDialogVisible = false;

  async function fetchProject() {
    const { id } = params;
    if (!id) return;
    const { project: fetchedProject, error } = await api.getProjectDetails(id);
    if (error) return console.error(error);
    project = fetchedProject;
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

  async function updateProject() {
    const { project: updatedProject, error } = await api.updateProject(
      project._id,
      project
    );
    if (error) {
      console.error(error);
    } else {
      fetchProjects();
    }
  }

  function promptDelete() {
    deleteProjectDialogVisible = true;
  }

  async function deleteProject() {
    const { error } = await api.deleteProject(project._id);
    if (error) {
      console.error(error);
    } else {
      replace("/projects");
      fetchProjects();
    }
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
        <h1
          class="text-3xl font-medium"
          contenteditable="plaintext-only"
          bind:textContent={project.name}
        ></h1>
        <h1
          class="text-xl text-gray-400"
          contenteditable="plaintext-only"
          bind:textContent={project.description}
        ></h1>
      </div>

      <div class="space-y-2">
        <div class="text-2xl">Manager</div>
        <div
          class="inline-flex items-center w-96 bg-gray-50 border rounded px-4 h-10 hover:bg-gray-100 text-left"
        >
          {project.manager.username}
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center justify-between w-96">
          <div class="text-2xl">Members</div>
          <Button
            preset="primary"
            label="Invite"
            onClick={() => (inviteMemberPanelVisible = true)}
          />
        </div>
        {#each project.members as member}
          <div
            class="flex items-center justify-between w-96 h-10 bg-gray-50 border rounded px-4 hover:bg-gray-100 text-left"
          >
            {member.username}
            <button class="text-red-500" on:click={() => removeMember(member)}>
              <TrashIcon />
            </button>
          </div>
        {/each}
      </div>
      <div class="pt-4">
        <Button preset="secondary" label="Save" onClick={updateProject} />
        <Button preset="danger" label="Delete" onClick={promptDelete} />
      </div>
    </div>
  </div>

  <PanelInviteMember
    bind:visible={inviteMemberPanelVisible}
    {project}
    onMembersSelected={addMembers}
  />

  <AlertDialog
    bind:visible={deleteProjectDialogVisible}
    title="Delete project"
    description="Are you sure you want to delete this project?"
    confirmLabel="Delete"
    onConfirm={deleteProject}
  />
{/if}
