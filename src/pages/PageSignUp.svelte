<script lang="ts">
  import { link, replace } from "svelte-spa-router";
  import { api } from "../lib/api";
  import { authenticated } from "../stores/auth";
  import { onMount } from "svelte";

  let name = "";
  let email = "";
  let password = "";

  onMount(() => {
    if ($authenticated) {
      replace("/");
    }
  });

  async function submit() {
    const {
      data: { token },
      error,
    } = await api.signUp(email, password);
    if (error) {
      alert(error);
    } else {
      sessionStorage.setItem("token", token);
      $authenticated = true;
      replace("/");
    }
  }
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-8">
  <h2 class="text-3xl font-medium">Create new account</h2>

  <div class="w-full max-w-sm space-y-4">
    <div class="space-y-1">
      <label for="name" class="text-sm font-medium">Name</label>
      <input
        bind:value={name}
        id="name"
        name="name"
        type="text"
        required
        placeholder="Your name"
        class="w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
      />
    </div>

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
      <label
        for="password"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Password</label
      >
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
      >Sign up</button
    >

    <p class="mt-10 text-center text-sm text-gray-500">
      Already a member?
      <a
        href="/sign-up"
        use:link
        class="font-semibold text-brand-600 hover:text-brand-500"
        >Sign in to your account</a
      >
    </p>
  </div>
</div>
