<script lang="ts">
  import { link } from "svelte-spa-router";

  export let params: { id?: number } = {};
</script>

<div class="p-4">
  <div>This is the details of project {params.id}</div>
  <div>Members go here</div>
  <div>Tasks go here</div>
  <a href="/tasks/1" use:link>Task 1</a>
</div>
