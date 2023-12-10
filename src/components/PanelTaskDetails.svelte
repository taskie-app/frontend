<script lang="ts">
  import { api } from "../lib/api";
  import Button from "./Button.svelte";
  import { clickOutside } from "../actions/clickOutside";
  import { RiCloseCircleLine, RiUploadCloudLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";
  import type { Project, Task } from "../lib/types";

  export let project: Project;
  export let tasks: Task[];

  let visible: boolean;
  let task: Task;

  export function hide() {
    visible = false;
  }

  export function show(t: Task) {
    task = t;
    visible = true;
  }

  async function updateTask() {
    // update state
    tasks = tasks.map((t) => (t._id == task._id ? task : t));

    // update db
    const { error } = await api.updateTask(task._id, task);
    if (error) {
      // alert error
      return;
    }
    hide();
  }

  async function deleteTask() {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }
    // update state
    tasks = tasks.filter((t) => t._id != task._id);

    // update db
    const { error } = await api.deleteTask(task._id);

    if (error) return console.error(error);

    hide();
  }
</script>

{#if visible && task}
  <div
    class="absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center"
  >
    <div
      class="bg-white w-full max-w-3xl rounded overflow-hidden"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="flex items-center justify-between p-4">
        <div class="font-medium">Details</div>
        <button on:click={hide}><RiCloseCircleLine size="20px" /></button>
      </div>

      <div class="grid grid-cols-3 bg-slate-50 p-4 gap-4">
        <div class="col-span-2 flex flex-col gap-4 bg-slate-50">
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
            bind:value={task.name}
            placeholder="Enter project name"
            error={""}
          />
          <TextField
            label="Description"
            bind:value={task.description}
            placeholder="Enter project description"
            error={""}
          />
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-400">STATUS</div>
            <select
              bind:value={task.status}
              class="border rounded border-gray-300 w-full text-sm font-medium bg-white outline-none focus:ring-0"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-400">ASSIGNEE</div>
            <select
              value={task.assignedTo?.username ?? ""}
              class="border rounded border-gray-300 w-full text-sm font-medium bg-white outline-none focus:ring-0"
            >
              <option value="">No assignee</option>
              {#each project.members as member}
                <option value={member._id}>{member.username}</option>
              {/each}
            </select>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-400">DUE DATE</div>
            <input
              type="date"
              bind:value={task.dueDate}
              class="border rounded border-gray-300 w-full text-sm font-medium bg-white outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <Button preset="secondary" label="Save" onClick={updateTask} />
        <Button preset="danger" label="Delete" onClick={deleteTask} />
      </div>
    </div>
  </div>
{/if}
