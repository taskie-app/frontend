<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  export let label: string;
  export let href: string;
</script>

<a
  {href}
  use:link
  use:active={{ className: "font-medium bg-gray-100" }}
  class="px-3 py-2 rounded-md hover:bg-gray-100">{label}</a
>
