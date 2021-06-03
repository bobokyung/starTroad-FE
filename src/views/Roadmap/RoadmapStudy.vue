<template>
  <b-container fluid class="comments-container">
    <b-button v-if="isMine" variant="primary" class="modify" @click="modifyStudy()">{{modify_text}}하기</b-button>
    <!-- 수정하기 들어갈 경우 -->
    <addRoadMapStudy v-if="modify" :option="modify" :roadmap_id="roadmap_id" :study_id="study_id" @modifyStudy="modifyStudy">
    </addRoadMapStudy>

    <div v-else class="comments-body-container">
      <div class="title">
        <h1>{{sample.name}}</h1>
        
      </div>
      <div class="author">
        <h2>{{sample.leader}}</h2>
        <span> commented at {{sample.created_at}} </span>
      </div>
      <div class="content">
        <div>{{sample.description}}</div>
      </div>

    <b-row class="text-right">
        <b-col class="status">
          <b-avatar variant="black" icon="people-fill" class="mr-3"></b-avatar>
          <span>{{sample.now_num}}/{{sample.max_num}}</span>
          <b-button class="join" :variant="sample.button_color" 
          :disabled="sample.button_valid" @click="studyButtonHandler(sample.study_status)">{{sample.button_text}}</b-button>
      </b-col>
    </b-row> 
    </div>
  </b-container>
</template>

<script>
import Api from '@/api/Api'
import moment from "moment";
import addRoadMapStudy from "./RoadmapStudyAdd"

export default {
  components : {
    addRoadMapStudy
  },
  props : {
    roadmap_id : null,
    study_id : null,
  },
  data () {
    return {
      button_disable : false,
      myComment : "",
      sample : {},
      isMine : false,
      modify : false,
      modify_text : "수정"
    }
  },
  // watch : {

  // },
  methods: {
    fetch(){
      this.sample = {}
      let roadmap_id = this.roadmap_id
      let study_id = this.study_id

      Api.getStudy(roadmap_id, study_id)
      .then((res) => {
        res.data.created_at = moment(res.data.created_at).format("yyyy-MM-DD HH:mm:ss")
        //studystatus 버튼 모양을 결정하기 위한 것들
        // 내가 만들고 내가 참여하고 있는 스터디 : 1 --> 삭제하기 버튼
        // 내가 만들지 않고 내가 참여하고 있는 스터디 : 2 --> 탈퇴하기 버튼
        // 내가 만들지 않고 내가 참가하기 신청을 한 스터디 : 3 --> 수락 대기중 버튼(비활성화)
        // 내가 만들지도 않고 내가 참여하고 있지도  스터디 : 3 --> 참가하기 버튼
        if(res.data.valid == "yes"){
          //내가 만든 스터디
          res.data.study_status = 1
          res.data.button_text = "삭제하기"
          res.data.button_color ="warning"
          res.data.button_valid = false
          this.isMine = true
        }else{
          //내가 만들지 않은 스터디
          if(res.data.joinValid == "yes"){
            // 내가 참여하고 있는 스터디
            res.data.study_status = 2
            res.data.button_text = "탈퇴하기"
            res.data.button_color ="warning"
            res.data.button_valid = false
          
          }else if(res.data.joinValid == "pending"){
            // 내가 참가하기 신청을 한 스터디
            res.data.study_status = 3
            res.data.button_text = "수락 대기중"
            res.data.button_color ="primary" 
            res.data.button_valid = true
          
          }else if(res.data.joinValid == "no"){ 
            // 내가 참여하고 있지 않은 스터디
            res.data.study_status = 4
            res.data.button_text = "참가하기"
            res.data.button_color ="success"
            res.data.button_valid = false
          }
        }

      
        console.log(res.data)
        this.sample = res.data
        

      })
    },
    
    studyButtonHandler(study_status){
      
      let roadmap_id = this.roadmap_id
      let study_id = this.study_id

      if(study_status == 1){
        //삭제하기
        Api.deleteStudy(roadmap_id, study_id)
        .then((res)=>{
          this.$router.push({path:`/roadmap/${roadmap_id}/study`})
        })

      }else if(study_status == 2){
        //탈퇴하기
        Api.withdrawStudy(roadmap_id,study_id)
        .then((res)=>{
          this.fetch()
        })

      }else if(study_status == 4){
        //참가하기
        Api.joinStudy(roadmap_id, study_id)
        .then((res)=>{
          this.fetch()
        })
      }

    },
    gotoparticipate(){
      this.$router.push({})
    },
    modifyStudy(){
      this.modify = !this.modify

      if(!this.modify){
        this.modify_text = "수정"
        this.fetch()
      }else{
        this.modify_text = "취소"
      }
    }
  },
  computed: {

  },
  mounted() {
    this.fetch()
  }
  
};
</script>

<style lang="scss" scoped>
.comments-container{
    max-width : 1000px;
    margin : 0 auto;
    
    .modify{
      display : block;
      margin : 0 0 10px 0;
    }
    .author > h2{
      display:inline
    }
    .author > span{
      width : 100%;
      font-size : 0.8rem;
      line-height : 1;
      display : inline;

    }
    .content{
      border-top : 1px solid #dee2e6;
      div{
        padding: 15px 0 0 0;
      }
    }
  .text-right{
    .status{
      margin : 10px 0;
      span{
        font-size : 1.5rem;
        vertical-align: middle;
        font-weight : bold;
      }
      .join{
        margin: 0 0 0 15px;
      }
    }
  }
  .comments-body-container{
    max-width : 1000px;
    margin : 0 auto;
    padding : 10px;
    border : 1px solid #dee2e6;
    border-radius : 8px;
  }
  .comments{
    border : 1px solid #cee2e6;
    border-radius : 8px;
    margin : 0 0 20px 0;
    .comments-header{
      background: #e9ecef;
      padding : 10px;
    }
    .content{
      padding : 10px;
    }
  }
  .add-comments{
    .btn{
      float:right;
    }
  }
}
</style>