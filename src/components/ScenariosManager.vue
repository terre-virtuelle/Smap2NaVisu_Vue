<template>
  <v-container>
    <div v-if="Object.keys(scenarios).length > 1">
      <v-row>
        <div v-for="scenario in scenarios" :key="scenario.title">
          <ScManagerCards :scenario="scenario" @useScenario="useScenario" @deleteScenario="deleteScenario"/>
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ApiHelper from "@/ApiHelper";
import {onMounted, ref} from "vue";
import ScManagerCards from "@/components/ScManagerCards";

export default {
  name: "ScenariosManager",
  components: {
    ScManagerCards
  },
   setup() {
    let scenarios = ref({})
    onMounted(async() => {
      const res = await ApiHelper.getScenarios();
      console.log('res.data  ',res.data)
      scenarios.value = res.data;
      console.log('scenarios.value  ',scenarios.value)


    })
    return {scenarios}
  },
  methods: {
    useScenario(scenario) {
      this.$emit('useScenario', scenario);
    },
    async deleteScenario(scenarioTitle) {
      const res = await ApiHelper.deleteScenario({title: scenarioTitle});
      console.log('res  ', res);
      if (res.data === 'Scenario deleted') {
        const resScenarios = await ApiHelper.getScenarios();
        this.scenarios.value = resScenarios.data;
      }
    }
  }
}
</script>

<style scoped>

</style>
