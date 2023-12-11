<script lang="ts">
  import type { Project } from "../lib/types";
  import { RiDeleteBinLine, RiAddCircleLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";
  import Button from "./Button.svelte";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";
  import { link, replace } from "svelte-spa-router";
  import TextEditor from "./TextEditor.svelte";

  export let project: Project;
  export let onInviteMemberClicked: () => void;
  $: newProject = project;

  async function updateProject() {
    // update state
    project = newProject;
    $projects = $projects.map((p) =>
      p._id == newProject._id ? newProject : p
    );
    // TODO: update db
    const { error } = await api.updateProject(newProject._id, newProject);
    if (error) return alert(error);
  }

  async function deleteProject() {
    // update state
    $projects = $projects.filter((p) => p._id != newProject._id);
    replace("/projects");
    // TODO: update db
    const { error } = await api.deleteProject(newProject._id);
    if (error) return alert(error);
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  <div class="text-gray-400">
    <a href="/projects" use:link> Projects </a>
    /
    <a href="/projects" use:link> {project.name} </a>
    /
    <span>Kanban board</span>
  </div>
  <div class="text-3xl font-semibold mt-4 mb-4">Settings</div>
  <TextField
    label="Name"
    bind:value={newProject.name}
    placeholder="Enter project name"
    error=""
  />
  <div class="font-medium mt-4 mb-1">Description</div>
  <div>
    <TextEditor />
  </div>

  <div class="mt-4">
    <Button preset="primary" label="Save changes" onClick={updateProject} />
  </div>

  <div class="text-lg font-medium mt-4 mb-1">Danger</div>
  <div
    class="flex items-center justify-between border border-red-500 rounded px-4 py-2"
  >
    <div>
      <div class="font-medium">Delete this project</div>
      <div>
        Once you delete a project, there is no going back. Please be certain
      </div>
    </div>
    <Button preset="danger" label="Delete" onClick={deleteProject} />
  </div>

  <!-- <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-xl font-medium">Members</div>
      <button
        class="flex items-center gap-1 text-brand-500"
        on:click={onInviteMemberClicked}
      >
        <RiAddCircleLine size="18px" />
        <div class="">Invite</div>
      </button>
    </div>
    <div class="flex items-center gap-4">
      <div class="w-8 h-8 rounded-full bg-gray-100"></div>
      <div class="font-medium flex-1">{project.manager.username}</div>
      <div class="text-gray-400">{project.manager.username}</div>
      <div class="bg-gray-100 text-gray-400 px-2 rounded">Manager</div>
      <button>
        <RiDeleteBinLine size="16px" class="text-transparent" />
      </button>
    </div>
    {#each project.members as member}
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-gray-100"></div>
        <div class="font-medium flex-1">{member.username}</div>
        <div class="text-gray-400">{member.username}</div>
        <div class="bg-gray-100 text-gray-400 px-2 rounded">Member</div>
        <button>
          <RiDeleteBinLine size="16px" />
        </button>
      </div>
    {/each}
  </div> -->

  <div class="flex items-center justify-end gap-4 mt-4">
    <Button preset="secondary" label="Save" onClick={updateProject} />
  </div>
</div>
