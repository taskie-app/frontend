<script lang="ts">
  export let label: string;
  export let value: string;
  export let width: number | undefined = undefined;
  $: widthClass = `$w-[${width}px]` ?? "w-full";
</script>

<div class="space-y-0.5">
  <div class="text-sm text-gray-400">{label}</div>
  <div class={`relative ${widthClass}`}>
    <input
      class="w-full bg-gray-50 border border-black/10 rounded px-4 h-10 hover:bg-gray-100 text-left"
      type="date"
      bind:value
    />
  </div>
</div>
