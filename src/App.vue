<template>
  <v-app>

    <v-snackbar
            top
            color="red"
            :timeout=10000
            v-model="snackbar"
    >
      {{ snackbartext }}
      <v-btn
              color="primary"
              text
              @click="snackbar = false"
      >
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-snackbar>


    <v-content  >
      <v-layout align="center">
        <Intro v-if="gettingLocation"/>

        <div v-else>

          <GmapMap
                  :center=center_coordinates
                  :zoom="14"
                  :options="{
                       zoomControl: true,
                       mapTypeControl: false,
                       scaleControl: false,
                       streetViewControl: false,
                         scrollwheel: true,
                        zoomControlOptions: {
                            position: 3
                        },
                       rotateControl: false,
                       fullscreenControl: false,
                       disableDefaultUI: false
                     }"
                  style="width: 100%; height: 100%"
          >
            <GmapCircle
                    :center="home_coordinates"
                    :radius="radius"
                    :visible="true"
                    :options="{
                      fillColor:'green',
                      fillOpacity:0.2,
                      strokeWidth: 0,
                      strokeOpacity: 0.5,
                      strokeColor: 'green',
                    }"
            ></GmapCircle>
            <GmapMarker
                    @dragend="updateHomeCoordinates"
                    key="marker"
                    :icon="{ url: require('./assets/housemarker.png')}"
                    :position="home_coordinates"
                    :clickable="true"
                    :draggable="true"
            />
            <GmapPolyline
                    v-if="linepath" :path="linepath"
                    :options="{
                      geodesic: true,
                      strokeColor: color,
                      strokeOpacity: 0.6,
                      strokeWeight: 1,
                      icons: [{
                        icon: {
                          path: 'M 0,-1 0,1',
                          strokeOpacity: 1,
                          scale: 4
                        },
                        offset: '0',
                        repeat: '20px'
                      }],
                    }"
            />

            <GmapMarker
                    v-if="user_coordinates"
                    key="markeruser"
                    :icon="user_icon"
                    :animation="2"
                    :position="user_coordinates"
                    :clickable="false"
                    :draggable="false"
            />


          </GmapMap>



        </div>
      </v-layout>
    </v-content>


    <v-bottom-navigation
            fixed
            v-if="!gettingLocation"
            grow
            class="accent"
            color="primary"
    >


      <v-btn @click="setUserCoordinates">
        <div class="">Mi posición</div>
        <v-icon color="lightgray">mdi-flag</v-icon>
      </v-btn>
      <v-btn @click="sliderdialog=true">
        <span>{{radius/1000}}KM</span>
        <v-icon>mdi-map-marker-radius</v-icon>
      </v-btn>
      <v-btn @click="dialoginfo=true">
        <span>Info</span>
        <v-icon>mdi-help</v-icon>
      </v-btn>

    </v-bottom-navigation>

    <v-dialog v-model="dialoginfo" fullscreen hide-overlay transition="dialog-bottom-transition">
    <Info v-on:close-dialog="dialoginfo=false"></Info>
    </v-dialog>

    <v-dialog v-model="sliderdialog" >
      <template>
        <v-card class="pa-5">

          <span
                  class="display-3 font-weight-light text-center"
                  v-text="radius/1000"
          ></span>
          <span class="subheading font-weight-light mr-1">Km</span>

        <v-slider
                thumb-color="green"
                v-model="radius"
                step="500"
                min="500"
                thumb-label=""
                label=""
                max="5000"
                ticks
        ></v-slider>
        </v-card>
     </template>
    </v-dialog>

    <v-dialog v-model="address_dialog">
      <template>
        <v-card class="pa-5">
          <v-card-text>
          <h3>No ha sido posible obtener tu localización</h3>
            <p class="caption"><b class="text--primary">Puedes activar la opción de compatir ubicación en las <u>preferencias de tu navegador</u></b></p>
            <p class="caption">Si prefieres también puedes teclear tu dirección</p>

            <gmap-autocomplete  @place_changed="setAddress"
                                style="border: 1px solid rgba(0, 0, 0, 0.6); padding: 10px; border-radius: 8px; outline: none; width: 100%;"
                                placeholder="Dirección" class="introInput">
              <!-- Be sure to use v-slot:input="" the slotProps can be
               whatever you want but you must use that name in place of
              slotProps elsewhere in the slot -->
              <template v-slot:input="slotProps">

                <!-- ref="input" is requried
                v-on:listeners="slotProps.listeners" is required, rename slotProps here if you did in v-slot:input="slotProps" above
                v-on:attrs ="slotProps.attrs" may be required, rename slotProps here if you did in v-slot:input="slotProps" above
                -->
                <v-text-field outlined prepend-inner-icon="place"

                              placeholder="Location"
                              ref="input"
                              v-on:listeners="slotProps.listeners"
                              v-on:attrs="slotProps.attrs">
                </v-text-field>
              </template>
            </gmap-autocomplete>
          </v-card-text>
        </v-card>
      </template>

    </v-dialog>

  </v-app>
</template>

<script>
import Intro from './components/Intro';
import Info from './components/info';

import {gmapApi} from 'vue2-google-maps'
//AIzaSyDvnO_Nz0KbzumS9E3xxTgzeITMvEvJV58

export default {
  name: 'App',

  components: {
    Intro,
    Info,
  },

  data: () => ({
    sliderdialog:false,
    google: gmapApi,
    address_dialog:false,
    dialoginfo:false,
    activeBtn: 1,
    snackbartext:'',
    snackbar:false,
    gettingLocation:false,
    divorStr:null,
    color:'red',
    user_coordinates:null,
    radius:1000,
    home_coordinates : {
      lat: parseFloat('40.416775'),
      lng: parseFloat('-3.703790'),
    },
    center_coordinates : {
      lat: parseFloat('40.416775'),
      lng: parseFloat('-3.703790'),
    },
    linepath:null,
    user_icon:{
        path: 'M0 -36 L0 -20 24 -20 24 -36 M0 -36 L0 0 1 0 1 -20z', // SVG for flag
        scale: 0.7,
        fillColor: "#3f51b5",
        fillOpacity: 0.8,
        strokeWeight: 0.3,
        rotation: 35
    }
  }),
  created() {
    //do we support geolocation
    if(!("geolocation" in navigator)) {
      this.snackbar = true
      this.snackbartext = 'Geolocation is not available.';
      return;
    }

    let home_coordinates = window.localStorage.getItem("home_coordinates")

    console.log(home_coordinates)

    if(home_coordinates!= null){
      this.loadHomeCoordinates()
    }else{
      this.setHomeCoordinates()
    }

    this.setUserCoordinates()

  },
  watch:{
    user_coordinates(){
      this.updateLine()
    },
    home_coordinates(){
      this.updateLine()
    },
    radius(){
      this.updateLine()
    }
  },
  methods:{
    changeRadius(radius){
      console.log(radius)
    },
    updateHomeCoordinates(location) {
      console.log(location)
      this.home_coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      window.localStorage.setItem("home_coordinates", JSON.stringify(this.home_coordinates));
    },
    setHomeCoordinates(){

      console.log('setting local storage')

      this.gettingLocation = true;
      // get position

      let e=this

      navigator.geolocation.getCurrentPosition(pos => {

        console.log('position')
        console.log(pos)

        this.snackbartext = 'Puedes ajustar la posición del domicilio arrastrando y soltando el marcador'
        this.snackbar = true


        e.gettingLocation = false;

        e.home_coordinates = {
          lat:  pos.coords.latitude,
          lng:  pos.coords.longitude,
        }

        e.center_coordinates =  e.home_coordinates

        //save localstorage home coordinates
        window.localStorage.setItem("home_coordinates", JSON.stringify(e.home_coordinates));

      }, err => {
        e.address_dialog= true

        console.log(err)

      },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              })
    },
    setUserCoordinates(){

      console.log('setting local storage')

      this.user_coordinates = null
      // get position
      this.gettingLocation = true;
      let e=this

      navigator.geolocation.getCurrentPosition(pos => {
        e.gettingLocation = false;

        e.user_coordinates = {
          lat:  pos.coords.latitude,
          lng:  pos.coords.longitude,
        }
        e.center_coordinates = e.user_coordinates

        //save localstorage home coordinates

      }, err => {

        console.log('error')
        console.log(err)
        e.address_dialog= true;
        e.gettingLocation = false;
        e.snackbartext = err.message;

      })
    },
    loadHomeCoordinates(){

      this.snackbartext = 'Puedes ajustar la posición del domicilio arrastrando y soltando el marcador'
      this.snackbar = true

      this.home_coordinates = JSON.parse(window.localStorage.getItem("home_coordinates"));
      this.center_coordinates = JSON.parse(window.localStorage.getItem("home_coordinates"));

      this.gettingLocation=false
    },
    updateLine(){
      if(this.user_coordinates && this.home_coordinates) {
        this.linepath = [
          this.user_coordinates,
          this.home_coordinates,
        ];

        let lat1 = this.user_coordinates.lat
        let lat2 = this.home_coordinates.lat

        let lng1 = this.user_coordinates.lng
        let lng2 = this.home_coordinates.lng

        let R = 6378137;
        let dLat = this.degreesToRadians(lat2 - lat1);
        let dLong = this.degreesToRadians(lng2 - lng1);
        let a = Math.sin(dLat / 2)
                *
                Math.sin(dLat / 2)
                +
                Math.cos(this.degreesToRadians(lat1))
                *
                Math.cos(this.degreesToRadians(lat1))
                *
                Math.sin(dLong / 2)
                *
                Math.sin(dLong / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let distance = R * c;

        console.log(distance)

        if(distance > this.radius){
          this.color = 'red'
        }else{
          this.color = '#3f51b5'
        }
      }
    },
    degreesToRadians(degrees){
      return degrees * Math.PI / 180;
    },
    setAddress(addr){
      if (addr) {
        let cords= {
          lat:addr.geometry.location.lat(),
          lng:addr.geometry.location.lng()
        }

        console.log(addr)
        console.log(cords)

        this.home_coordinates= cords
        this.user_coordinates= cords
        this.center_coordinates= cords

        this.address_dialog=false
      }


    }
  }
};
</script>
<style>

  .vue-map-container{
      position: relative;
    width: 100vw;
    height: 100vh;
  }
  .vue-map{
      overflow: hidden;
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
  }
</style>