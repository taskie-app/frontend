<script lang="ts">
  import Button from "../components/Button.svelte";
  import { api } from "../lib/api";
  import { link } from "svelte-spa-router";
  export let username: string = "ducnh";
  export let password: string;
  export let files;
  export let fileInput: HTMLInputElement;
  let avatarSrc = "default-avatar.jpg";

  function previewAvatar(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
      avatarSrc = reader.result;
    };

    if (input.files && input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
  }
  function chooseAvatar() {
    fileInput.click();
  }
</script>

<div class="mx-auto w-full max-w-sm space-y-4 pt-8">
  <div class="mx-auto">
    <button on:click={chooseAvatar} class="hover:brightness-75">
      <img
        id="avatar-preview"
        src={avatarSrc}
        class="aspect-square rounded-full w-40 h-40 object-cover mx-auto"
        alt=""
      />
    </button>
  </div>
  <input
    bind:this={fileInput}
    type="file"
    id="avatar-input"
    accept="image/*"
    on:change={previewAvatar}
    class="hidden"
  />
  <div>
    <label for="name" class="text-sm font-medium">Name</label>
    <input
      name="name"
      required
      placeholder="Name"
      class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
    />
  </div>

  <div>
    <label for="name" class="text-sm font-medium">Username</label>
    <input
      name="name"
      required
      placeholder="Name"
      class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
    />
  </div>

  <div>
    <label for="name" class="text-sm font-medium">Change password</label>
    <input
      name="name"
      required
      placeholder="Old password"
      class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
    />
    <input
      name="name"
      required
      placeholder="New password"
      class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>
