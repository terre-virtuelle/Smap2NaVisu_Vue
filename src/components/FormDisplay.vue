<template>
  <div>
    <div id="editor_holder">
      </div>
    <v-text-field
        v-model="fileName"
        label="file name"
    ></v-text-field>
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
import { onMounted , watch , ref} from "vue";
import ApiHelper from "@/ApiHelper";

export default {
  name: "FormDisplay",
  props: ['formSchema'],
  // this component is written in the vuejs 3 way
  setup(props) {
    let editor = null
    const fileName = ref('')
    // it will observe the change of props.formSchema
    watch(() => props.formSchema, (nv) => {
      console.log('nv  ',nv)
      if (nv.title){
        fileName.value = nv.title;
        delete nv.title
      }
      const editor_holder = document.getElementById('editor_holder');
      // destroy the old editor
      editor.destroy();
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, nv);
    });
    // we use onMonter because setup() apend to early in the vue lifecycle
    onMounted(() => {
      console.log('On mounted  ',props.formSchema)
      if (props.formSchema.title){
        fileName.value = props.formSchema.title;
        delete props.formSchema.title
      }
      if (editor){
        editor.destroy();
      }
      const editor_holder = document.getElementById('editor_holder');
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, props.formSchema);
    })
    const validateData = async () =>{
      await ApiHelper.setHeader()
      const res = await ApiHelper.sendDataForm({fileName:fileName.value,data:editor.getValue()})
      console.log('res from back  ',res)
    }
    return {
      editor,fileName,validateData
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
