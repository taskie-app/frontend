<script lang="ts">
  import type { User } from "../lib/types";
  import UserAvatar from "./UserAvatar.svelte";
  import { RiDeleteBinLine } from "svelte-remixicon";

  export let member: User;
  export let onDeleteMemberClicked: (member: User) => void;
</script>

<div class="flex items-center gap-2">
  <UserAvatar u={member} />
  <div class="font-medium flex-1">{member.name ?? ""}</div>
  <div class="text-gray-400">{member.username}</div>
  <div class="bg-gray-100 text-gray-400 px-2 rounded">
    {member.role ?? "Member"}
  </div>
  <button on:click={() => onDeleteMemberClicked(member)}>
    <RiDeleteBinLine size="16px" />
  </button>
</div>
