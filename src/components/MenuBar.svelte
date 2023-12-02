<script>
  import { replace } from "svelte-spa-router";
  import { api } from "../lib/api";
  import { authenticated } from "../stores/authStore";
  import { deleteAllProjects } from "../stores/projectStore";
  import PopupMenu from "./PopupMenu.svelte";
  async function signOut() {
    const { error } = await api.signOut();
    if (error) {
      console.error(error);
    } else {
      $authenticated = false;
      replace("/");
    }
  }
</script>

<div
  class="h-16 flex items-center justify-end px-4 gap-2 border-b sticky top-0 left-0 bg-white"
>
  <PopupMenu>
    <div slot="trigger">
      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>

    <div slot="content">Hello</div>
  </PopupMenu>
  <PopupMenu>
    <div slot="trigger">
      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>

    <div slot="content">Hello</div>
  </PopupMenu>
  <!-- <button on:click={deleteAllProjects}>Delete all projects</button> -->
  <button on:click={signOut}>Signout</button>
</div>
