<script lang="ts">
  export let label: string;
</script>

<button
  class="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-emerald-500 hover:bg-emerald-500/80 text-white border-emerald-500 focus-visible:outline-emerald-600 shadow-sm text-xs px-2.5 py-1"
  ><span class="truncate">{label}</span></button
>
