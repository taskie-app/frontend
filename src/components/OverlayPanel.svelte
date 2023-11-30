<script lang="ts">
  import { clickOutside } from "../actions/clickOutside";
  export let visible: boolean;
  function hide() {
    visible = false;
  }
</script>

<div
  class={`absolute top-0 left-0 w-screen h-screen ${
    visible ? "flex" : "hidden"
  } bg-black/50 items-center justify-center`}
>
  <div
    class="bg-white w-full max-w-2xl"
    use:clickOutside
    on:click_outside={hide}
  >
    <slot />
  </div>
</div>
