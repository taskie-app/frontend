<script>
  import Router, { replace } from "svelte-spa-router";
  import { routes } from "./routes";
  import SideBar from "./components/SideBar.svelte";
  import { onMount } from "svelte";
  import { initializing, authenticated, user } from "./stores/authStore";
  import { api } from "./lib/api";
  import { fetchProjects } from "./stores/projectStore";
  import MenuBar from "./components/MenuBar.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  onMount(() => {
    initAuthStore();
    fetchProjects();
  });

  async function initAuthStore() {
    const {
      authenticated: authed,
      user: u,
      error,
    } = await api.getAuthenticated();
    $authenticated = authed;
    $user = u;
    $initializing = false;
  }

  function handleRouteFailure() {
    replace("/");
  }
</script>

{#if $initializing}
  <div>Loading</div>
{:else}
  <div class="min-h-screen max-w-full text-gray-800">
    <Router {routes} on:conditionsFailed={handleRouteFailure} />
  </div>
{/if}

<SvelteToast />
