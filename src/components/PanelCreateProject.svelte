<script lang="ts">
  import { api } from "../lib/api";
  import Button from "./Button.svelte";
  import { clickOutside } from "../actions/clickOutside";
  import { RiDeleteBinLine, RiCloseLine, RiLinksLine } from "svelte-remixicon";
  import TextEditor from "./TextEditor.svelte";
  import type { Project, Task, Comment } from "../lib/types";
  import TextEditedContent from "./TextEditedContent.svelte";
  import CommentItem from "./CommentItem.svelte";
  import SelectStatus from "./Select/SelectStatus.svelte";
  import SelectAssignee from "./Select/SelectAssignee.svelte";
  import SelectDate from "./Select/SelectDate.svelte";
  import SelectPriority from "./Select/SelectPriority.svelte";
  import TextField from "./TextField.svelte";
  import { projects } from "../stores/projectStore";

  export let project: Project;
  export let tasks: Task[];

  let visible: boolean;
  let name = "";
  let description = "";

  export function hide() {
    visible = false;
  }

  export function show() {
    visible = true;
  }

  async function createProject() {
    // update tasks in db
    const { project, error } = await api.createProject(name, description);
    if (error) return alert(error);
    // update states
    $projects = [...$projects, project];
    hide();
  }
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

{#if visible}
  <div
    class="absolute top-0 left-0 w-full max-w-screen h-screen py-8 flex bg-black/50 items-center justify-center overflow-y-scroll"
  >
    <div class="h-8"></div>
    <div
      class="bg-white w-full max-w-lg rounded"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="flex items-center justify-between p-4">
        <div class="text-lg font-medium">Create task</div>
        <div class="flex gap-1">
          <button
            class="w-10 h-10 rounded hover:bg-gray-200 flex items-center justify-center"
            on:click={hide}><RiCloseLine size="20px" /></button
          >
        </div>
      </div>

      <div class="px-4 space-y-4">
        <TextField
          label="Name"
          bind:value={name}
          placeholder="Enter project name"
          error={""}
        />

        <div class="space-y-1">
          <div class="text-sm font-medium">Description</div>
          <TextEditor bind:htmlContent={description} />
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 p-4">
        <Button preset="primary" label="Create" onClick={createProject} />
        <Button preset="secondary" label="Cancel" onClick={hide} />
      </div>
    </div>
  </div>
{/if}
