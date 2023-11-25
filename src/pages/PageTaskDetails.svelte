<script lang="ts">
  export let params: { id?: number } = {};
</script>

<div class="min-h-full flex-1 flex flex-col">
  <div class="flex-1 flex">
    <div class="flex-1 p-8">
      <div class="space-y-4 border-b pb-8">
        <p class="text-gray-400">
          Project 2 / <span class="text-gray-800">TK-2</span>
        </p>
        <h1 class="text-3xl font-medium">Task name</h1>
        <h2 class="text-xl text-gray-400">Add description...</h2>
      </div>
      <div class="py-8 space-y-4">
        <h3 class="text-xl font-medium">Comments</h3>
        <div class="flex gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-100"></div>
          <div
            class="border rounded-md flex-1 flex flex-col gap-2 p-4 shadow-sm"
          >
            <p class="text-gray-400">Leave a comment...</p>
            <button
              class="border rounded-md shadow-sm px-4 py-2 text-sm font-medium self-end"
              >Comment</button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="w-[400px] border-l p-8 space-y-4">
      <h3 class="text-lg">
        <span class="opacity-50">Status</span> Todo
      </h3>
    </div>
  </div>
</div>
