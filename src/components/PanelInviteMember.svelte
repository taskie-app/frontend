<script lang="ts">
  import { clickOutside } from "../actions/clickOutside";
  import { api } from "../lib/api";
  import type { Project, User } from "../lib/types";
  import Button from "./Button.svelte";
  import OverlayPanel from "./OverlayPanel.svelte";
  import CloseIcon from "../icons/CloseIcon.svelte";
  import { projects } from "../stores/projectStore";

  export let visible: boolean;
  export let project: Project;
  export let onMembersSelected: (members: User[]) => void;

  let username = "";
  let selectedMembers: User[] = [];
  let foundMembers: User[] = []; // find when email change;
  let foundMemebersVisible = false;

  function hide() {
    visible = false;
  }

  function submit() {
    onMembersSelected(selectedMembers);
    hide();
  }

  // Debounce function to delay API call
  function debounce(func: any, delay: number) {
    let timeoutId: number;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }
  async function findUsers() {
    const { users, error } = await api.getUsers({ username });

    if (error) {
      console.error(error);
    } else {
      foundMemebersVisible = true;
      foundMembers = users;
    }
  }
  function addMember(u: User) {
    selectedMembers = [...selectedMembers, u];
    foundMemebersVisible = false;
    username = "";
  }
  function removeMember(u: User) {
    const newMembers = selectedMembers.filter((m) => m._id != u._id);
    selectedMembers = newMembers;
  }
</script>

<OverlayPanel bind:visible>
  <div class="flex flex-col gap-4">
    <h4 class="font-medium">Invite members</h4>

    <!-- Search and results -->
    <div class="relative w-full">
      <input
        type="text"
        placeholder="Search for user..."
        bind:value={username}
        on:input={debounce(findUsers, 500)}
        class="w-full boder border-black/20 rounded px-4 h-10 outline-none focus:outline-none focus:ring-0"
      />
      {#if foundMemebersVisible}
        <div
          class="absolute left-0 bg-white border w-full"
          use:clickOutside
          on:click_outside={() => (foundMemebersVisible = false)}
        >
          {#each foundMembers as user}
            <button
              class="w-full px-4 h-10 rounded-sm hover:bg-gray-100 text-left"
              on:click={() => addMember(user)}>{user.username}</button
            >
          {/each}
        </div>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      {#each selectedMembers as user}
        <div class="bg-gray-100 rounded-full px-4 h-8 flex items-center gap-1">
          {user.username}
          <button on:click={() => removeMember(user)}><CloseIcon /></button>
        </div>
      {/each}
    </div>

    <div class="border-b"></div>
    <div class="ml-auto space-x-2">
      <Button preset="secondary" label="Cancel" onClick={hide} />
      <Button preset="primary" label="Done" onClick={submit} />
    </div>
  </div>
</OverlayPanel>
