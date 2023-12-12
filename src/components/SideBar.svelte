<script>
  import { link } from "svelte-spa-router";
  import { RiBriefcaseLine, RiCalendarTodoLine } from "svelte-remixicon";
  import UserAvatar from "./UserAvatar.svelte";
</script>

<div
  class="flex flex-col w-[64px] hover:w-[256px] h-screen fixed z-20 top-0 left-0 transition-all duration-300 bg-brand-500 overflow-hidden"
>
  <div class="w-16 text-center flex items-center justify-center py-4">
    <div class="w-8 h-8 bg-white"></div>
  </div>
  <a href="/projects" use:link>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <RiBriefcaseLine size="20px" />
      </div>
      <div>Projects</div>
    </div>
  </a>

  <a href="/projects" use:link>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <RiCalendarTodoLine size="20px" />
      </div>
      <div>My tasks</div>
    </div>
  </a>
  <div class="flex-1"></div>
  <a href="/profile" use:link>
    <div
      class="flex items-center w-[256px] py-4 hover:bg-brand-400 font-medium text-white text-sm uppercase"
    >
      <div class="w-[64px] flex items-center justify-center">
        <UserAvatar />
      </div>
      <div>Account</div>
    </div>
  </a>
</div>
