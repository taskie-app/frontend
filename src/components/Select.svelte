<script lang="ts">
  export let label: string;
  export let value: string;
  export let options: Array<{ value: string; text: string }> = [];
  $: text = options.find((option) => option.value == value)?.text;
  export let width: number | undefined = undefined;
  $: widthClass = `$w-[${width}px]` ?? "w-full";

  let showOptions = false;
  function toggle() {
    showOptions = !showOptions;
  }
  function select(v: string) {
    value = v;
    showOptions = false;
  }
</script>

<div class="space-y-0.5">
  <div class="text-sm text-gray-400">{label}</div>
  <div class={`relative ${widthClass}`}>
    <button
      class="w-full bg-gray-50 border rounded px-4 h-10 hover:bg-gray-100 text-left"
      on:click={toggle}
    >
      {text}
    </button>
    <div
      class:hidden={!showOptions}
      class="absolute top-0 right-1 -translate-x-full w-full z-10 p-1 bg-white border rounded"
    >
      <div class="flex flex-col w-full">
        {#each options as option}
          <button
            class="w-full px-4 h-9 rounded-sm hover:bg-gray-100 text-left"
            on:click={() => select(option.value)}>{option.text}</button
          >
        {/each}
      </div>
    </div>
  </div>
</div>
