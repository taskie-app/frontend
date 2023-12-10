<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let selectedImage;
  let imageUrl;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    selectedImage = file;

    // Display a preview of the selected image (optional)
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/files",
        formData
      );
      console.log(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
</script>

<main>
  <input type="file" accept="image/*" on:change={handleFileChange} />
  <button on:click={uploadImage} disabled={!selectedImage}>
    Upload Image
  </button>

  {#if imageUrl}
    <img src={imageUrl} alt="Uploaded Image" />
  {/if}
</main>

<style>
  img {
    max-width: 100%;
    max-height: 300px;
    margin-top: 10px;
  }
</style>
