<template>
  <v-app>
    <v-layout>
      <AppBar @changeMode="changeMode"/>
    <v-main>
      <FormDisplay v-if="mode==='displayScenario'" :form-schema="formSchema" />
      <ScenariosManager v-else/>
    </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import FormDisplay from "@/components/FormDisplay";
import AppBar from "@/components/AppBar";
import ScenariosManager from "@/components/ScenariosManager";
import scenarioModel from "../src/assets/scenarioModel.json"
import {ref} from "vue";

export default {
  name: 'App',

  components: {
    FormDisplay,
    AppBar,
    ScenariosManager
  },

  setup() {
    let formSchema = scenarioModel;
    let mode  = ref('displayScenario');
   const changeMode = (nvMode) => {
      mode.value = nvMode;
    }
    const loadSchema = (schema) =>{
      formSchema = {...schema};
      mode.value = 'displayScenario';
    }
    return {
      formSchema,
      mode,
      changeMode,
      loadSchema
    }
  }
}
</script>
