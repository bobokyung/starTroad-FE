<template>
  <card>
    <b-row>
        <b-col cols="8">
        <h3 class="mb-0">{{option_text}} Content</h3>
        </b-col>
    <b-col class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoComplete()">complete</div>
    </b-col>
    </b-row>

    <b-form @submit.prevent="updateTalk">
      <div class="pl-lg-4">   
        <b-row>
          <b-col>
             <base-input
              type="text"
              label="title"
              placeholder="Title"
              v-model="title"
            >
            </base-input>
          </b-col>
        </b-row>
        <hr>
      </div>
      <div class="pl-lg-4">
        <label for="range-2">모집인원</label>
        <b-form-input id="range-2" v-model="value" type="range" min="2" max="15" step="1"></b-form-input>
        <div class="mt-2">스터디 인원 : {{ value }}</div>
        <hr>
      </div>
      <div v-if="this.option" class="pl-lg-4">
        <b-form-group label="스터디 상태" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            v-model="status"
            :options="status_options"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
        <hr>
      </div>
      <div class="pl-lg-4">
        <b-form-group label="content" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
          <b-form-textarea rows="10" v-model="content" id="about-form-textaria" placeholder="내용을 입력하세요.(시간,장소,진행방식)"></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>

<script>
import Api from '@/api/Api'
export default {
  props : {
    roadmap_id : null,
    study_id : null,
    option : null,
  },
  data () {
    return {
      title : '',
      value : 5,
      content : '',
      status : null,
      status_options : [
        {text:"모집중", value:0},
        {text:"모집완료", value:1},
        {text:"진행중", value:2},
        {text:"스터디종료", value:3},
      ],
      option_text : 'Add',
      sample : {}
    }
  }, 
  methods: {
    updateTalk() {
      alert('' + JSON.stringify());
    },
    gotoComplete(){
      let roadmap_id = this.roadmap_id
      let study_id = this.study_id

      let data = {
        name : this.title,
        follow_map : this.roadmap_id,
        description : this.content,
        max_num : this.value,
      }
      if(this.option){
        data.status = this.status
        Api.modifyStudyList(roadmap_id, study_id, data)
        .then((res)=>{
          //상위 컴포넌트로 emit
          this.$emit("modifyStudy")

        })
      }else{
        Api.addStudyList(roadmap_id, data)
        .then((res)=>{
          this.$router.push({path:`/roadmap/${roadmap_id}/study`})
        })
      }
    },
    fetch(){
      let roadmap_id = this.roadmap_id
      let study_id = this.study_id
      
      Api.getStudy(roadmap_id, study_id)
      .then((res)=>{
        this.title = res.data.name
        this.value = res.data.max_num
        this.content = res.data.description
        this.status = res.data.status
      })
    }
  },
  mounted(){
    if(this.option){
      this.fetch()
      this.option_text = "Modify"

    }
  },
  created(){
  }
  
};
</script>
<style scoped>
.btn{
  cursor : pointer;
}
.custom-control{
  padding-left : 24px;
}
</style>