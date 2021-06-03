<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{'navbar-light': type === 'default'}"
  >
    <a href="#" aria-current="page" class="nav-title h1 mb-0 text-uppercase d-none d-lg-inline-block active router-link-active"> {{$route.name}} </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
        <b-form class="navbar-search form-inline mr-sm-3"
            :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'default'}"
            id="navbar-search-main">
        <b-form-group class="mb-0">
          <!--검색창 주석처리--> <b-input-group class="input-group-alternative input-group-merge">
            <b-form-input placeholder="Search" type="text" v-model="search" @keyup.enter="goSearch()"> </b-form-input>
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search" @click="goSearch()"></i></span>
            </div>
          </b-input-group>
        </b-form-group>
      </b-form>
      
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" animation="cylon-vertical" src="https://png.pngtree.com/png-vector/20190217/ourlarge/pngtree-vector-notification-icon-png-image_555490.jpg">
                    <!--<img alt="Image placeholder" src="https://cdn5.vectorstock.com/i/thumb-large/03/84/alarm-bell-icon-vector-21810384.jpg">-->
                    
                  </span>
      
          </b-media>
        </a>

        <template>

          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">notice</h6>
          </b-dropdown-header>
          <b-dropdown-item v-for="sample in sampleList" :key="sample.requester" @click="Toast()">
           
              <h8 class="text-overflow m-0">{{sample.requester}} 님의 {{sample.studyId}} 스터디 참여 요청</h8>
              <div class="text-right"> 
                <b-button size="sm" @click="showBottom_accept = !showBottom_accept">
                 수락
              </b-button>
               <b-button size="sm" @click="showBottom_deny = !showBottom_deny">
                 거절
              </b-button> 
                <!--<b-button variant="outline-primary" @click="makeToast()">수락</b-button>
                <b-button variant="outline-primary" @click="goDeny()">거절</b-button>-->
              </div>
            
          </b-dropdown-item>
        </template>


      </base-dropdown>
      <b-alert
      v-model="showBottom_accept"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="info"
      dismissible
    >
      수락하였습니다!
    </b-alert>
    <b-alert
      v-model="showBottom_deny"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="warning"
      dismissible
      auto-hide-delay=1000
    >
      거절하였습니다!
    </b-alert>

      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
                  
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{profileName}}</span>
            </b-media-body>
          </b-media>
        </a>

        <template>

          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item @click="goProfile()">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </b-dropdown-item>
          
          
          <div class="dropdown-divider"></div>
          <b-dropdown-item @click="logOut()">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </b-dropdown-item>

        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import Api from '@/api/Api'
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import store from "@/store"

export default {
  data() {
    return {
      sampleList : [
        {
          "requester" : "SR",
          "studyId" : "vue.js"
        },
        { 
          "requester" : "ES",
          "studyId" : "node.js"
        },
        { 
          "requester" : "BK",
          "studyId" : "frontend"
        },
      ],
      showBottom_accept: false,
      showBottom_deny: false,

      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
    };
  },
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  watch : {
    // search : function(newv){
    //   console.log(this.$store.state.search)
    // }
  },
  computed: {
    search:{
      get(){
        return this.$store.state.search
      },
      set(value){
        this.$store.commit("updateSearch", value)
      }

    },
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    profileName(){
      return this.$store.getters.getName
    }
  },
  methods: {
    getProfile(){
      Api.getProfile()
      .then((res)=>{
        this.$store.commit("getProfile", res.data)
        
      })
      .catch((err) => {
        console.log(err)
      })
    },
    logOut(){
      store.dispatch("LOGOUT").then(() => {
        this.$router.go('/home')
      })
    },
    goProfile(){
      this.$router.push("/profile")
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    goSearch(){
      let query = {
        //tag : "",
        name : this.search
      }
      this.$store.dispatch('search', query)
      this.$router.push({path : '/search', query:query}).catch(()=>{});
    },
    Toast(append = false) {
        this.$bvToast.toast(`This is toast number`, {
          title: 'BootstrapVue Toast',
           autoHideDelay: no-auto-hide,
          appendToast: append,
          variant: 'warning',
          toaster: 'b-toaster-top-right'
        })
    },
    makeToast(variant = null){
        this.$bvToast.toast('수락하였습니다.', {
          title: `수락하였습니다`,
          variant: "b-toaster-top-center",
          solid: true
        })
    },
    goDeny(){
      this.$bvToast.toast('거절하였습니다.', {
          title: "알림",
        })

    },
  },
  mounted(){
    this.getProfile()
  },
  created(){
    this.getProfile()
  }
};
</script>
<style scoped>
.nav-title{
  font-weight:700;
  font-size : 2.5rem;
}
.input-group-append{
  cursor: pointer;
}
</style>
