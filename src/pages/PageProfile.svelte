<script lang="ts">
  import { link } from "svelte-spa-router";
  import { user } from "../stores/authStore";
  import { supabase } from "../lib/supbase";
  import { api } from "../lib/api";
  import type { User } from "../lib/types";
  import PageLayout from "../components/PageLayout.svelte";
  import TextField from "../components/TextField.svelte";
  import Button from "../components/Button.svelte";
  import SideBar from "../components/SideBar.svelte";

  let newUser: User;
  // newUser is a copy of user, every change will bind to newUser
  $: newUser = $user;

  let avatarFile: any;

  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0];
    avatarFile = file;

    // Display a preview of the selected image (optional)
    const reader = new FileReader();
    reader.onload = () => {
      // @ts-ignore
      newUser.avatar_url = reader.result;
    };
    reader.readAsDataURL(file);
  };

  async function uploadImage() {
    const filePath = `${$user._id}-avatar-${new Date().toISOString()}.png`;
    const { data, error } = await supabase.storage
      .from("files")
      .upload(filePath, avatarFile, {
        cacheControl: "5",
        upsert: true,
      });

    if (error) return { publicUrl: "", error: error.message };
    const {
      data: { publicUrl },
    } = supabase.storage.from("files").getPublicUrl(filePath);
    return { publicUrl };
  }

  async function updateProfile() {
    if (avatarFile) {
      const { publicUrl, error } = await uploadImage();
      if (error) return alert(error);
      newUser.avatar_url = publicUrl;
    }

    const { error: updateError } = await api.updateUser(newUser);
    if (updateError) return alert(updateError);
    $user = newUser;
  }
</script>

<PageLayout>
  <SideBar />
  <div class="p-8 w-full">
    <div class="w-full max-w-2xl mx-auto">
      <div class="text-gray-400">
        <a href="/projects" use:link> Projects </a>
        /
        <a href="/projects" use:link> dasdas </a>
        /
        <span>Profiel</span>
      </div>
      <div class="text-3xl font-semibold mt-4 mb-4">Profile settings</div>

      <div class="text-lg font-medium mt-4 mb-1">Information</div>
      <div class="space-y-4">
        <div class="space-y-1">
          <div class="text-sm font-medium">Avatar</div>
          <img
            src={newUser.avatar_url}
            class="w-32 h-32 rounded bg-gray-200 object-cover"
            alt="User avatar"
          />
          <input type="file" accept="image/*" on:change={handleFileChange} />
        </div>

        <TextField
          label="Name"
          bind:value={newUser.name}
          placeholder="Enter name"
          error=""
        />

        <TextField
          label="Username"
          bind:value={newUser.username}
          placeholder="Enter username"
          error=""
        />

        <Button preset="primary" label="Save changes" onClick={updateProfile} />
      </div>

      <!-- <div class="text-lg font-medium mt-4 mb-1">Password</div>
      <div class="space-y-4">
        <TextField
          label="Old password"
          bind:value={newUser.name}
          placeholder="Enter your old password"
          error=""
        />
        <TextField
          label="New password"
          bind:value={newUser.username}
          placeholder="Enter your new password"
          error=""
        />
        <Button
          preset="primary"
          label="Change password"
          onClick={updateProfile}
        />
      </div> -->
    </div>
  </div>
</PageLayout>
