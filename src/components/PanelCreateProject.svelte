<script lang="ts">
  import { api } from "../lib/api";
  import { projects } from "../stores/projectStore";
  import Button from "./Button.svelte";
  import { clickOutside } from "../actions/clickOutside";
  import { RiCloseCircleLine, RiUploadCloudLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";

  let visible: boolean;
  let name = "";
  let description = "";

  function hide() {
    visible = false;
  }
  export function show() {
    visible = true;
  }
  async function submit() {
    const { project, error } = await api.createProject(name, description);
    if (error) {
      console.error(error);
    } else {
      $projects = [...$projects, project];
      hide();
    }
  }
</script>

{#if visible}
  <div
    class="absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center"
  >
    <div
      class="bg-white w-full max-w-lg rounded overflow-hidden"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="flex items-center justify-between p-4">
        <div class="font-medium">Create project</div>
        <button on:click={hide}><RiCloseCircleLine size="20px" /></button>
      </div>
      <div class="flex flex-col p-4 gap-4 bg-slate-50">
        <button class="">
          <div
            class="flex gap-1 items-center justify-center h-48 text-gray-600 bg-white border border-gray-100 rounded"
          >
            <RiUploadCloudLine size="20px" />
            <div>Upload cover image</div>
          </div>
        </button>
        <TextField
          label="Name"
          bind:value={name}
          placeholder="Enter project name"
        />
        <TextField
          label="Description"
          bind:value={description}
          placeholder="Enter project description"
        />
        <TextField
          label="Invite members"
          bind:value={name}
          placeholder="Enter email addresses"
        />
      </div>
      <div class="flex items-center justify-between p-4">
        <Button preset="secondary" label="Cancel" onClick={hide} />
        <Button preset="primary" label="Create" onClick={submit} />
      </div>
    </div>
  </div>
{/if}
