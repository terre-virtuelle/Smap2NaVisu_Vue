<template>
  <v-app>
    <v-layout>
      <AppBar @changeMode="changeMode" @exportScenario="exportScenario" @save="save"/>
      <v-main>
        <FormDisplay v-if="mode==='newScenario' || mode === 'editScenario'" :mode="mode" :form-schema="formSchema" ref="formDisplay" />
        <ScenariosManager v-else  @useScenario="useScenario"/>
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
    let formSchema = ref(scenarioModel);
    let mode  = ref('newScenario');
    let formDisplay  = ref(null);
    const changeMode = (nvMode) => {
      mode.value = nvMode;
    }
    const useScenario = (scenario) =>{
      formSchema.value = scenario;
      mode.value = 'displayScenario';
      mode.value = 'editScenario';
    }
    const exportScenario = () => {
      // here is the callBack
      // formSchema.value est la variable contenant le schema
      console.log(formSchema.value)
      // la variable avec le schema au format du backend
      console.log(formDisplay.value.getSchemaToSend())
    }
    const save = () => {
      // here is the callBack
      // formSchema.value est la variable contenant le schema
      console.log('save editor values   ',formDisplay.value)
      console.log('save getSchemaToSend ',formDisplay.value.getSchemaToSend())
    }
    return {
      formSchema,
      mode,
      formDisplay,
      changeMode,
      useScenario,
      exportScenario,
      save
    }
  }
}
</script>

