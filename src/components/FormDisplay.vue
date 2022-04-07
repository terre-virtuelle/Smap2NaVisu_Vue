<template>
  <div>
    <div id="editor_holder">
    </div>
    <v-text-field
        v-model="fileName"
        label="file name"
    ></v-text-field>

  </div>
</template>

<script>
import {JSONEditor} from "@json-editor/json-editor";
import { onMounted, ref} from "vue";

export default {
  name: "FormDisplay",
  props: ['formSchema'],
  // this component is written in the vuejs 3 way
  setup(props) {
    let editor = null
    const fileName = ref('');

    onMounted(() => {
      initEditor();
      fileName.value = props.formSchema.fileName;
    })

    const getDataTosave = () => {
      return {fileName: fileName.value, data: editor.getValue()};
    }

    const initEditor = () => {
      if (editor) {
        editor.destroy();
      }
      const editor_holder = document.getElementById('editor_holder');
      // we can add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, props.formSchema.getFormDisplay());
    }

    return {
      editor, fileName, getDataTosave
    }
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
