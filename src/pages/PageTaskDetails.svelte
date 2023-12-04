<script lang="ts">
  import { link } from "svelte-spa-router";
  import Select from "../components/Select.svelte";
  import { api } from "../lib/api";
  import type { Task } from "../lib/types";
  import { projects } from "../stores/projectStore";
  import { fade } from "svelte/transition";
  import SelectDate from "../components/Select/SelectDate.svelte";
  import SelectAssignee from "../components/Select/SelectAssignee.svelte";
  import LinkIcon from "../icons/LinkIcon.svelte";
  import Button from "../components/Button.svelte";

  export let params: { projectId: string; taskId: string };
  $: project = $projects.find((project) => project._id == params.projectId);
  $: taskId = params.taskId;
  $: taskId && fetchTask();

  let task: Task;
  $: console.log(task);
  let oldName: string;
  let oldDescription: string;
  let enableSaveButton = false;
  $: oldName = oldName ?? task?.name;
  $: oldDescription = oldDescription ?? task?.description;

  $: dueDate = task?.dueDate;
  $: status = task?.status;
  $: assignee = task?.assignedTo?._id;
  // $: dueDate, updateTask();
  $: status, updateTask();
  // $: assignee, updateTask();

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
    // update oldName and oldDescription for future comparing
    oldName = task.name;
    oldDescription = task.description;

    const { error } = await api.updateTask(task._id, task);
    if (error) {
      console.error(error);
    }
  }

  async function deleteTask() {
    alert("Delete task");
  }
</script>

{#if task && project}
  <div class="min-h-full flex-1 flex flex-col" in:fade>
    <div class="flex-1 flex">
      <div class="flex-1 p-8">
        <div class="space-y-4 border-b pb-8">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <a
                href={`/projects/${project?._id}`}
                use:link
                class="text-gray-400 hover:text-gray-600">{project?.name}</a
              >
              /
              <button class="flex items-center gap-1">
                <div>{task._id}</div>
                <LinkIcon />
              </button>
            </div>
            <div class="flex-1"></div>
            <Button
              preset="secondary"
              label="Save"
              onClick={updateTask}
              disabled={!enableSaveButton}
            />
            <Button preset="danger" label="Delete" onClick={deleteTask} />
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
            bind:assignee={task.assignedTo}
            users={[...project?.members, project?.manager]}
          />
          <SelectDate bind:value={task.dueDate} label="Due date" />
        </div>
      </div>
    </div>
  </div>
{/if}
