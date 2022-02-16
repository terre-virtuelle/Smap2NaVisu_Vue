<template>
  <v-app class="overflow-hidden">
    <v-layout >
      <AppBar :mode="mode" @changeMode="changeMode" @exportScenario="exportScenario" @save="save" @openDialogSaveAs="openDialogSaveAs" @useDlPanel="useDlPanel"/>
      <v-main>
        <SaveAsDialog v-if="dialogSaveAsIsOpen" :is-open="dialogSaveAsIsOpen" @closeDialog="closeDialogSaveAs" @save="save"/>
        <v-container>
        <FormDisplay v-if="mode==='newScenario' || mode === 'editScenario'" :form-schema="formSchema" ref="formDisplay" />
          <DowloadsManager v-else-if="mode==='dowload' && schemaFiles" :schemaFiles="schemaFiles"/>
        <ScenariosManager v-else  @useScenario="useScenario"/>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import FormDisplay from "@/components/FormDisplay";
import AppBar from "@/components/AppBar";
import ScenariosManager from "@/components/ScenariosManager";
import SaveAsDialog from "@/components/SaveAsDialog";
import DowloadsManager from "@/components/DowloadsManager";
import scenarioModel from "../src/assets/scenarioModel.json"
import {ref} from "vue";
import ApiHelper from "@/ApiHelper";

export default {
  name: 'App',

  components: {
    FormDisplay,
    AppBar,
    ScenariosManager,
    SaveAsDialog,
    DowloadsManager
  },

  setup() {
    let formSchema = ref(scenarioModel);
    let mode  = ref('newScenario');
    let formDisplay  = ref(null);
    let dialogSaveAsIsOpen = ref(false);
    let schemaFiles = ref(null);
    const changeMode = (nvMode) => {
      mode.value = nvMode;
      if (nvMode === 'newScenario'){
        formSchema.value = scenarioModel;
      }
    }
    const useScenario = (scenario) =>{
      formSchema.value = scenario;
      mode.value = 'displayScenario';
      mode.value = 'editScenario';
    }
    const exportScenario = async () => {
      const dataToSave = formDisplay.value.getDataTosave();
      const res = await ApiHelper.exportScenario(dataToSave);
      console.log('res from back  ',res)
    }
    const save = async (filename=null) => {
      const dataToSave = formDisplay.value.getDataTosave();
      if(filename){
        dataToSave.fileName = filename;
        dialogSaveAsIsOpen.value = false;
      }
      const res = await ApiHelper.sendDataForm(dataToSave)
      console.log('res from back  ',res)
    }
    const useDlPanel = async () => {
      const dataToSave = formDisplay.value.getDataTosave();
      const res = await ApiHelper.getScenariosFilesPaths(dataToSave)
      mode.value = 'dowload';
      schemaFiles.value = res.data
    }
    const openDialogSaveAs = () => {
      dialogSaveAsIsOpen.value = true;
    }
    const closeDialogSaveAs = () => {
      dialogSaveAsIsOpen.value = false;
    }
    return {
      formSchema,
      mode,
      formDisplay,
      dialogSaveAsIsOpen,
      schemaFiles,
      changeMode,
      useScenario,
      exportScenario,
      save,
      useDlPanel,
      openDialogSaveAs,
      closeDialogSaveAs
    }
  }
}
</script>

