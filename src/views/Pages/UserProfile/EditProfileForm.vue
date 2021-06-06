<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Edit profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <div class="btn btn-primary" @click="gotoHome()">뒤로가기</div>
        <div class="btn btn-success" @click="updateProfile()">업데이트</div>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>

      <div class="pl-lg-4">
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Name"
              placeholder="Name"
              disabled
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
      <h6 class="heading-small text-muted mb-4">Interest</h6>

      
  <div>
      <b-form-select v-model="user.interest" class="from content"
      :options="options"></b-form-select>
  </div>

      <hr class="my-4">
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">

          <b-form-textarea rows="4" v-model="user.message" id="about-form-textaria"></b-form-textarea>
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
        interest : '',
        name: '',
        major:'',
        birth: '',
        postalCode: '',
        message: ''
      }
    };
  },
  methods: {
    getProfile(){
      Api.getProfile()
      .then((res)=>{
        this.user.name = res.data.name
        this.user.major = res.data.major
        this.user.birth = res.data.birth
        this.user.interest = JSON.parse(res.data.interest)[0]
        this.user.message = res.data.message
        this.user.email = res.data.email

      })
      .catch((err) => {
        
      })

    },
    updateProfile() {
      //data는 user에 대한 정보일것이다.
      let email = this.user.email
      let data = {
        birth : this.user.birth,
        major : this.user.major,
        interest  : `[\"${this.user.interest}\", \"b\"]`,
        message : this.user.message,
        
      }
      Api.updateProfile(email, data)
      .then((res) => {
        this.getProfile()
        alert('수정되었습니다.');
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
.btn-primary{
  margin : 0
}
.text-right{

}
</style>
