<script>
  import Router, { replace } from "svelte-spa-router";
  import { routes } from "./routes";
  import SideBar from "./components/SideBar.svelte";
  import { onMount } from "svelte";
  import { authenticated } from "./stores/auth";
  import { api } from "./lib/api";
  import { projects } from "./stores/projectStore";
  onMount(() => {
    $authenticated = !!sessionStorage.getItem("token");

    fetchProjects();
  });

  function handleRouteFailure() {
    replace("/");
  }

  async function fetchProjects() {
    const { data, error } = await api.getProjects();
    if (!error) {
      $projects = data.projects;
    }
  }
</script>

<div class="h-screen flex flex-col text-gray-800">
  <div class="flex-1 flex">
    {#if $authenticated}
      <SideBar />
    {/if}
    <div class="flex-1">
      <Router {routes} on:conditionsFailed={handleRouteFailure} />
    </div>
  </div>
</div>
