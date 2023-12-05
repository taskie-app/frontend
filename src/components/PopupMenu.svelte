<script>
  import { clickOutside } from "../actions/clickOutside";

  let showContent = false;
  function toggleShowContent() {
    showContent = !showContent;
  }
  function show() {
    showContent = true;
  }
  function hide() {
    showContent = false;
  }
</script>

<div class="relative">
  <div role="button" on:click={toggleShowContent}>
    <slot name="trigger" />
  </div>
  <div
    use:clickOutside
    on:click_outside={hide}
    class:hidden={!showContent}
    class="absolute z-20 right-0 border w-48 bg-white rounded-md mt-2 shadow-sm"
  >
    <slot name="content" />
  </div>
</div>
