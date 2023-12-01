<script lang="ts">
  import OverlayPanel from "./OverlayPanel.svelte";
  import { api } from "../lib/api";
  import type { Project } from "../lib/types";
  export let visible: boolean;
  export let project: Project;
  let name = "";
  let description = "";
  function hide() {
    visible = false;
  }
  async function submit() {
    const { task, error } = await api.createTask(
      project._id,
      name,
      description
    );
    if (error) {
      alert(error);
    } else {
      console.log(task);
    }
  }
</script>

<OverlayPanel bind:visible>
  <form on:submit|preventDefault={submit}>
    <input
      type="text"
      name=""
      id=""
      placeholder="Task name"
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
