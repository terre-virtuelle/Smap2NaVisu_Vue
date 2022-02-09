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
import ApiHelper from "@/ApiHelper";
import Utils from "@/Utils";

export default {
  name: "FormDisplay",
  props: ['formSchema'],
  // this component is written in the vuejs 3 way
  setup(props) {
    let editor = null
    const fileName = ref('')
    // it will observe the change of props.formSchema but is useless
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
      // change var name
      const localSchema = props.formSchema.schema ? Utils.deepCloneObject(props.formSchema) : {schema:Utils.deepCloneObject(props.formSchema),theme: 'bootstrap4',
        iconlib: 'fontawesome4'}
      if (localSchema.schema.title){
        fileName.value = localSchema.schema.title;
        console.log('on monted formDispley   fileName.value  ',fileName.value)
        delete localSchema.title
      }

      if (editor){
        editor.destroy();
      }
      const editor_holder = document.getElementById('editor_holder');
      // we ccan add another attributes in the options to add styles for example
      editor = new JSONEditor(editor_holder, localSchema);
    })
    const getDataTosave = () => {
      const schemaTosend = editor.schema;
      const formValues = editor.getValue()
      schemaTosend.properties = Object.entries(editor.schema.properties).reduce((accumulator,[pk,pv]) => {
        pv.default = formValues[pk];
        accumulator[pk] = pv;
        return accumulator;
      },{})
      return  {fileName:fileName.value,data:schemaTosend};
    }
    const validateData = async () =>{
      // we set the Axcios header when we launch the app
      await ApiHelper.setHeader();
      const schemaTosend = editor.schema;
      const formValues = editor.getValue()
      console.log('formValues  ',formValues)
      schemaTosend.properties = Object.entries(editor.schema.properties).reduce((accumulator,[pk,pv]) => {
          pv.default = formValues[pk];
        accumulator[pk] = pv;
        return accumulator;
      },{})
      const res = await ApiHelper.sendDataForm({fileName:fileName.value,data:schemaTosend})
      console.log('res from back  ',res)
    }
    return {
      editor,fileName,validateData,getDataTosave
    }
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
