<template>
  <v-app>
    <v-layout>
      <AppBar/>
    <v-main>
      <FormDisplay :form-schema="formSchema"/>
    </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import FormDisplay from "@/components/FormDisplay";
import AppBar from "@/components/AppBar";
import scenarioModel from "../src/assets/scenarioModel.json"

export default {
  name: 'App',

  components: {
    FormDisplay,
    AppBar
  },

  data: () => ({
    formSchema:scenarioModel,
    schemaUsed:null,
  }),
  methods:{
    loadSchema(schema){
      this.formSchema = {...schema};
      this.mode = 'displayScenario';
    }
  }
}
</script>
