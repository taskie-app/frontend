<script lang="ts">
  import type { Project, User } from "../lib/types";
  import OverlayPanel from "./OverlayPanel.svelte";
  export let visible: boolean;
  export let project: Project;
  let email = "";
  let membersToBeAdded: User[] = [];
  let foundMembers: User[] = []; // find when email change;

  function hide() {
    visible = false;
  }
  function submit() {
    // invite members to projects
  }
  function addMember(member: User) {
    membersToBeAdded.push(member);
  }
</script>

<OverlayPanel bind:visible>
  <form on:submit|preventDefault={submit}>
    <div>
      {#each membersToBeAdded as member}
        <div>
          <p>{member.name}</p>
        </div>
      {/each}
    </div>
    <input type="text" name="" id="" placeholder="Email" bind:value={email} />
    <div>
      {#each foundMembers as foundMember}
        <button on:click={() => addMember(foundMember)}
          >{foundMember.name}</button
        >
      {/each}
    </div>

    <button on:click={hide}>Cancel</button>
    <button type="submit">Invite</button>
  </form>
</OverlayPanel>
