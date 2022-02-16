<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >

    <v-card-title>
      {{fileData.name}}
    </v-card-title>
    <v-card-actions>
      <v-btn
          color="orange-lighten-2"
          variant="text"
          @click="dlFile()"
      >
        Telecharger
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

export default {
  name: "DowloadCard",
  props: {
    fileData: {
      type: Object,
      required: true
    }
  },
  methods: {
    dlFile() {
      console.log('fileData  ',this.fileData);
      this.$emit('dlFile', this.fileData.path);
    }
  }
}
</script>

<style scoped>

</style>
