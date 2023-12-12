<script lang="ts">
  import type { Project, User } from "../lib/types";
  import { RiDeleteBinLine, RiAddCircleLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";
  import Button from "./Button.svelte";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";
  import { link, replace } from "svelte-spa-router";
  import TextEditor from "./TextEditor.svelte";
  import Select from "./Select/Select.svelte";
  import MemberListItem from "./MemberListItem.svelte";
  import PanelInviteMember from "./PanelInviteMember.svelte";

  export let project: Project;
  export let panelInviteMember;
  let newProject = project;

  async function updateProject() {
    const { project: updatedProject, error } =
      await api.updateProject(newProject);
    if (error) return alert(error);
    project = updatedProject;
    $projects = $projects.map((p) =>
      p._id == updatedProject._id ? updatedProject : p
    );
  }

  async function deleteProject() {
    const { error } = await api.deleteProject(newProject._id);
    if (error) return alert(error);
    $projects = $projects.filter((p) => p._id != newProject._id);
    replace("/projects");
  }

  async function deleteMember(memberToDelete: User) {
    if (
      !confirm(
        `Are you sure you want to remove ${memberToDelete.username} from this project?`
      )
    )
      return;
    newProject.members = newProject.members.filter(
      (m) => m._id != memberToDelete._id
    );
    updateProject();
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  <div class="text-gray-400">
    <a class="hover:underline" href="/projects" use:link> Projects </a>
    /
    <a class="hover:underline" href={`/projects/${project._id}`} use:link>
      {project.name}
    </a>
    /
    <span>Settings</span>
  </div>
  <div class="text-3xl font-semibold mt-4 mb-4">Settings</div>

  <div class="text-lg font-medium mt-4 mb-1">Information</div>

  <TextField
    label="Name"
    bind:value={newProject.name}
    placeholder="Enter project name"
    error=""
  />

  <div class="text-sm font-medium mt-4 mb-1">Description</div>
  <div>
    <TextEditor
      bind:htmlContent={newProject.description}
      textContent=""
      defaultValue={newProject.description}
    />
  </div>

  <div class="mt-4">
    <Select
      value="Marketing"
      options={[
        { value: "Marketing", label: "Marketing" },
        { value: "Software development", label: "Software development" },
      ]}
      label="Category"
    />
  </div>

  <div class="mt-4">
    <Button preset="primary" label="Save changes" onClick={updateProject} />
  </div>

  <div class="space-y-4 mt-4">
    <div class="flex items-center justify-between">
      <div class="text-lg font-medium">Members</div>
      <button
        class="flex items-center gap-1 text-brand-500"
        on:click={() => panelInviteMember?.show()}
      >
        <RiAddCircleLine size="18px" />
        <div class="">Add</div>
      </button>
    </div>

    {#each newProject.members as member}
      <MemberListItem {member} onDeleteMemberClicked={deleteMember} />
    {/each}
  </div>

  <div class="text-lg font-medium mt-4 mb-1">Danger</div>
  <div
    class="flex items-center justify-between border border-red-500 rounded-sm px-4 py-2"
  >
    <div>
      <div class="font-medium">Delete this project</div>
      <div>
        Once you delete a project, there is no going back. Please be certain
      </div>
    </div>
    <Button preset="danger" label="Delete" onClick={deleteProject} />
  </div>
</div>

<PanelInviteMember bind:this={panelInviteMember} project={newProject} />
