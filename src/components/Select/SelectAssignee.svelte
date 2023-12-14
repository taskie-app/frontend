<script lang="ts">
  import { RiArrowDownSLine } from "svelte-remixicon";
  import type { User } from "../../lib/types";
  import UserAvatar from "../UserAvatar.svelte";

  export let members: User[];
  export let assignee: User;

  $: label = assignee?.username ?? "Unassigned";

  let expanded = false;

  function toggle() {
    expanded = !expanded;
  }
  function select(u: User) {
    assignee = u;
    expanded = false;
  }
</script>

<div class="space-y-0.5">
  <div class="text-sm font-medium">Assignee</div>
  <div class="relative w-full">
    <button
      class="w-full flex items-center gap-1 rounded px-3 h-10 text-left text-sm font-medium bg-gray-200"
      on:click={toggle}
    >
      {#if assignee}
        <UserAvatar u={assignee} size={5} />
        <div>{assignee.username}</div>
      {:else}
        <div>Unassigned</div>
      {/if}
      <div class="flex-1"></div>
      <RiArrowDownSLine size="20px" />
    </button>
    <div
      class:hidden={!expanded}
      class="absolute w-full z-10 bg-white border rounded shadow"
    >
      <div class="flex flex-col w-full">
        {#each members as member}
          <button
            class="w-full text-left hover:bg-gray-100 inline-flex gap-1 items-center rounded-sm h-10 px-3 text-sm font-medium text-gray-700"
            on:click={() => select(member)}
          >
            <UserAvatar u={member} size={5} />
            <div>{member.username}</div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
