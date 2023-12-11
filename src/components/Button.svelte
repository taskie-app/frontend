<script lang="ts">
  const PRESETS = {
    primary: "bg-brand-500 hover:bg-brand-400 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-800",
    danger: "bg-red-500 hover:bg-red-400 text-white",
  };
  export let label: string;
  export let preset: "primary" | "secondary" | "danger";
  export let rounded = false;
  export let disabled = false;
  export let fluid = false;
  const baseClass =
    "flex items-center justify-center px-4 h-8 rounded-sm text-sm font-medium transition-all duration-100";
  $: borderClass = rounded ? "rounded-full" : "";
  $: buttonClass = `${baseClass} ${PRESETS[preset]} ${borderClass} ${
    disabled ? "opacity-50" : ""
  } ${fluid && "w-full"}`;
  export let onClick: () => void;
</script>

<button class={buttonClass} on:click={onClick} {disabled}>{label}</button>
