<script lang="ts">
  import { onMount } from "svelte";
  import { link, replace } from "svelte-spa-router";
  import { authenticated, user } from "../stores/authStore";
  import { api } from "../lib/api";
  import TextField from "../components/TextField.svelte";
  import Button from "../components/Button.svelte";

  let name = "";
  let nameError = "";
  let username = "";
  let usernameError = "";
  let password = "";
  let passwordError = "";

  onMount(() => {
    if ($authenticated) {
      replace("/");
    }
  });

  async function submit() {
    validateInput();
    if (usernameError || passwordError) return;

    const { user: u, error } = await api.signUp(name, username, password);
    if (error) return alert(error);
    $authenticated = true;
    $user = u;
    replace("/");
  }

  function validateInput() {
    nameError = "";
    usernameError = "";
    passwordError = "";

    if (!name) {
      nameError = "Name is required";
    }
    if (!username) {
      usernameError = "Username is required";
    }
    if (!password) {
      passwordError = "Password is required";
    }
  }
</script>

<div class="w-full min-h-screen flex items-center justify-center bg-slate-50">
  <div
    class="bg-white rounded shadow-lg w-full max-w-md flex flex-col items-center py-8 gap-4"
  >
    <h1 class="text-2xl font-semibold">Sign up</h1>
    <div class="w-full max-w-xs space-y-4">
      <TextField
        label="Name"
        bind:value={name}
        placeholder="Enter your name"
        error={nameError}
      />
      <TextField
        label="Username"
        bind:value={username}
        placeholder="Enter your username"
        error={usernameError}
      />
      <TextField
        label="Password"
        bind:value={password}
        placeholder="Enter your password"
        error={passwordError}
      />
      <Button preset="primary" label="Sign up" fluid onClick={submit} />
      <div class="text-gray-400 text-sm text-center">
        Already a member? <a
          href="/sign-in"
          use:link
          class="text-brand-500 font-medium">Sign in here</a
        >
      </div>
    </div>
  </div>
</div>
