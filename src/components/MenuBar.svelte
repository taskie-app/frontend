<script>
  import PopupMenu from "./PopupMenu.svelte";
</script>

<div
  class="h-16 flex items-center justify-end px-4 gap-2 border-b sticky top-0 left-0 bg-white"
>
  <PopupMenu>
    <div slot="trigger">
      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>

    <div slot="content">Hello</div>
  </PopupMenu>
  <PopupMenu>
    <div slot="trigger">
      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>

    <div slot="content">Hello</div>
  </PopupMenu>
</div>
