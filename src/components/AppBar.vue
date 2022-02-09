<template>
  <v-app-bar density="compact" app fixed  elevate-on-scroll>
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
              color="primary"
              v-bind="props"
          >
            Fichier
          </v-btn>
        </template>
        <v-list border="20" elevation="10" rounded class="main-menu" density="compact">
          <v-list-item @click="changeMode('newScenario')">
            <v-list-item-title>Nouveau</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="changeMode('scenarioManager')">
            <v-list-item-title>Ouvrir</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="save()">
            <v-list-item-title>Sauvegarder</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Sauvegarder comme</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="exportScenario()">
            <v-list-item-title>Exporter</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-app-bar-title>smap2navisu</v-app-bar-title>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppBar",
  methods: {
    changeMode(mode) {
      this.$emit('changeMode', mode);
    }
    ,
    exportScenario() {
      this.$emit('exportScenario');
    },
    save() {
      this.$emit('save');
    }
  }
}
</script>

<style scoped>

.main-menu {
  background-color: white;
}
</style>

