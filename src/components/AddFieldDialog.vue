<template>
    <v-dialog
        v-model="localIsOpen"
        persistent
        transition="dialog-top-transition"
        max-width="2000"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajpouter un champ</span>
        </v-card-title>
        <v-card-text>
          <v-form>

              <v-text-field
                  v-model="title"
                  label="Title"
              ></v-text-field>

              <v-text-field
                  v-model="name"
                  label="Name"
              ></v-text-field>

              <v-text-field
                  v-model="description"
                  label="Description"
              ></v-text-field>

              <v-text-field
                  v-model="defaultValue"
                  label="Valeur par defaut"
              ></v-text-field>

              <v-radio-group v-model="type">
                <v-radio
                    label="String"
                    :value="'string'"
                />
                <v-radio
                    label="Numerique"
                    :value="'number'"
                />
              </v-radio-group>
              <v-radio-group v-model="format">
                <v-radio
                    v-for="format in formats"
                    :key="format"
                    :label="format.label"
                    :value="format.value"
                ></v-radio>
              </v-radio-group>
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
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "AddFieldDialog",
  props: ['isOpen'],
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let localIsOpen = props.isOpen;

    const formats = ref([
      {value:'color' , label:'couleur'},
      {value:'date', label:'date'},
      {value: 'datetime-local', label:'date et heure'},
      {value: 'email', label:'mmail'},
      {value: 'month', label:'mois'},
      {value: 'password', label:'mot de passe'},
      {value: 'number', label:'nombre'},
      {value: 'range', label:'Intervalle'},
      {value: 'tel', label:'telephone'},
      {value:'text', label:'texte'},
      {value: 'textarea', label:'large texte'},
      {value: 'time', label:'heure'},
      {value:'url', label:'url'},
      {value: 'week', label:'semaine'}
    ])
    let title = ref('');
    let name = ref('');
    let description = ref('');
    let defaultValue = ref('');
    let type = ref('');
    let format = ref('');
    watch(() => props.isOpen, (nVal) => {
      localIsOpen = nVal
    });
    const closeDialog = () => {
      context.emit('closeDialog')
    }
    const save = () => {
      const field = {
        [name.value]: {
          title: title.value,
          description: description.value,
          type: type.value,
          default:defaultValue.value
        }
      }
      console.log('field   ',field)
      context.emit('addField', field)
    }
    return {
      localIsOpen, title, name, description, type,defaultValue,format,formats, save, closeDialog
    }
  },
}
</script>

<style scoped>

</style>
