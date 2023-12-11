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

  export let project: Project;
  export let tasks: Task[];

  let visible: boolean;
  let task: Task;
  let comments: Comment[] = [];
  $: task, fetchComments();
  let commentContent = "";

  let editorContent: string;
  let showDescriptionEditor = false;

  async function addComment() {
    const { comment, error } = await api.createComment(
      task._id,
      commentContent
    );
    if (error) return alert(error);
    comments = [...comments, comment];
  }

  async function fetchComments() {
    if (!task || !task._id) return;
    const { comments: fetchedComments, error } = await api.getComments(
      task._id
    );
    if (error) return alert(error);
    comments = fetchedComments;
  }

  function saveDescription() {
    task.description = editorContent;
    showDescriptionEditor = false;
  }

  export function hide() {
    visible = false;
  }

  export function show(t: Task) {
    task = t;
    visible = true;
  }

  async function updateTask() {
    // update state
    tasks = tasks.map((t) =>
      t._id == task._id
        ? {
            ...task,
            assignedTo: project.members.find((m) => m._id == task.assignedTo),
          }
        : t
    );

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

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

{#if visible && task}
  <div
    class="absolute top-0 left-0 w-full max-w-screen h-screen py-8 flex bg-black/50 items-center justify-center overflow-y-scroll"
  >
    <div class="h-8"></div>
    <div
      class="bg-white w-full max-w-3xl rounded overflow-hidden"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="flex items-center justify-between p-4">
        <button
          class="px-4 h-10 rounded hover:bg-gray-200 flex items-center justify-center text-sm font-medium gap-2"
          on:click={hide}
        >
          <RiLinksLine size="16px" />
          Copy link
        </button>
        <div class="flex gap-1">
          <button
            class="w-10 h-10 rounded text-red-500 hover:bg-gray-200 flex items-center justify-center"
            on:click={hide}><RiDeleteBinLine size="20px" /></button
          >
          <button
            class="w-10 h-10 rounded hover:bg-gray-200 flex items-center justify-center"
            on:click={hide}><RiCloseLine size="20px" /></button
          >
        </div>
      </div>

      <div class="grid grid-cols-3">
        <div class="col-span-2">
          <div
            contenteditable="plaintext-only"
            class="mx-4 px-2 py-2 text-3xl font-semibold rounded-sm border-none hover:bg-gray-200 focus:bg-white focus:outline cursor-text"
            bind:textContent={task.name}
          />

          <div class="mx-4 px-2 mt-4">
            <div class="font-medium mb-2">Description</div>
            <div
              class:hidden={showDescriptionEditor}
              class="w-full"
              on:click={() => (showDescriptionEditor = true)}
            >
              <TextEditedContent content={task.description} />
            </div>

            <div class:hidden={!showDescriptionEditor}>
              <TextEditor bind:content={editorContent} />

              <div class="flex gap-1 mt-2">
                <Button
                  preset="primary"
                  label="Save"
                  onClick={saveDescription}
                />
                <Button
                  preset="secondary"
                  label="Cancel"
                  onClick={() => (showDescriptionEditor = false)}
                />
              </div>
            </div>
          </div>

          <div class="mx-4 px-2 my-4">
            <div class="font-medium mb-2">Comments</div>
            <div class="flex py-1 gap-2">
              <!-- <img src="" alt="" srcset="" class="w-8 h-8 rounded-full" /> -->
              <div class="w-8 h-8 rounded-full bg-gray-100"></div>
              <div class="w-full">
                <input
                  type="text"
                  class="w-full rounded-sm border-gray-300"
                  bind:value={commentContent}
                  placeholder="Add a comment..."
                />
                <div class="flex gap-1 mt-2">
                  <Button preset="primary" label="Add" onClick={addComment} />
                </div>
              </div>
            </div>
            {#each comments as comment}
              <CommentItem {comment} />
            {/each}
          </div>
        </div>

        <div class="space-y-4 px-4">
          <SelectStatus bind:status={task.status} />

          <SelectAssignee
            bind:assignee={task.assignedTo}
            members={project.members}
          />

          <SelectDate bind:date={task.dueDate} />

          <SelectPriority priority="HIGH" />
        </div>
      </div>
    </div>
  </div>
{/if}
