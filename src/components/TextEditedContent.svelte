<script lang="ts">
  export let content: string;
</script>

<div class="ql-snow content">
  <div class="ql-editor content">
    {@html content}
  </div>
</div>

<style>
  .content {
    padding: 0 !important;
    font-size: 15px;
  }
</style>
