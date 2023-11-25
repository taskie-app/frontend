<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import SideBar from "./components/SideBar.svelte";
</script>

<div class="h-screen flex flex-col text-gray-800">
  <div class="flex-1 flex">
    <SideBar />
    <div class="flex-1">
      <Router {routes} />
    </div>
  </div>
</div>
