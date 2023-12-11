<script lang="ts">
  import { push, replace } from "svelte-spa-router";
  import { api } from "../lib/api";
  import { authenticated } from "../stores/authStore";
  import { deleteAllProjects } from "../stores/projectStore";
  import PopupMenu from "./PopupMenu.svelte";

  export let title: string;

  function viewProfile() {
    push("/profile");
  }
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
  class="h-12 flex items-center justify-between px-4 gap-2 border-b bg-white"
>
  <div class="px-4 font-medium">{title}</div>
  <PopupMenu>
    <div slot="trigger">
      <div class="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>

    <div slot="content" class="flex flex-col">
      <button
        class="hover:bg-gray-100 text-left px-4 py-2"
        on:click={viewProfile}>Profile</button
      >
      <button class="hover:bg-gray-100 text-left px-4 py-2" on:click={signOut}
        >Sign out</button
      >
    </div>
  </PopupMenu>
</div>
