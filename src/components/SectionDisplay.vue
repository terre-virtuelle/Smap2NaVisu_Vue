<template>
  <div>
    <v-list-item v-for="(secVal,secKey) in Object.entries(sections)" :key="secKey"  two-line>
    <v-list-item-content>
        <v-list-item-title>question : {{ secVal[0] }}</v-list-item-title>
      <div v-if="secVal[1].type === 'object'">
        <v-btn
            variant="outlined"
            size="large"
            color="info"
            @click="addNewField(secVal)"
        >
          Ajouter un champ
        </v-btn>
        <v-btn
            variant="outlined"
            size="large"
            color="info"
            @click="addNewSection(secVal)"
        >
          Ajouter une sous question
        </v-btn>
      </div>
      <div v-if="secVal[1].properties">
        <v-list-item-subtitle v-for="(rowEnt,rowKey) in Object.entries(secVal[1].properties)" :key="rowKey">
          champ : {{  rowEnt[1].title }}
        </v-list-item-subtitle>
      </div>
      </v-list-item-content>
      <v-divider inset></v-divider>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "SectionDisplay",
  props: ['sections'],
  methods: {
    addNewField(rowVal) {
      this.$emit('openAddFieldDialog', [rowVal[0]])
    },
    addNewSection(rowVal) {
      this.$emit('openAddSectionDialog', [rowVal[0]])
    }
  }
}
</script>

<style scoped>

</style>
