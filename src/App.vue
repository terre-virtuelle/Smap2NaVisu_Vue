<template>
  <v-app class="overflow-hidden">
    <v-layout>
      <AppBar :mode="mode" @changeMode="changeMode" @exportScenario="exportScenario" @save="save"
              @openDialogSaveAs="openDialogSaveAs" @useDlPanel="useDlPanel"/>
      <v-main>
        <v-alert
            type="error"
            v-if="alertIsopen"
            @click="closeAlert">
          {{ alertText }}
        </v-alert>
        <SaveAsDialog v-if="dialogSaveAsIsOpen" :is-open="dialogSaveAsIsOpen" @closeDialog="closeDialogSaveAs"
                      @save="save"/>
        <v-container>
          <v-row   v-if="mode==='isLoaded'"  align-center>
            <v-progress-circular :size="400"
                                 :width="30"
                                 indeterminate
                                 color="primary"/>
          </v-row>
          <FormDisplay v-if="mode==='newScenario' || mode === 'editScenario'" :form-schema="formSchema"
                       ref="formDisplay"/>
          <DowloadsManager v-else-if="mode==='dowload' && schemaFiles " :schemaFiles="schemaFiles"/>
          <ScenariosManager v-else-if="mode==='scenarioManager' " @useScenario="useScenario"/>
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
import {ref} from "vue";
import ApiHelper from "@/ApiHelper";
import ScenarioDm from "@/ScenarioDm";

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
    let formSchema = ref(new ScenarioDm());
    let mode = ref('newScenario');
    let formDisplay = ref(null);
    let dialogSaveAsIsOpen = ref(false);
    let schemaFiles = ref(null);
    const alertIsopen = ref(false);
    const alertText = ref('')

    const changeMode = (nvMode) => {
      mode.value = nvMode;
      if (nvMode === 'newScenario') {
        formSchema.value = new ScenarioDm();
      }
    }
    const useScenario = (scenario) => {
      formSchema.value = new ScenarioDm(scenario);
      changeMode('isLoaded');
      setTimeout(() => {
        changeMode('editScenario');
      }, 250);


    }
    const exportScenario = async () => {
      // need change here
      const dataToSave = formDisplay.value.getDataTosave();
      await ApiHelper.exportScenario(dataToSave);
    }
    const save = async (filename = null) => {
      // need change here
      const dataToSave = formDisplay.value.getDataTosave();
      if (filename) {
        dataToSave.fileName = filename;
        dialogSaveAsIsOpen.value = false;
        await ApiHelper.sendDataForm(dataToSave)
      } else if (dataToSave.fileName) {
        await ApiHelper.sendDataForm(dataToSave)
      } else {
        alertIsopen.value = true;
        alertText.value = "entrer un nom de fichier s'il vous plait."
      }
    }
    const useDlPanel = async () => {
      // need change here just let it more simple
      const dataToSave = formDisplay.value.getDataTosave();
      const res = await ApiHelper.getScenariosFilesPaths(dataToSave)
      changeMode('dowload');
      schemaFiles.value = res.data
    }
    const openDialogSaveAs = () => {
      dialogSaveAsIsOpen.value = true;
    }
    const closeDialogSaveAs = () => {
      dialogSaveAsIsOpen.value = false;
    }
    const closeAlert = () => {
      alertIsopen.value = false;
      alertText.value = '';
    }
    return {
      formSchema,
      mode,
      formDisplay,
      dialogSaveAsIsOpen,
      schemaFiles,
      alertIsopen,
      alertText,
      changeMode,
      useScenario,
      exportScenario,
      save,
      useDlPanel,
      openDialogSaveAs,
      closeDialogSaveAs,
      closeAlert
    }
  }
}
</script>

