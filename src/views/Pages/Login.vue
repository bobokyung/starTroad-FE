<template>
  <div>
    <!-- Header -->
    <div class="header py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="">Welcome! starTroad</h1>
              <p class="text-lead "></p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"  >
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <!--<a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>github로그인-->
                <!--https://startroad.me/api/auth/google -->
                <!-- javascript:void(0) -->
                <a href="javascript:void(0)" @click="googleLogin()" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </b-card-header>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Api from '../../api/Api'
  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
          rememberMe: false
        }
      };
    },
    methods: {
      googleLogin(){
        this.$gAuth.signIn()
        .then((GoogleUser) => {
          let data = {
            access_token : GoogleUser.qc.access_token
          }
          Api.googleLoginDirect(data)
          .then((res)=>{
            //console.log(res)
            this.$store.commit('GOOGLELOGIN', res.data)
            //나중에 수정할것 이위치에 action으로 그 accesstoken이 valid한지 valid하지 않은지 해야함
            //dispatch로 하고 그다음에 redirect해야함 지금 시간이 없어서 제외함
            this.redirect()
          })
          .catch((err) => {
          })

        })
        .catch((error) => {
        })
      },
      onSubmit() {
        let email = this.model.email
        let password = this.model.password
        //password = this.model.password
        this.$store.dispatch('LOGIN', {email, password})
          .then(() => this.redirect())
          .catch(({message}) => this.msg = message)
      },
      redirect() {
        /*
        const {search} = window.location
        const tokens = search.replace(/^\?/, '').split('&')
        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})
        */
        this.$router.push('/home')
      }
    }
  };
</script>
