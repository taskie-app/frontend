<script lang="ts">
  import type { Comment } from "../lib/types";
  import Button from "../components/Button.svelte";
  import UserAvatar from "./UserAvatar.svelte";
  import { api } from "../lib/api";

  export let comment: Comment;
  $: newComment = comment;
  export let onCommentUpdated: (updatedComment: Comment) => void;
  export let onCommentDeleted: (deletedComment: Comment) => void;

  let editing = false;

  // TODO: check if current user == commnet.author
  let editable = true;
  let deletable = true;

  async function updateComment() {
    const { error } = await api.updateComment(newComment);
    if (error) return alert(error);
    comment = newComment;
    editing = false;
    onCommentUpdated(newComment);
  }

  async function deleteComment() {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    const { error } = await api.deletComment(comment);
    if (error) return alert(error);
    onCommentDeleted(comment);
  }
</script>

<div class="flex py-2 gap-2">
  <!-- <img src="" alt="" srcset="" class="w-8 h-8 rounded-full" /> -->
  <UserAvatar u={comment.author} />
  <div class="w-full">
    {#if editing}
      <input
        type="text"
        class="w-full rounded-sm border-gray-300"
        bind:value={newComment.content}
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
      <div class="font-semibold leading-none">{comment.author.username}</div>
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
