<template>
  <v-container>

  <div v-if="Object.keys(scenarios).length > 1" >
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
  components:{
    ScManagerCards
  },
   setup() {
    let scenarios =ref({})
    onMounted ( () =>  {
        ApiHelper.getScenarios().then((res) => {
        scenarios.value = res.data;
      })

    })
    return {scenarios}
  },
  methods:{
    useScenario(scenario){
      this.$emit('useScenario',scenario);
    },
    deleteScenario(scenario){
      const res = ApiHelper.deleteScenario(scenario);
      console.log('res  ',res);
      ApiHelper.getScenarios().then((res) => {
        this.scenarios.value = res.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
