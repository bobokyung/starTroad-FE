import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { BIconNodePlusFill } from 'bootstrap-vue'
import Api from '../api/Api'

Vue.use(Vuex)
const resourceHost = 'http://localhost:3000/api'

const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
enhanceAccessToeken()

export default new Vuex.Store({
  state: {
    accessToken: null,
    roadmap : null,

  },
  getters: {
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
    LOGOUT (state) {
      state.accessToken = null
      delete localStorage.accessToken
    },
    getRoadmap(state, {roadmap}){
      state.roadmap = roadmap
    }
  },
  actions: {
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
        
        commit('getRoadmap', roadmap)
      })
      .catch((error) => {

      })

    }


  }
})
