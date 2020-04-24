<template>


    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closedialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Información</v-toolbar-title><v-icon>mdi-map-marker-radius</v-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items>

        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Recuerda</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Horario</v-list-item-title>
            <v-list-item-subtitle>de 9 de la mañana hasta las 21 horas</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Donde</v-list-item-title>
            <v-list-item-subtitle>Un máximo de 1km de radio del domicilio. Recuerda llevar algún documento donde puedas acreditar tu residencia en todo momento</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Condiciones</v-list-item-title>
            <v-list-item-subtitle>Un máximo de 3 niños menores de 14 años.</v-list-item-subtitle>
            <v-list-item-subtitle>Un único adulto que conviva con los menores en su domicilio</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-list>




      <v-divider></v-divider>

      <v-layout class="pa-4">
        <v-flex xs12>

          <v-alert dense outlined color="red">
            <v-btn @click="deleteLocalData" color="error" class="mt-1" small><v-icon>mdi-delete</v-icon> Eliminar datos locales</v-btn>
          </v-alert>

          <b>Esta App usa Google Analytics</b> para hacer seguimiento de uso y visitas. <a href="https://policies.google.com/privacy?hl=es">Consulta la política de privacidad de Google</a>. No usamos cookies. No guardamos, almacenamos ni compartimos datos o localizaciones.

          <h4 class="mt-5 mb-5">Compartir</h4>
          <social-sharing url="https://kmcovid.web.app/"
                          title="1km Covid"
                          description="Utilidad para padres durante el desconfinamiento del Covid-19"
                          hashtags="Covid_19,desconfinamiento"
                          inline-template>
            <div>
              <network network="email" class="v-btn v-btn--contained theme--light v-size--default">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-email theme--light"></i>
              </network>
              <network network="facebook" class="v-btn v-btn--contained theme--light v-size--default  ml-1">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-facebook theme--light"></i>
              </network>

              <network network="twitter" class="v-btn v-btn--contained theme--light v-size--default  ml-1">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-twitter theme--light"></i>
              </network>
              <network network="whatsapp" class="v-btn v-btn--contained theme--light v-size--default  ml-1">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-whatsapp theme--light"></i>
              </network>
            </div>
          </social-sharing>



          <v-divider class="mt-5 mb-5"></v-divider>

          <v-btn color="white" depressed small target="_blank" href="https://www.linkedin.com/in/diegogarciadev/"><v-icon small>mdi-linkedin</v-icon> Desarrollado por D.García</v-btn>

        </v-flex>


      </v-layout>

    </v-card>

</template>

<script>
  export default {
    name: 'Info',
    methods:{
      deleteLocalData(){
        window.localStorage.clear();
        window.location.reload();
      },
      closedialog(){
        this.$emit('close-dialog')
      }
    }
  }
</script>
