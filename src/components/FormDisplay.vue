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
import { onMounted , watch , ref} from "vue";
export default {
  name: "FormDisplay",
  props: ['formSchema'],
  // this component is written in the vuejs 3 way
  setup(props) {
    let editor = null
    const fileName = ref('')
    // it will observe the change of props.formSchema but is useless
    watch(() => props.formSchema, (nv) => {
      if (nv.title){
        fileName.value = nv.title;
        delete nv.title
      }
      const editor_holder = document.getElementById('editor_holder');
      // destroy the old editor
      editor.destroy();
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, nv.getFormDisplay());
    });
    onMounted(() => {
      if (editor){
        editor.destroy();
      }
      const editor_holder = document.getElementById('editor_holder');
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder,  props.formSchema.getFormDisplay());
    })

    const getDataTosave = () => {
      return  {fileName:fileName.value,data:editor.getValue()};
    }

    return {
      editor,fileName,getDataTosave
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
