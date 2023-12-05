<script lang="ts">
  const PRESETS = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white",
    secondary: "bg-white hover:bg-gray-50 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  export let label: string;
  export let preset: "primary" | "secondary" | "danger";
  export let rounded = false;
  export let disabled = false;
  $: console.log({ disabled });
  const baseClass =
    "inline-flex items-center justify-center border border-black/20 text-sm font-medium px-4 h-8 rounded";
  $: borderClass = rounded ? "rounded-full" : "";
  $: buttonClass = `${baseClass} ${PRESETS[preset]} ${borderClass} ${
    disabled ? "opacity-50" : ""
  }`;
  export let onClick: () => void;
</script>

<button class={buttonClass} on:click={onClick} {disabled}>{label}</button>
