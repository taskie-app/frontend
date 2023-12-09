<script lang="ts">
  import type { Project } from "../lib/types";
  import { RiDeleteBinLine, RiAddCircleLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";
  import Button from "./Button.svelte";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";

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
    // TODO: update db
    const { error } = await api.deleteProject(newProject._id);
    if (error) return alert(error);
  }
</script>

<div
  class="px-8 py-4 rounded bg-white rounded border overflow-hidden w-full max-w-3xl mx-auto space-y-8"
>
  <div class="space-y-4">
    <div class="text-xl font-medium">Information</div>
    <TextField
      label="Name"
      bind:value={newProject.name}
      placeholder="Enter project name"
      error=""
    />
    <TextField
      label="Description"
      bind:value={newProject.description}
      placeholder="Enter project name"
      error=""
    />
  </div>

  <div class="space-y-4">
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
    {#each [1, 2, 3] as item}
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-gray-100"></div>
        <div class="font-medium flex-1">Nguyễn Hải Đức</div>
        <div class="text-gray-400">nguyenhaiduc06@gmail.com</div>
        <div class="bg-gray-100 text-gray-400 px-2 rounded">Manager</div>
        <RiDeleteBinLine size="16px" />
      </div>
    {/each}
  </div>

  <div class="flex items-center justify-end gap-4 mt-4">
    <Button preset="secondary" label="Save" onClick={updateProject} />
    <Button preset="danger" label="Delete" onClick={deleteProject} />
  </div>
</div>
