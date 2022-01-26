<template>
  <v-row justify="center">
    <v-dialog
        v-model="localIsOpen"
        persistent
        max-width="1800px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajouter une question</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="title"
                  label="Title"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="name"
                  label="Name"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
            >
              <v-text-field
                  v-model="description"
                  label="Description"
              ></v-text-field>
            </v-col>
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
  </v-row>
</template>

<script>
import {watch, ref} from "vue";

export default {
  name: "AddSectionDialog",
  props: ['isOpen'],
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let localIsOpen = props.isOpen;
    let title = ref('');
    let name = ref('');
    let description = ref('');
    watch(() => props.isOpen, (nVal) => {
      localIsOpen = nVal
    });
    const closeDialog = () => {
      context.emit('closeDialog')
    }
    const save = () => {
      const section = {
          [name.value]: {
          title:title.value,
              description:description.value,
            type:'object',
            "format": "grid-strict",
            "options": {
              "disable_edit_json": true,
              "disable_properties": true,
              "grid_columns": 3
            },
        }
      }
      context.emit('addSection', section)
    }
    return {
      localIsOpen, title, name, description, save ,closeDialog
    }
  },
}
</script>

<style scoped>

</style>
