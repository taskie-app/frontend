<script>
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
    class:hidden={!showContent}
    class="absolute right-0 border w-48 bg-white rounded-md mt-2 px-4 py-2 shadow-sm"
  >
    <slot name="content" />
  </div>
</div>
