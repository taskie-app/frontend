<script lang="ts">
  import { user } from "../stores/authStore";
  import { RiUser3Line } from "svelte-remixicon";
  export let size = 8;
  export let u = $user;
  $: sizeClass = `w-${size} h-${size}`;
</script>

{#if u.avatar_url}
  <img
    src={u.avatar_url}
    class={`${sizeClass} rounded-full bg-white object-cover`}
    alt="Avatar"
  />
{:else}
  <div
    class={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center uppercase`}
  >
    <RiUser3Line size="16px" />
  </div>
{/if}
