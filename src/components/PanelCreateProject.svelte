<script lang="ts">
  import OverlayPanel from "./OverlayPanel.svelte";
  import { api } from "../lib/api";
  import { projects } from "../stores/projectStore";
  export let visible: boolean;
  let name = "";
  let description = "";
  function hide() {
    visible = false;
  }
  async function submit() {
    const {
      data: { project },
      error,
    } = await api.createProject(name, description);
    if (error) {
      alert(error);
    } else {
      $projects.push(project);
    }
  }
</script>

<OverlayPanel bind:visible>
  <form on:submit|preventDefault={submit}>
    <input
      type="text"
      name=""
      id=""
      placeholder="Project name"
      bind:value={name}
    />
    <input
      type="text"
      name=""
      id=""
      placeholder="Description"
      bind:value={description}
    />
    <button on:click={hide}>Cancel</button>
    <button type="submit">Create</button>
  </form>
</OverlayPanel>
