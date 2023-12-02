<script lang="ts">
  export let label: string;
  export let preset: "primary" | "secondary" = "secondary";
  export let rounded = false;
  const baseClass =
    "inline-flex items-center justify-center border border-black/20 text-sm font-medium px-4 h-8 rounded";
  $: bgClass =
    preset == "primary"
      ? "bg-brand-500 hover:bg-brand-600"
      : "bg-white hover:bg-gray-50";
  $: textClass = preset == "primary" ? "text-white" : "text-gray-800";
  $: borderClass = rounded ? "rounded-full" : "";
  $: buttonClass = `${baseClass} ${bgClass} ${textClass} ${borderClass}`;
  export let onClick: () => void;
</script>

<button class={buttonClass} on:click={onClick}>{label}</button>
