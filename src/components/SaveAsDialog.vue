<template>
  <v-dialog
      v-model="localIsOpen"
      persistent
      transition="dialog-top-transition"
      max-width="2000"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Sauvergarder comme</span>
      </v-card-title>
      <v-card-text>
        <v-form>

          <v-text-field
              v-model="fileName"
              label="Nom du fichier"
          ></v-text-field>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
        >
          Annuler
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import { ref,watch} from "vue";

export default {
  name: "SaveAsDialog",props: ['isOpen'],
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let localIsOpen = props.isOpen;
    const fileName = ref('');

    watch(() => props.isOpen, (nVal) => {
      localIsOpen = nVal
    });
    const closeDialog = () => {
      context.emit('closeDialog')
    }
    const save = () => {
      context.emit('save',fileName.value)
    }
    return {
      localIsOpen,fileName, closeDialog,save
    }
  },
}
</script>

<style scoped>

</style>
