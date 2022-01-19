<template>
    <div id="editor_holder">
      </div>
</template>

<script>
import schemaCN from "../assets/schemaCN.json";
import {JSONEditor} from "@json-editor/json-editor";
import { onMounted} from "vue";

export default {
  name: "FormDisplay",
  // this component is written in the vuejs 3 way
  setup() {
    var editor = null
    // we use onMonter because setup() apend to early in the vue lifecycle
    onMounted(() => {
      const editor_holder = document.getElementById('editor_holder');
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, {theme: 'bootstrap4',schema:schemaCN});
    })
    return {
      editor
    }

  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css'
</style>
