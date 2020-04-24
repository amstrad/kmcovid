<template>
  <v-container fluid>

    <v-row class="text-center" align="center"
           justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          1km Covid
        </h1>

        <v-alert outlined color="primary" class="subheading font-weight-regular">
         Necesitamos que aceptes compartir tu posición. La información no será guardada ni compartida externamente.
        </v-alert>

        <v-progress-circular
                class="mt-5"
                :size="100"
                :width="10"
                color="accent"
                indeterminate
        ></v-progress-circular>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Intro',

    data: () => ({

    }),
  }
</script>
