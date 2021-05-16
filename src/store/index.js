import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { BIconNodePlusFill } from 'bootstrap-vue'
import Api from '../api/Api'
import GAuth from 'vue-google-oauth2'

Vue.use(Vuex)
const resourceHost = 'https://c2e79960-228b-4a11-8a9c-5f9973cd9f68.mock.pstmn.io/api'

const enhanceAccessToken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
  //axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrc3I5NzAzMzBAZ21haWwuY29tIiwiZXhwIjoxNjIwNTQyODE4LCJpYXQiOjE2MjA1MjQ4MTh9.QSIS9FcoTPh1zbRDaj34T2c1Am4iFxKUHq2vr_RRwHfA_nPp9U3hxqpZJjFXjE6TQEG8xsRnLxQy5AVRS5p84g`
}
enhanceAccessToken()

export default new Vuex.Store({
  state: {
    search : "",
    roadmap : {
      description : null,
      information : null,
    },
    personal : {
      name : "",
      email : "",
    },
    accessToken: null,
    description : null,
    information : null,
    roadmap_id : null,
    searchList : []
  },
  getters: {
    getName(state){
      return state.personal.name
    },
    description(state){
      return state.description
    },
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    }
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    GOOGLELOGIN(state, accessToken){
      console.log(accessToken)
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
      console.log(accessToken)
    },
    LOGOUT (state) {
      state.accessToken = null
      delete localStorage.accessToken
    },
    getProfile(state, personal){
      console.log(personal)
      state.personal = personal
    },
    getRoadmap(state, {roadmap}){
      state.roadmap = roadmap
    },
    setRoadmapId(state, roadmap_id){
      state.roadmap_id = roadmap_id
    },
    saveRoadmap(state, roadmap){
      state.roadmap = roadmap
    },
    saveInformation(state, information){
      //console.log(information)
      state.information = information
    },
    modifyInformation(state, information){
      state.roadmap.information = information
    },
    saveDescription(state, description){
      state.description = description
    },
    modifyDescription(state, description){
      state.roadmap.description = description
    },
    updateSearch(state, search){
      state.search = search
    },
    updateSearchList(state, list){
      state.searchList = list
    }
    
  },
  actions: {
    GOOGLELOGIN({commit}){
      this.$gAuth.getAuthCode()
      .then((authCode)=>{
        return this.$http.post('https://startroad.me/auth/google', { code: authCode, redirect_uri: 'postmessage' })
      })
      .then((res)=>{

      })
      .catch((err) => {
        console.log(err)
      })
      
      /*
      return Api.googleLogin()
      .then((res) =>{
        alert(res)
        console.log("Asdf")
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      */
      
      
    },
    LOGIN ({commit}, {email, password}) {
      return axios.post(`${resourceHost}/login`, {email, password})
        .then(({data}) => {
          console.log(data)
          commit('LOGIN', data)
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        })
    },
    LOGOUT ({commit}) {
      axios.defaults.headers.common['Authorization'] = undefined
      commit('LOGOUT')
    },
    getRoadmap({commit}, roadmap_id){
      return Api.getRoadmap(roadmap_id)
      .then((res) => {
        console.log(res)
        commit('getRoadmap', roadmap)
      })
      .catch((error) => {

      })

    },
    search({commit}, {name}){
      console.log("search")
      return Api.searchRoadmap({name})
      .then((data)=>{
        //console.log(data.data)
        data.data.forEach((v, i)=>{
          if(v.image == null){
            v.image = require('@/assets/default_roadmap.jpg')
          }
        })
        console.log(data.data)
        commit('updateSearchList', data.data)
        
      })
    }



  }
})
