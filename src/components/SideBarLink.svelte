<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { FolderIcon } from "@rgossiaux/svelte-heroicons/outline";
  export let label: string;
  export let href: string;
</script>

<a
  {href}
  use:link
  use:active={{
    className:
      "text-brand-500 font-medium bg-brand-50 border-r border-brand-500 border-r-2",
  }}
  class="flex items-center gap-1 px-4 py-4 hover:bg-gray-100"
>
  <div>{label}</div>
</a>
