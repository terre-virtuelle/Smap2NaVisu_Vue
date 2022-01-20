<template>
  <div>
    <div id="editor_holder">
      </div>
    <button @click="validateData" >Validate</button>
  </div>
</template>

<script>
import schemaCN from "../assets/schemaCN.json";
import {JSONEditor} from "@json-editor/json-editor";
import { onMounted} from "vue";
import ApiHelper from "@/ApiHelper";

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
    const validateData = async () =>{
      await ApiHelper.setHeader()
      const res = await ApiHelper.sendDataForm(editor.getValue())
      console.log('res from back  ',res)

    }
    return {
      editor,validateData
    }

  },
  methods:{

  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
