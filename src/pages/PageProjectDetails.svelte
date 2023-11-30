<script lang="ts">
  import MemberItem from "../components/MemberItem.svelte";
  import PanelInviteMember from "../components/PanelInviteMember.svelte";
  import TaskBoard from "../components/TaskBoard.svelte";
  import { projects } from "../stores/projectStore";

  export let params: { id: string };
  $: project = $projects.filter((project) => project._id == params.id)[0];
  let inviteMemberPanelVisible = false;
</script>

<div class="flex flex-col">
  <div class="flex-1 p-8 space-y-4">
    <div>
      <p class="text-gray-400">
        Projects / <span class="text-gray-800">{project?.name}</span>
      </p>
      <h1 class="text-3xl font-medium">{project?.name}</h1>
      <h1 class="text-xl">{project?.description}</h1>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex -space-x-2">
        <MemberItem />
        <MemberItem />
        <MemberItem />
      </div>
      <button
        class="px-3 h-8 flex items-center gap-1 text-sm font-medium rounded-full shadow-sm border border-gray-300 bg-white hover:bg-gray-50"
        on:click={() => (inviteMemberPanelVisible = true)}
      >
        Invite</button
      >
      <div class="flex-1"></div>
      <button>List</button>
      <button>Board</button>
      <button>Settings</button>
      <button>New task</button>
    </div>

    <TaskBoard />
  </div>
</div>

<PanelInviteMember bind:visible={inviteMemberPanelVisible} {project} />
