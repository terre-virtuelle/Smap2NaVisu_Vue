<template>
<div v-if="Object.keys(scenarios).length > 1" >
  <div v-for="scenario in scenarios" :key="scenario.title">
    <ScManagerCards :scenario="scenario" @useScenario="useScenario"/>
    <v-divider inset></v-divider>
  </div>
</div>
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
      this.$emit('useScenario',scenario)
    }
  }
}
</script>

<style scoped>

</style>
