<template>
  <div>
    <div class="input">
        <input type="text" placeholder="Search" v-model="location">
        <button @click="search()">Search</button>
    </div>

    <div class="table" v-if="locs">
      <table>
        <tr>
          <th>Location</th>
          <th>Tempture</th>
          <th>Humandity</th>
          <th>Windfield</th>
          <th>Status</th>
        </tr>
        <tr v-for="item in locs" :index="item">
          <td class="loc">{{item.locationTxt}}</td>
          <td>{{item.tempTxt}}</td>
          <td>{{item.humidityTxt}}</td>
          <td>{{item.windTxt}}</td>
          <td><img :src="`${item.imgSrc}`"></td>
        </tr>


         <tr v-if="searchLocation" class="notWait">
          <td class="loc">{{searchLocation.locationTxt || 'No Location'}}</td>
          <td>{{searchLocation.tempTxt || 'No Location'}}</td>
          <td>{{searchLocation.humidityTxt || 'No Location'}}</td>
          <td>{{searchLocation.windTxt || 'No Location'}}</td>
          <td>
            <p v-if="!searchLocation.imgSrc">No Location</p>
            <img v-else :src="`${searchLocation.imgSrc}`"></td>
        </tr>

        <span v-else class="wait">
          <Wait v-if="wait"/>
        </span>
        

      </table>
    </div>
    
    <Spinner v-else/>

    
  </div>
</template>

<script>
import axios from 'axios'
import request from 'request'
import Spinner from '../components/spinner.vue'
import Wait from '../components/wait.vue'


export default {
  data() {
    return {
      locs:null,
      location:null,
      wait:false
    }
  },
  computed: {
    searchLocation:{
      get(){
        return this.$store.getters.locs
      },
      set(val){
        this.value=val
      }
    }
   
    },

  components:{Spinner,Wait},
  created() {
    axios.get(`${process.env.VUE_APP_SERVER}`).then((response)=>{
      this.locs=response.data
      console.log(this.locs)
    }).catch((e)=>{
      console.log(e)
    })
  },

  methods: {
    search(){
      var self=this
      self.wait=true
      this.$store.state.locsState=null
      this.$store.dispatch('searchLocation',self.location)
    }
  },
}
</script>

<style lang="scss">
@import "../scss/home.scss";
</style>