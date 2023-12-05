<script lang="ts">
  import type { User } from "../lib/types";

  export let member: User;
</script>

<div
  class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-white border-4"
>
  {member?.username ? member.username[0].toUpperCase() : ""}
</div>
