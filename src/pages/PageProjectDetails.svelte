<script lang="ts">
  import TaskItem from "../components/TaskItem.svelte";
  import MemberItem from "../components/MemberItem.svelte";
  import Button from "../components/Button.svelte";

  export let params: { id?: number } = {};
</script>

<div class="flex flex-col">
  <div
    class="h-16 border-b px-8 flex items-center justify-between sticky top-0 left-0 bg-white"
  >
    <p class="text-gray-400">
      Projects / <span class="text-gray-800">Project 2</span>
    </p>
    <Button label="Add task" />
  </div>

  <div class="flex-1 p-8 space-y-4">
    <h1 class="text-3xl font-medium">Project {params.id}</h1>
    <div class="flex items-center">
      <div class="flex -space-x-2">
        <MemberItem />
        <MemberItem />
        <MemberItem />
      </div>
      <button
        class="px-3 h-8 flex items-center gap-1 text-sm font-medium rounded-full shadow-sm border border-gray-300 bg-white hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus"
          ><path d="M5 12h14" /><path d="M12 5v14" /></svg
        >
        Invite</button
      >
    </div>

    <div class="flex-1 flex gap-4 overflow-y-hidden">
      <div class="flex flex-col w-[320px] gap-4">
        <div class="flex items-center gap-2 py-2 border-b-2 border-b-gray-500">
          <h2 class="text-xl font-medium">Todo</h2>
          <div class="border rounded-full px-3"><p class="text-sm">2</p></div>
        </div>
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
      </div>
      <div class="flex flex-col w-[320px] gap-4">
        <div class="flex items-center gap-2 py-2 border-b-2 border-b-blue-500">
          <h2 class="text-xl font-medium">In progress</h2>
          <div class="border rounded-full px-3"><p class="text-sm">2</p></div>
        </div>
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
      </div>
      <div class="flex flex-col w-[320px] gap-4">
        <div class="flex items-center gap-2 py-2 border-b-2 border-b-green-500">
          <h2 class="text-xl font-medium">Done</h2>
          <div class="border rounded-full px-3"><p class="text-sm">2</p></div>
        </div>
        <TaskItem
          id="1"
          name="Backend"
          key="TK-2"
          description="Create backend api CRUD project"
          memberId="1"
        />
      </div>
    </div>
  </div>
</div>
