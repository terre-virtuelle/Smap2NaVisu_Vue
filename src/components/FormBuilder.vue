<template>
  <v-container>
    <AddSectionDialog v-if="addSectionDialogIsOpen" :is-open="addSectionDialogIsOpen"
                      @closeDialog="closeAddSectionDialog" @addSection="addSection"/>
    <AddFieldDialog v-if="addFieldIsOpen" :is-open="addFieldIsOpen"
                    @closeDialog="closeAddFieldDialog" @addField="addField" />
    <v-row>
    <v-col
        cols="6"
    >
    <v-form>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
          <v-text-field
              v-model="localSchemaUsed.schema.title"
              label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-row>
          <SectionDisplay v-if="asContent" :sections="localSchemaUsed.schema.properties" @openAddFieldDialog="openAddFieldDialog"/>
        </v-row>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
          <v-btn
              variant="outlined"
              size="large"
              color="info"
              @click="openAddSectionDialog"
          >
            Add new section
          </v-btn>
          <v-btn
              variant="outlined"
              size="large"
              color="info"
              @click="openAddFieldDialog"
          >
            Add new Field
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
          <v-btn
              color="primary"
          >
            Save
          </v-btn>
          <v-btn
              color="primary"
              @click="showPreview"
          >
            Show preview
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    </v-col>
    <v-col
        cols="6"
    >
      <FormDisplay v-if="prevIsDispay" :form-schema="localSchemaUsed"/>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddSectionDialog from "@/components/AddSectionDialog";
import SectionDisplay from "@/components/SectionDisplay";
import AddFieldDialog from "@/components/AddFieldDialog";
import FormDisplay from "@/components/FormDisplay";
import {ref} from "vue";
import Utils from "@/Utils";

export default {
  name: "FormBuilder",
  components: {AddSectionDialog, SectionDisplay,AddFieldDialog,FormDisplay},
  props: ['schemaUsed'],
  setup() {
    const localSchemaUsed = initNewSchema();
    const addSectionDialogIsOpen = ref(false);
    const addFieldIsOpen = ref(false);
    const asContent = ref(false);
    const sectionSelected = ref(null)
    const prevIsDispay = ref(false)

    function initNewSchema() {
      return {
        theme: 'bootstrap4',
        iconlib: 'fontawesome4', schema: {
          title: '', type: 'object', options: {
            disable_edit_json: true,
            disable_properties: true
          }, properties: {},
        }
      }
    }

    return {localSchemaUsed, addSectionDialogIsOpen, asContent,addFieldIsOpen,sectionSelected,prevIsDispay};
  },
  methods: {
    closeAddSectionDialog() {
      this.addSectionDialogIsOpen = false;
    },
    openAddSectionDialog() {
      this.addSectionDialogIsOpen = true;
    },
    closeAddFieldDialog() {
      this.addFieldIsOpen = false;
    },
    openAddFieldDialog(asSection=null) {
      this.sectionSelected = asSection;
      this.addFieldIsOpen = true;
    },
    addSection(section) {
      this.localSchemaUsed.schema.properties = {...this.localSchemaUsed.schema.properties,...section};
      this.asContent = true
      this.closeAddSectionDialog()
    },
    addField(field) {
      this.asContent = true
      if (!this.sectionSelected){
        this.localSchemaUsed.schema.properties = {...this.localSchemaUsed.schema.properties,...field};
      }else {
        const schemaUsed = Utils.deepCloneObject(this.localSchemaUsed);
        const nodesLenght = this.sectionSelected.length
        let schemaProprieties = schemaUsed.schema.properties;
        this.sectionSelected.forEach((node,index) => {
          if ((index+1) === nodesLenght){
            schemaProprieties[node] = {...schemaProprieties[node],properties:{...schemaProprieties[node].properties,...field}}
          }else {
            schemaProprieties = index === 0 ? schemaProprieties[node] : schemaProprieties[node].properties ;
          }
        }  )
        schemaUsed.schema.properties = schemaProprieties;
        this.localSchemaUsed = Utils.deepCloneObject(schemaUsed)
      }
      this.closeAddFieldDialog()
      this.sectionSelected = null;
    },
    showPreview() {
       this.prevIsDispay  = true
      //this.$emit('loadSchema', this.localSchemaUsed)
    },
  }
}
</script>

<style scoped>

</style>
