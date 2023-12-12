<script lang="ts">
  export let label: string;
  export let value: string;
  export let placeholder: string;
  export let error: string;
</script>

<div class="space-y-1 w-full">
  <div class="text-sm font-medium">{label}</div>
  <input
    class:border-red-500={error}
    class="rounded text-md px-4 py-2 border-gray-300 w-full bg-gray-100 focus:bg-white"
    type="text"
    bind:value
    {placeholder}
  />
  {#if error}
    <div class="text-xs text-red-500">{error}</div>
  {/if}
</div>
