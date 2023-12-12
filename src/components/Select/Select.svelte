<script lang="ts">
  import { RiArrowDownSLine } from "svelte-remixicon";

  export let value: any;
  export let options: any;
  export let label: string;

  $: optionLabel = options.find((o) => o.value == value)?.label;

  let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
  function select(v: any) {
    value = v;
    expanded = false;
  }
</script>

<div class="space-y-1">
  <div class="text-sm font-medium">{label}</div>
  <div class="relative w-full">
    <button
      class="w-full flex items-center justify-between rounded px-3 h-10 text-left bg-gray-200"
      on:click={toggle}
    >
      {optionLabel}
      <RiArrowDownSLine size="20px" />
    </button>
    <div
      class:hidden={!expanded}
      class="absolute w-full z-10 bg-white border rounded shadow"
    >
      <div class="flex flex-col w-full">
        {#each options as option}
          <button
            class="w-full text-left hover:bg-gray-100 inline-flex gap-1 items-center rounded-sm h-10 px-3"
            on:click={() => select(option.value)}
          >
            <div>{option.label}</div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
