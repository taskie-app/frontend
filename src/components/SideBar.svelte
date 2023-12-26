<script>
  import { link, replace } from "svelte-spa-router";
  import {
    RiBriefcaseLine,
    RiTaskFill,
    RiLogoutBoxRLine,
    RiUser3Line,
  } from "svelte-remixicon";
  import UserAvatar from "./UserAvatar.svelte";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";
  import { authenticated, user } from "../stores/authStore";
  async function signOut() {
    await api.signOut();
    replace("/sign-in");
    $authenticated = false;
    // $user = null;
  }
</script>

<div
  class="flex flex-col w-[64px] hover:w-[256px] h-screen fixed z-20 top-0 left-0 transition-all duration-300 bg-brand-500 overflow-hidden"
>
  <div class="w-16 text-center flex items-center justify-center py-4">
    <!-- <div class="w-8 h-8 bg-white"></div> -->
    <RiTaskFill size="32px" color="white" />
  </div>
  <a href="/projects" use:link>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <RiBriefcaseLine size="20px" />
      </div>
      <div>Projects</div>
    </div>
  </a>
  {#each $projects as project}
    <a href={`/projects/${project._id}`} use:link>
      <div
        class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
      >
        <div class="w-[64px] flex items-center justify-center">
          <div
            class="w-6 h-6 bg-gray-100 text-gray-400 uppercase text-sm font-bold flex items-center justify-center rounded"
          >
            {project.name.slice(0, 2)}
          </div>
        </div>
        <div>{project.name}</div>
      </div>
    </a>
  {/each}

  <div class="flex-1"></div>

  <a href="/profile" use:link>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <RiUser3Line size="20px" />
      </div>
      <div>Profile</div>
    </div>
  </a>
  <button on:click={signOut}>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <RiLogoutBoxRLine size="20px" />
      </div>
      <div>Sign out</div>
    </div>
  </button>
</div>
