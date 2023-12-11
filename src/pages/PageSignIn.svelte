<script lang="ts">
  import { onMount } from "svelte";
  import { link, replace } from "svelte-spa-router";
  import { authenticated, user } from "../stores/authStore";
  import { api } from "../lib/api";
  import TextField from "../components/TextField.svelte";
  import Button from "../components/Button.svelte";

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

    const { user: u, error } = await api.signIn(username, password);
    if (error) return alert(error);
    $authenticated = true;
    $user = u;
    replace("/");
  }

  function validateInput() {
    usernameError = "";
    passwordError = "";

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
    <h1 class="text-2xl font-semibold">Sign in</h1>
    <div class="w-full max-w-xs space-y-4">
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
      <Button preset="primary" label="Sign in" fluid onClick={submit} />
      <div class="text-gray-400 text-sm text-center">
        Don't have an account? <a
          href="/sign-up"
          use:link
          class="text-brand-500 font-medium">Sign up here</a
        >
      </div>
    </div>
  </div>
</div>
