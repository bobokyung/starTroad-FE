/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import Vuex from 'vuex'
import axios from 'axios'
import GAuth from 'vue-google-oauth2'

// router setup
import router from './routes/router';
import store from './store'
//import startRouter from './routes/startRouter'

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Vuex);
Vue.use(GAuth, {clientId: '839833191140-ljb88b6pkr5qebo9ogsp7gh64e82shvd.apps.googleusercontent.com', scope: 'profile email https://www.googleapis.com/auth/plus.login'})
//axios setup
Vue.prototype.$axios = axios
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, DELETE, PUT, POST";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
