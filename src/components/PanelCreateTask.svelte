<script lang="ts">
  import OverlayPanel from "./OverlayPanel.svelte";
  import { api } from "../lib/api";
  import type { Project, Task } from "../lib/types";
  import Button from "./Button.svelte";
  import { preprocess } from "svelte/compiler";
  export let visible: boolean;
  export let project: Project;
  export let onTaskCreated: (task: Task) => void;
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
      console.error(error);
    } else {
      onTaskCreated(task);
      hide();
    }
  }
</script>

<OverlayPanel bind:visible>
  <div class="flex flex-col gap-4">
    <h4 class="font-medium">Create task</h4>
    <input
      type="text"
      placeholder="Task name"
      bind:value={name}
      class="boder border-black/20 rounded px-4 h-10 outline-none focus:outline-none focus:ring-0"
    />
    <input
      type="text"
      placeholder="Description"
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
