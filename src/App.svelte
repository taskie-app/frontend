<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import SideBar from "./components/SideBar.svelte";
</script>

<div class="flex">
  <div class="flex flex-col w-64 h-screen bg-gray-100 sticky top-0 left-0">
    <SideBar />
  </div>
  <div class="flex-1">
    <Router {routes} />
  </div>
</div>
