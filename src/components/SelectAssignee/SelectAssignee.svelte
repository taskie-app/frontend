<script lang="ts">
  import { api } from "../../lib/api";
  import type { User } from "../../lib/types";
  import UserItem from "./UserItem.svelte";

  export let users: User[] = [];
  let username = "";
  $: filteredUsers = users.filter((u) => u.username.includes(username));
  let assignee: User | null = null;
  let showOptions = false;
  function toggle() {
    showOptions = !showOptions;
  }
  async function findUsers() {
    const { users: foundUsers, error } = await api.getUsers({ username });
    if (error) {
      console.error(error);
    } else {
      users = foundUsers;
    }
  }
  function select(u: User | null) {
    assignee = u;
    showOptions = false;
  }
</script>

<div class="space-y-0.5">
  <div class="text-sm text-gray-400">Assignee</div>
  <div class="relative w-full">
    <button
      class="w-full bg-gray-50 border rounded px-4 py-2 hover:bg-gray-100 text-left"
      on:click={toggle}
    >
      <span>
        {assignee?.username ?? "Unassigned"}
      </span>
    </button>
    <div
      class:hidden={!showOptions}
      class="absolute top-0 right-1 -translate-x-full w-full z-10 p-2 space-y-2 bg-white border rounded"
    >
      <input
        type="text"
        bind:value={username}
        placeholder="Assign to..."
        class="w-full px-4 py-2 border-none outline-none focus:outline-none focus:ring-0"
      />
      <div class="border-b"></div>
      <div class="flex flex-col w-full">
        <button
          class="w-full px-4 py-2 rounded-sm hover:bg-gray-100 text-left"
          on:click={() => select(null)}
        >
          <div>No assignee</div>
        </button>
        {#each filteredUsers as user}
          <button
            class="w-full px-4 py-2 rounded-md hover:bg-gray-100 text-left"
            on:click={() => select(user)}
          >
            <UserItem {user} />
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
