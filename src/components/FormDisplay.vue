<template>
  <div>
    <div id="editor_holder">
      </div>
    <v-btn
        text
        color="primary"
        @click="validateData"
    >
      Validate
    </v-btn>
  </div>
</template>

<script>
import {JSONEditor} from "@json-editor/json-editor";
import { onMounted , watch} from "vue";
import ApiHelper from "@/ApiHelper";

export default {
  name: "FormDisplay",
  props: ['formSchema'],
  // this component is written in the vuejs 3 way
  setup(props) {
    let editor = null
    // it will observe the change of props.formSchema
    watch(() => props.formSchema, (nv) => {
      const editor_holder = document.getElementById('editor_holder');
      // destroy the old editor
      editor.destroy();
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, nv);
    });
    // we use onMonter because setup() apend to early in the vue lifecycle
    onMounted(() => {
      const editor_holder = document.getElementById('editor_holder');
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, props.formSchema);
    })
    const validateData = async () =>{
      await ApiHelper.setHeader()
      console.log('editor.getValue()  ',editor.getValue())
      const res = await ApiHelper.sendDataForm(editor.getValue())
      console.log('res from back  ',res)

    }
    return {
      editor,validateData
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
