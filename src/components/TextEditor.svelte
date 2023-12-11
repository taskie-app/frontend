<script lang="ts">
  import { quill } from "svelte-quill";
  export let content: string;

  // config quill editor
  const options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
      ],
    },
    toolbar: "#toolbar",
    theme: "snow",
  };
</script>

<div>
  <div
    class="editor"
    use:quill={options}
    on:text-change={(e) => {
      content = e.detail.html;
    }}
  />
</div>

<style>
  .editor.ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
    border: 1px solid #dfe1e6;
    border-bottom: none;
  }
  .edtior.ql-container.ql-snow {
    border-radius: 0 0 4px 4px;
    border: 1px solid #dfe1e6;
    border-top: none;
    font-size: 15px;
  }
  .editor.ql-editor {
    min-height: 110px;
  }
</style>
