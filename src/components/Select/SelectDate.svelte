<script lang="ts">
  export let date: any;
</script>

<div class="space-y-0.5">
  <div class="text-sm font-medium">Due date</div>
  <div class="relative w-full">
    <input
      type="date"
      bind:value={date}
      class="w-full flex items-center justify-between rounded px-3 h-10 text-left text-sm font-medium bg-gray-200 border-none"
    />
  </div>
</div>
