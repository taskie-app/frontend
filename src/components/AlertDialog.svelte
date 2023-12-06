<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { clickOutside } from "../actions/clickOutside";
  import Button from "./Button.svelte";
  export let visible: boolean;
  export let title: string;
  export let description: string;
  export let confirmLabel: string;
  export let onConfirm: () => void;
  function hide() {
    visible = false;
  }
</script>

{#if visible}
  <div
    class={`absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center`}
  >
    <div
      class="bg-white w-full max-w-sm p-4 rounded"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="text-xl font-medium">{title}</div>
      <div class="text-gray-400">{description}</div>
      <div class="mt-4 text-right">
        <Button preset="secondary" onClick={hide} label="Cancel" />
        <Button preset="danger" onClick={onConfirm} label={confirmLabel} />
      </div>
    </div>
  </div>
{/if}
