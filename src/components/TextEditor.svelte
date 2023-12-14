<script lang="ts">
  import Quill from "quill";
  import { onMount } from "svelte";

  export let defaultValue: string;
  export let textContent: string;
  export let htmlContent: string;

  let editor: any;

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
  onMount(() => {
    editor = new Quill("#editor", options);
    editor.clipboard.dangerouslyPasteHTML(0, defaultValue);
    editor.on("text-change", handleTextChange);

    return () => {
      editor.off("text-change", handleTextChange);
      editor = null;
    };
  });

  function handleTextChange(e: any) {
    textContent = editor.getText();
    htmlContent = editor.container.firstChild.innerHTML;
  }
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div>
  <div id="editor" />
</div>

<style>
  #editor.ql-toolbar.ql-snow {
    border-radius: 4px 4px 0 0;
    border: 1px solid #dfe1e6;
    border-bottom: none;
  }
  #edtior.ql-container.ql-snow {
    border-radius: 0 0 4px 4px;
    border: 1px solid #dfe1e6;
    border-top: none;
    font-size: 15px;
  }
  #editor.ql-editor {
    min-height: 110px;
  }
</style>
