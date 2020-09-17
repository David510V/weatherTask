import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

require('dotenv').config()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locsState:null
  },
  mutations: {
    'createLocation'(state,data){
      state.locsState=data
    }
  },
  actions: {
    searchLocation:({commit},location)=>{
      axios.post(`${process.env.VUE_APP_SERVER}/name`,
      {
        name:location
      })
      .then((res)=>{
        commit('createLocation',res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    }
  },
  getters:{
    locs(state){
      return state.locsState
    }
  },
  modules: {
  }
})
