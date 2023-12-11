<script lang="ts">
  import type { Project, User } from "../lib/types";
  import { RiDeleteBinLine, RiAddCircleLine } from "svelte-remixicon";
  import TextField from "./TextField.svelte";
  import Button from "./Button.svelte";
  import { projects } from "../stores/projectStore";
  import { api } from "../lib/api";
  import { link, replace } from "svelte-spa-router";
  import TextEditor from "./TextEditor.svelte";
  import Select from "./Select/Select.svelte";
  import { clickOutside } from "../actions/clickOutside";

  export let project: Project;
  export let onInviteMemberClicked: () => void;
  $: newProject = project;

  let usernameSearch = "";
  let foundMembers: User[] = [];
  let foundMemebersVisible = false;
  let selectedMembers: User[] = [];
  function submit() {
    const newProject = {
      ...project,
      members: [...project.members, ...selectedMembers],
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
  }

  // Debounce function to delay API call
  function debounce(func: any, delay: number) {
    let timeoutId: any;
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
    const { users, error } = await api.getUsers({ username: usernameSearch });
    if (error) return console.error(error);
    foundMemebersVisible = true;
    foundMembers = users;
  }
  function addMember(u: User) {
    selectedMembers = [...selectedMembers, u];
    foundMemebersVisible = false;
    usernameSearch = "";
  }
  function removeMember(u: User) {
    const newMembers = selectedMembers.filter((m) => m._id != u._id);
    selectedMembers = newMembers;
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  <div class="text-gray-400">
    <a href="/projects" use:link> Projects </a>
    /
    <a href="/projects" use:link> {project.name} </a>
    /
    <span>Kanban board</span>
  </div>

  <div class="text-3xl font-semibold mt-4 mb-4">Members</div>

  <div class="relative space-y-2">
    <div class="text-lg font-medium">Invite</div>
    <input
      type="text"
      placeholder="Search for user..."
      bind:value={usernameSearch}
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

  <div class="space-y-2 mt-4">
    <div class="text-lg font-medium">Members</div>
    <div class="flex items-center gap-4">
      <div class="w-8 h-8 rounded-full bg-gray-100"></div>
      <div class="font-medium flex-1">{project.manager.username}</div>
      <div class="text-gray-400">{project.manager.username}</div>
      <div class="bg-gray-100 text-gray-400 px-2 rounded">Manager</div>
      <button>
        <RiDeleteBinLine size="16px" class="text-transparent" />
      </button>
    </div>
    {#each project.members as member}
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-gray-100"></div>
        <div class="font-medium flex-1">{member.username}</div>
        <div class="text-gray-400">{member.username}</div>
        <div class="bg-gray-100 text-gray-400 px-2 rounded">Member</div>
        <button>
          <RiDeleteBinLine size="16px" />
        </button>
      </div>
    {/each}
  </div>
</div>
