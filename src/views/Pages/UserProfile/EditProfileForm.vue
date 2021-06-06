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
              v-model="name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Major"
              placeholder="major"
              v-model="major"
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
              v-model="birth"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Interest</h6>

      
  <div>
      <b-form-select v-model="interest" class="from content"
      :options="options"></b-form-select>
  </div>

      <hr class="my-4">
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">

          <b-form-textarea rows="4" v-model="message" id="about-form-textaria"></b-form-textarea>
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
    
      imageData:'',
      values: [''],
      company: '',
      interest :  `[\"CS\", \"b\"]`,
      name: '',
      major:'',
      birth: '',
      postalCode: '',
      message: ''
      
    };
  },
  methods: {
    getProfile(){
      Api.getProfile()
      .then((res)=>{
        console.log(res.data)
        this.name = res.data.name || ''
        this.email = res.data.email || ''
        this.major = res.data.major || ''
        this.birth = res.data.birth || ''
        if(res.data.interest !=null){
          this.interest = JSON.parse(res.data.interest)[0]
        }

        this.message = res.data.message || ''

        console.log(this.email)
      })
      .catch((err) => {
        
      })

    },
    updateProfile() {
      //data는 user에 대한 정보일것이다.
      let email = this.email
      let data = {
        birth : this.birth,
        major : this.major,
        interest  : `[\"${this.interest}\", \"b\"]`,
        message : this.message,
        
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
    this.getProfile()
    console.log(this.email)
  },
  created(){

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
