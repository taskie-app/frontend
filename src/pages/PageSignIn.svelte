<script lang="ts">
  import { onMount } from "svelte";
  import { link, replace } from "svelte-spa-router";
  import { authenticated } from "../stores/authStore";
  import { api } from "../lib/api";

  let email = "";
  let password = "";

  onMount(() => {
    if ($authenticated) {
      replace("/");
    }
  });

  async function submit() {
    const { error } = await api.signIn(email, password);
    if (error) {
      alert(error);
    } else {
      $authenticated = true;
      replace("/");
    }
  }
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-8">
  <h2 class="text-2xl font-bold">Sign in to your account</h2>

  <div class="w-full max-w-sm space-y-4">
    <div class="space-y-1">
      <label for="email" class="text-sm font-medium">Email address</label>
      <input
        bind:value={email}
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        placeholder="Email address"
        class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
      />
    </div>

    <div class="space-y-1">
      <div class="flex items-center justify-between">
        <label
          for="password"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Password</label
        >
        <div class="text-sm">
          <a
            href="/forgot-password"
            use:link
            class="font-semibold text-brand-600 hover:text-brand-500"
            >Forgot password?</a
          >
        </div>
      </div>
      <div>
        <input
          bind:value={password}
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Password"
          class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <button
      on:click={submit}
      class="flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >Sign in</button
    >

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a
        href="/sign-up"
        use:link
        class="font-semibold text-brand-600 hover:text-brand-500"
        >Create an account</a
      >
    </p>
  </div>
</div>
