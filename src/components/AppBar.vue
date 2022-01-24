<template>
  <v-app-bar density="compact" absolute>
    <v-app-bar-title>smap2navisu</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-divider inset vertical></v-divider>
    <v-btn class="mr-3" text @click="changeMode('createScenario')">Create Scenario</v-btn>
    <v-divider inset vertical></v-divider>

    <v-btn class="mr-3" text @click="changeMode('displayScenario')">Display Scenario</v-btn>
    <v-divider inset vertical></v-divider>
    <v-btn class="mr-3" text>Scenario Manager</v-btn>

    <v-divider inset vertical></v-divider>


  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  methods: {
    changeMode (mode)  {
      this.$emit('changeMode',mode)
    }
  }
}
</script>

<style scoped>

</style>
