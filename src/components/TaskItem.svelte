<script lang="ts">
  import { link } from "svelte-spa-router";

  export let id: string;
  export let name: string;
  export let description: string;
  export let key: string;
  export let memberId: string;
</script>

<a href={`/tasks/${id}`} use:link>
  <div class="border rounded-lg shadow-sm bg-white p-4 space-y-8">
    <div>
      <h1 class="text-lg font-medium">{name}</h1>
      <p class="text-gray-800/50">{description}</p>
    </div>

    <div class="flex items-center justify-between">
      <div class="bg-brand-100 px-2 py-1 rounded-md">
        <p class="text-sm font-medium text-brand-600">{key}</p>
      </div>
      <div class="w-10 h-10 rounded-full bg-gray-100"></div>
    </div>
  </div>
</a>
