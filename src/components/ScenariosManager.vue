<template>
  <v-container>

  <div v-if="Object.keys(scenarios).length > 1" >
    <v-row>
  <div v-for="scenario in scenarios" :key="scenario.title">

    <ScManagerCards :scenario="scenario" @useScenario="useScenario"/>
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
      console.log('sc manager  ',scenario)

      this.$emit('useScenario',scenario)
    }
  }
}
</script>

<style scoped>

</style>
