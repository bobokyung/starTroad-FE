<template>
  <b-container fluid class="comments-container">
    <div class="comments-body-container">
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
    </div>
    <b-row class="text-right">
        <b-col class="status">
          <b-avatar variant="black" icon="people-fill" class="mr-3"></b-avatar>
          <span>{{sample.now_num}}/{{sample.max_num}}</span>
          <b-button class="join" :variant="sample.button_color" :disabled="button_disable" @click="gotoparticipate()">{{sample.button_text}}</b-button>
      </b-col>
    </b-row> 
    <hr>
    <!-- <h2>댓글(3)</h2>

    <div class="comments" v-for="comment in sample.comments"
    :key="comment.id">
      <div class="comments-header">
        <div class="author">
          <h2>{{comment.author}}</h2>
          <span> commented at {{comment.created_at}} </span>
        </div>
      </div>
      <div class="content">
        <div>{{comment.content}}</div>
      </div>
    </div>
    
    <hr>
    <h2>댓글쓰기</h2>
    <div class ="add-comments">
      <b-form-textarea
        id="textarea-auto-height"
        v-model = "myComment"
        placeholder="의견을 남겨주세요."
        rows="3"
        max-rows="8"
      ></b-form-textarea>
      <b-button href="#" variant="primary">등록하기</b-button>
    </div> -->

  </b-container>
</template>

<script>
import Api from '@/api/Api'
import moment from "moment";

export default {
  props : {
    roadmap_id : null,
    study_id : null,
  },
  data () {
    return {
      button_disable : false,
      myComment : "",
      sample : {}
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
        // 내가 만들고 내가 참여하고 있는 스터디 : 1 --> 제거하기 버튼
        // 내가 만들지 않고 내가 참여하고 있는 스터디 : 2 --> 탈퇴하기 버튼
        // 내가 만들지 않고 내가 참가하기 신청을 한 스터디 : 3 --> 수락 대기중 버튼(비활성화)
        // 내가 만들지도 않고 내가 참여하고 있지도  스터디 : 3 --> 참가하기 버튼
        if(res.data.valid == "yes"){
          //내가 만든 스터디
          res.data.study_status = 1
          res.data.button_text = "제거하기"
          res.data.button_color ="warning"
          res.data.button_valid = true
        }else{
          //내가 만들지 않은 스터디
          if(res.data.joinValid == "yes"){
            // 내가 참여하고 있는 스터디
            res.data.study_status = 2
            res.data.button_text = "탈퇴하기"
            res.data.button_color ="warning"
            res.data.button_valid = true
          
          }else if(res.data.joinValid == "pending"){
            // 내가 참가하기 신청을 한 스터디
            res.data.study_status = 3
            res.data.button_text = "수락 대기중"
            res.data.button_color ="primary" 
            res.data.button_valid = false 
          
          }else if(res.data.joinValid == "no"){ 
            // 내가 참여하고 있지 않은 스터디
            res.data.study_status = 4
            res.data.button_text = "참가하기"
            res.data.button_color ="success"
            res.data.button_valid = true
          }
        }

      
        console.log(res.data)
        this.sample = res.data
        

      })
    },
    
    studyButtonHandler(){

    },
    gotoparticipate(){
      this.$router.push({})
    },

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