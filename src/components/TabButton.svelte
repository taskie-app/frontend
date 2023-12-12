<script lang="ts">
  export let currentTab: number;
  export let value: number;
  export let label: string;
  $: buttonClass =
    currentTab == value
      ? "font-medium text-brand-500 border-b-2 border-brand-500 inline-block"
      : "font-medium text-gray-400 border-b-2 border-transparent hover:text-gray-800 inline-block";
</script>

<button class={buttonClass} on:click={() => (currentTab = value)}>
  {label}
</button>
