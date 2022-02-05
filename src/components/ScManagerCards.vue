<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >

    <v-card-title>
      {{scenario.title}}
    </v-card-title>

    <v-card-subtitle>
     Origine: {{scenario.origin}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
          color="orange-lighten-2"
          variant="text"
          @click="useScenario"
      >
        Editer
      </v-btn>
      <v-btn
          color="orange-lighten-2"
          variant="text"
          @click="deleteScenario"
      >
        Supprimer
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import Utils from "@/Utils";

export default {
  name: "ScManagerCards",
  props:{
    scenario:{
      type:Object,
      required:true
    }
  },
  methods:{
    useScenario(){
      this.$emit('useScenario',Utils.deepCloneObject(this.scenario));
    } ,
    deleteScenario(){
      this.$emit('deleteScenario',this.scenario.title);
    }
  }
}
</script>

<style scoped>

</style>
