<script lang="ts">
  import OverlayPanel from "./OverlayPanel.svelte";
  import { api } from "../lib/api";
  import { projects } from "../stores/projectStore";
  import Button from "./Button.svelte";
  export let visible: boolean;
  let name = "";
  let description = "";
  function hide() {
    visible = false;
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

<OverlayPanel bind:visible>
  <div class="flex flex-col gap-4">
    <h4 class="font-medium">Create project</h4>
    <input
      type="text"
      placeholder="Project name"
      bind:value={name}
      class="boder border-black/20 rounded px-4 h-10 outline-none focus:outline-none focus:ring-0"
    />
    <input
      type="text"
      placeholder="Project description"
      bind:value={description}
      class="boder border-black/20 rounded px-4 h-10 outline-none focus:ring-0"
    />
    <div class="border-b"></div>
    <div class="ml-auto space-x-2">
      <Button preset="secondary" label="Cancel" onClick={hide} />
      <Button preset="primary" label="Create" onClick={submit} />
    </div>
  </div>
</OverlayPanel>
