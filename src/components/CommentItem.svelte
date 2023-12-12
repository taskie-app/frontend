<script lang="ts">
  import type { Comment } from "../lib/types";
  import Button from "../components/Button.svelte";

  export let comment: Comment;
  export let onCommentUpdated: (updatedCommnet: Comment) => void;
  export let onCommentDeleted: (deletedComment: Comment) => void;

  let editing = false;

  // TODO: check if current user == commnet.author
  let editable = true;
  let deletable = true;

  function updateComment() {}

  function deleteComment() {}
</script>

<div class="flex py-1 gap-2">
  <!-- <img src="" alt="" srcset="" class="w-8 h-8 rounded-full" /> -->
  <div class="w-8 h-8 rounded-full bg-gray-100"></div>
  <div class="w-full">
    {#if editing}
      <input
        type="text"
        class="w-full rounded-sm border-gray-300"
        bind:value={comment.content}
      />
      <div class="flex gap-1 mt-2">
        <Button preset="primary" label="Save" onClick={updateComment} />
        <Button
          preset="secondary"
          label="Cancel"
          onClick={() => (editing = false)}
        />
      </div>
    {:else}
      <div class="font-semibold">{comment.author.username}</div>
      <div>
        {comment.content}
      </div>
      <div class="flex gap-2">
        {#if editable}
          <button
            class="text-gray-400 hover:underline"
            on:click={() => (editing = true)}>Edit</button
          >
        {/if}
        {#if deletable}
          <button class="text-gray-400 hover:underline" on:click={deleteComment}
            >Delete</button
          >
        {/if}
      </div>
    {/if}
  </div>
</div>
