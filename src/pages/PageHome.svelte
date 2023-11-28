<script>
  import ProjectItem from "../components/ProjectItem.svelte";
  import { onMount } from "svelte";
  import { authenticated } from "../stores/auth";
  import { replace } from "svelte-spa-router";
  onMount(() => {
    if (!$authenticated) {
      replace("/sign-in");
      return;
    }
    replace("/projects");
  });
</script>
