<template>
  <v-app>
    <v-layout>
      <AppBar @changeMode="changeMode"/>
    <v-main>
      <FormBuilder v-if="mode === 'createScenario'" :schema-used="schemaUsed" @loadSchema="loadSchema"/>
      <FormDisplay v-else-if="mode === 'displayScenario'" :form-schema="formSchema"/>
    </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import FormBuilder from "@/components/FormBuilder";
import FormDisplay from "@/components/FormDisplay";
import AppBar from "@/components/AppBar";
import scenarioModel from "../src/assets/scenarioModel.json"

export default {
  name: 'App',

  components: {
    FormBuilder,
    FormDisplay,
    AppBar
  },

  data: () => ({
    formSchema:scenarioModel,
    schemaUsed:null,
    mode : 'createScenario'
  }),
  methods:{
    changeMode(mode){
       this.mode = mode;
    },
    loadSchema(schema){
      console.log('loadSchema    ',schema)
      this.formSchema = {...schema};
      this.mode = 'displayScenario';
    }
  }
}
</script>
