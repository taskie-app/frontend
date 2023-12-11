<script lang="ts">
  import { clickOutside } from "../actions/clickOutside";
  import { api } from "../lib/api";
  import type { Project, User } from "../lib/types";
  import Button from "./Button.svelte";
  import OverlayPanel from "./OverlayPanel.svelte";
  import CloseIcon from "../icons/CloseIcon.svelte";
  import { projects } from "../stores/projectStore";
  import { RiCloseCircleLine, RiUploadCloudLine } from "svelte-remixicon";

  export let project: Project;
  export let members: User[];

  let visible: boolean;
  let username = "";
  let selectedMembers: User[] = [];
  let foundMembers: User[] = []; // find when email change;
  let foundMemebersVisible = false;

  function hide() {
    visible = false;
  }

  export function show() {
    visible = true;
  }

  function submit() {
    const newProject = {
      ...project,
      members: [...project.members, ...members],
    };

    $projects = $projects.map((p) => {
      if (p._id == newProject._id) {
        return newProject;
      } else {
        return p;
      }
    });

    api
      .updateProject(newProject._id, newProject)
      .then()
      .catch((error) => console.error(error));
    hide();
  }

  // Debounce function to delay API call
  function debounce(func: any, delay: number) {
    let timeoutId: number;
    return function () {
      // @ts-ignore
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
    if (error) return console.error(error);
    foundMemebersVisible = true;
    foundMembers = users;
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

{#if visible}
  <div
    class="absolute top-0 left-0 w-screen h-screen flex bg-black/50 items-center justify-center"
  >
    <div
      class="bg-white w-full max-w-lg rounded overflow-hidden"
      use:clickOutside
      on:click_outside={hide}
    >
      <div class="flex items-center justify-between p-4">
        <div class="font-medium">Invite members</div>
        <button on:click={hide}><RiCloseCircleLine size="20px" /></button>
      </div>

      <div class="flex flex-col p-4 gap-4 bg-slate-50">
        <div class="relative h-48">
          <input
            type="text"
            placeholder="Search for user..."
            bind:value={username}
            on:input={debounce(findUsers, 500)}
            class="w-full boder border-black/20 rounded px-4 h-10 outline-none focus:outline-none focus:ring-0"
          />
          {#if foundMemebersVisible}
            <div
              class="absolute left-0 bg-white border w-full h-32 overflow-scroll"
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
            <div
              class="bg-gray-100 rounded-full px-4 h-8 flex items-center gap-1"
            >
              {user.username}
              <button on:click={() => removeMember(user)}><CloseIcon /></button>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex items-center justify-between p-4">
        <Button preset="secondary" label="Cancel" onClick={hide} />
        <Button preset="primary" label="Done" onClick={submit} />
      </div>
    </div>
  </div>
{/if}
