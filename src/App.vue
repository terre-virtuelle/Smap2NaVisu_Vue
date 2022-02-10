<template>
  <v-app class="overflow-hidden">
    <v-layout >
      <AppBar @changeMode="changeMode" @exportScenario="exportScenario" @save="save" @openDialogSaveAs="openDialogSaveAs"/>
      <v-main>
        <SaveAsDialog :is-open="dialogSaveAsIsOpen" @closeDialog="closeDialogSaveAs" @save="save"/>
        <v-container>
        <FormDisplay v-if="mode==='newScenario' || mode === 'editScenario'" :form-schema="formSchema" ref="formDisplay" />
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
import scenarioModel from "../src/assets/scenarioModel.json"
import {ref} from "vue";
import ApiHelper from "@/ApiHelper";

export default {
  name: 'App',

  components: {
    FormDisplay,
    AppBar,
    ScenariosManager,
    SaveAsDialog
  },

  setup() {
    let formSchema = ref(scenarioModel);
    let mode  = ref('newScenario');
    let formDisplay  = ref(null);
    let dialogSaveAsIsOpen = ref(false);
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
    const exportScenario = () => {
      // here is the callBack
      // formSchema.value est la variable contenant le schema
      console.log(formSchema.value)
      // la variable avec le schema au format du backend
      console.log(formDisplay.value.getDataTosave())
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
      changeMode,
      useScenario,
      exportScenario,
      save,
      openDialogSaveAs,
      closeDialogSaveAs
    }
  }
}
</script>

