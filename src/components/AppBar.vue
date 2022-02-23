<template>
  <v-app-bar density="compact" app fixed elevate-on-scroll>
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
              color="primary"
              variant="outlined"
              v-bind="props"
          >
            Fichier
          </v-btn>
        </template>
        <v-list border="20" elevation="10" rounded class="main-menu" density="compact">
          <div v-if="mode!=='newScenario'">
            <v-list-item @click="changeMode('newScenario')">
              <v-list-item-title>Nouveau</v-list-item-title>
            </v-list-item>
            <v-divider v-if="mode!=='scenarioManager'"/>
          </div>
          <div v-if="mode!=='scenarioManager'">
            <v-list-item @click="changeMode('scenarioManager')">
              <v-list-item-title>Ouvrir</v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item @click="save()">
              <v-list-item-title>Sauvegarder</v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item @click="openDialogSaveAs()">
              <v-list-item-title>Sauvegarder comme</v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item @click="exportScenario()">
              <v-list-item-title>Exporter en pdf</v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item @click="useDlPanel()">
              <v-list-item-title>Télecharger</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </div>
    <v-app-bar-title>smap2navisu</v-app-bar-title>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppBar",
  props: {
    mode: {
      required: true,
      type: String
    }
  },
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
    },
    openDialogSaveAs() {
      this.$emit('openDialogSaveAs');
    },
    useDlPanel() {
      this.$emit('useDlPanel');
    }
  }
}
</script>

<style scoped>

.main-menu {
  background-color: white;
}
</style>

