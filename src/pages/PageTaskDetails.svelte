<script lang="ts">
  import { link } from "svelte-spa-router";
  import Select from "../components/Select.svelte";
  import { api } from "../lib/api";
  import type { Task } from "../lib/types";
  import { projects } from "../stores/projectStore";
  import SelectAssignee from "../components/SelectAssignee";
  import { fade } from "svelte/transition";

  export let params: { projectId: string; taskId: string };
  $: project = $projects.find((project) => project._id == params.projectId);
  $: taskId = params.taskId;
  $: taskId && fetchTask();

  let task: Task;
  let oldName: string;
  let oldDescription: string;
  let enableSaveButton = false;
  $: oldName = oldName ?? task?.name;
  $: oldDescription = oldDescription ?? task?.description;
  $: status = task?.status;
  $: status, updateTask();
  $: enableSaveButton =
    task?.name != oldName || task?.description != oldDescription;

  async function fetchTask() {
    if (!taskId) return;
    const { task: fetchedTask, error } = await api.getTask(taskId);
    if (error) {
      console.error(error);
    } else {
      task = fetchedTask;
    }
  }

  async function updateTask() {
    console.log("update task");
    if (!task) return;
    oldName = task.name;
    oldDescription = task.description;
    const { error } = await api.updateTask(task._id, task);
    if (error) {
      console.error(error);
    }
  }
</script>

{#if !task || !project}
  <!-- <div>Loading</div> -->
{:else}
  <div class="min-h-full flex-1 flex flex-col" in:fade>
    <div class="flex-1 flex">
      <div class="flex-1 p-8">
        <div class="space-y-4 border-b pb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
              <a
                href={`/projects/${project?._id}`}
                use:link
                class="text-gray-400 hover:text-gray-600">{project?.name}</a
              >
              /
              <button class="flex items-center gap-1">
                <div>{task._id}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-link"
                  ><path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  /><path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  /></svg
                >
              </button>
            </div>
            <button
              class={`${enableSaveButton ? "" : "text-gray-400"}`}
              disabled={!enableSaveButton}
              on:click={updateTask}>Save</button
            >
          </div>
          <div class="space-y-2">
            <h1
              class="text-3xl font-medium outline-none"
              contenteditable="plaintext-only"
              bind:textContent={task.name}
            />
            <h2
              class="text-xl text-gray-400 outline-none"
              class:text-gray-200={!task.description}
              contenteditable="plaintext-only"
              bind:textContent={task.description}
            />
          </div>
        </div>
        <div class="py-8 space-y-4">
          <h3 class="text-xl font-medium">Comments</h3>
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-100"></div>
            <div
              class="border rounded-md flex-1 flex flex-col gap-2 p-4 shadow-sm"
            >
              <p class="text-gray-400">Leave a comment...</p>
              <button
                class="border rounded-md shadow-sm px-4 py-2 text-sm font-medium self-end"
                >Comment</button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="w-[400px] border-l p-8 space-y-4">
        <div class="flex flex-col gap-4">
          <Select
            label="Status"
            bind:value={task.status}
            options={[
              {
                value: "TODO",
                text: "Todo",
              },
              {
                value: "IN_PROGRESS",
                text: "In progress",
              },
            ]}
          />
          <SelectAssignee
            users={[{ username: "ducnh" }, { username: "john" }]}
          />
        </div>
      </div>
    </div>
  </div>
{/if}
