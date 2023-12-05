<script lang="ts">
  import { api } from "../lib/api";

  let username = "";
  let password = "";
  let avatar = null;

  async function registerUser() {
    const formData = new FormData();
    console.log(formData);

    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar[0]);

    await api.updateUser("1", formData);
  }
</script>

<main>
  <h1>User Registration</h1>
  <form>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <label for="avatar">Avatar:</label>
    <input
      type="file"
      id="avatar"
      bind:files={avatar}
      accept="image/*"
      required
    />

    <button type="button" on:click={registerUser}>Register</button>
  </form>
</main>

<style>
  main {
    text-align: center;
    margin: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 0 auto;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
</style>
