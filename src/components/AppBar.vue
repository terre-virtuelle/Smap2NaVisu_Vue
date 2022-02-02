<template>
  <v-app-bar density="compact" absolute>
    <v-app-bar-title>smap2navisu</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-divider inset vertical></v-divider>
    <v-btn class="mr-3" text @click="changeMode('displayScenario')">Display Scenario</v-btn>
    <v-divider inset vertical></v-divider>
    <v-btn class="mr-3" text @click="changeMode('scenarioManager')">Scenario Manager</v-btn>
    <v-divider inset vertical></v-divider>
  </v-app-bar>
</template>

<script>
import ApiHelper from "@/ApiHelper";

export default {
  name: "AppBar",
  methods: {
   async changeMode  (mode)  {
      this.$emit('changeMode', mode)
      const scenarios = await ApiHelper.getScenarios();
      console.log('scenarios  ',scenarios);
    }
  }
}
</script>

<style scoped>

</style>
