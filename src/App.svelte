<script>
  import Router, { replace } from "svelte-spa-router";
  import { routes } from "./routes";
  import SideBar from "./components/SideBar.svelte";
  import { onMount } from "svelte";
  import { initializing, authenticated } from "./stores/authStore";
  import { api } from "./lib/api";
  import { fetchProjects } from "./stores/projectStore";
  import MenuBar from "./components/MenuBar.svelte";
  onMount(() => {
    initAuthStore();
    fetchProjects();
  });

  async function initAuthStore() {
    const { authenticated: authed, error } = await api.getAuthenticated();
    $authenticated = authed;
    $initializing = false;
  }

  function handleRouteFailure() {
    replace("/");
  }
</script>

{#if $initializing}
  <div>Loading</div>
{:else}
  <div class="h-screen flex flex-col text-gray-800">
    <div class="flex-1 flex">
      {#if $authenticated}
        <SideBar />
      {/if}
      <div class="flex-1">
        {#if $authenticated}
          <MenuBar />
        {/if}
        <Router {routes} on:conditionsFailed={handleRouteFailure} />
      </div>
    </div>
  </div>
{/if}
