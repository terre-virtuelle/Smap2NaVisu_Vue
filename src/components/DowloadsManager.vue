<template>
  <v-container>
    <DowloadCard :fileData="schemaFiles.pdf" @dlFile="dlFile"/>
    <v-row>
      <div v-for="file in schemaFiles.img" :key="file.name">
        <DowloadCard :fileData="file" @dlFile="dlFile"/>
      </div>
      <div v-for="file in schemaFiles.videos" :key="file.name">
        <DowloadCard :fileData="file" @dlFile="dlFile"/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import DowloadCard from "@/components/DowloadCard";
import ApiHelper from "@/ApiHelper";
export default {
  name: "DowloadsManager",
  components:{
    DowloadCard
  },
  props:{
  schemaFiles:{
    required:true,
    type:Object
  }
  },
  methods:{
   async dlFile(filePath){
     ApiHelper.dlFile(filePath)
   }
  }
}
</script>

<style scoped>

</style>
