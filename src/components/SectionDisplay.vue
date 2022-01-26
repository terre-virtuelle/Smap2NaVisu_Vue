<template>
<div>
  <div v-for="(secVal,secKey) in Object.entries(sections)" :key="secKey">
    <p> secVal:{{secVal }}</p>
    <div v-for="(rowEnt,rowKey) in Object.entries(secVal)" :key="rowKey">
      <p>{{ rowEnt }}</p>
      <div v-if="rowEnt[1].type === 'object'">
        <v-btn
            variant="outlined"
            size="large"
            color="info"
            @click="addNewField(secVal)"
        >
          Add new Field
        </v-btn>
        <v-btn
            variant="outlined"
            size="large"
            color="info"
            @click="addNewSection(secVal)"
        >
          Add new Section
        </v-btn>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SectionDisplay",
  props:['sections'],
  methods: {
    addNewField(rowVal){
      this.$emit('openAddFieldDialog',[rowVal[0]])
    },
    addNewSection(rowVal){
      this.$emit('openAddSectionDialog',[rowVal[0]])
    }
  }
}
</script>

<style scoped>

</style>
