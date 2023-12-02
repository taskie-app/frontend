<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { clickOutside } from "../actions/clickOutside";
  export let visible: boolean;
  function hide() {
    visible = false;
  }
</script>

{#if visible}
  <div
    class={`absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center`}
  >
    <div
      class="bg-white w-full max-w-2xl p-6 rounded"
      use:clickOutside
      on:click_outside={hide}
    >
      <slot />
    </div>
  </div>
{/if}
