<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Edit profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoHome()">Settings</div>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>

      <div class="pl-lg-4">
        <!--프로필 이미지 주석 <div class="mb-2">
           <label>Profile Image <b-avatar size="20rem"></b-avatar></label>
            </div>

        <b-row>  
            <b-form-file
             v-model="user.imageData"
             :state="Boolean(user.imageData)"
             placeholder="Choose a prorfile image or drop it here..."
             drop-placeholder="Drop file here..."
             ></b-form-file>
        </b-row>
        -->
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Name"
              placeholder="Name"
              v-model="user.name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Major"
              placeholder="major"
              v-model="user.major"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
             <base-input
              type="text"
              label="birth"
              placeholder="YYYY-MM-DD"
              v-model="user.birth"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Contact information</h6>

      
  <div>
      <b-form-select v-model="selected" class="from content"
      :options="options"></b-form-select>
  </div>

      <hr class="my-4">
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">
        <b-form-group label="About Me" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" value="" id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>
<script>
import Api from '@/api/Api'

export default {
  data() {
    return {
      selected : null,
      options: [
        { value: null, text: '카테고리를 선택해주세요' },
        { value: "CS", text: 'Computer Science' },
        { value: "MATH", text: 'Mathematics' },
        { value: "STATS", text: 'Statistics' },
      ],
      user: {
        imageData:'',
        values: [''],
        company: '',
        
        name: '',
        major:'',
        birth: '',
        postalCode: '',
        aboutMe: ''
      }
    };
  },
  methods: {
    getProfile(){
      Api.getProfile()
      .then((res)=>{
        console.log(res)
      })
      .catch((err) => {
        
      })

    },
    updateProfile(data) {
      //data는 user에 대한 정보일것이다.
      Api.updateProfile(data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        
      })
    },
    gotoHome(){
      this.$router.push({path:'/home'})
    }
    
  },
  mounted(){
    
  },
  created(){
    this.getProfile()
  }
};
</script>
<style scoped>
.btn{
  cursor : pointer;
}
</style>
