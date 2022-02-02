<template>
<div>

</div>
</template>

<script>
import ApiHelper from "@/ApiHelper";
import { onMounted } from "vue";

export default {
  name: "ScenariosManager",
  setup() {
    onMounted (() =>  {
      console.log('onMounted  ');

      const scenarios = ApiHelper.getScenarios();
      console.log('scenarios  ',scenarios);
    })
  }
}
</script>

<style scoped>

</style>
