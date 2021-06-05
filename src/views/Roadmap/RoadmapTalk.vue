<template>
  <b-container fluid class="comments-container">
    <div class="comments-body-container">
      <div class="title">
        <h1 v-if="!talk_edit">{{sample.name}}</h1>
        <b-form-input
          class="title-input"
          v-else
          v-model="sample.name"
          required
        ></b-form-input>
        
        <p class="edit-delete h3">
          <b-icon-pencil-fill @click="editTalk()"></b-icon-pencil-fill>
          <b-icon-x @click="deleteTalk()"></b-icon-x>
        </p>
      </div>
      <div class="author">
        <h2>{{sample.talk_writer}}</h2>
        <span> commented at {{sample.created_at}} </span>
      </div>
      <div class="content">
        <div v-if="!talk_edit">{{sample.description}}</div>
        <b-form-textarea
          v-else
          v-model = "sample.description"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
      </div>
    </div>

    <hr>
    <h2>의견({{commentLength}})</h2>

    <div class="comments" v-for="comment in sample.myComments"
    :key="comment.id">
      <div class="comments-header">
        <div class="author">
          <h2>{{comment.comment_writer}}</h2>
          <span> commented at {{comment.created_at}} </span>
        </div>
        <p v-if="comment.commentValid" class="edit-delete h3">
          <b-icon-pencil-fill @click="editComment(comment)"></b-icon-pencil-fill>
          <b-icon-x @click="deleteComment(comment)"></b-icon-x>
        </p>
      </div>
      <div class="content">
        <div v-if="!comment.edit">{{comment.content}}</div>
          <b-form-textarea
            v-else
            id="textarea-auto-height"
            v-model = "comment.content"
            rows="3"
            max-rows="8"
          ></b-form-textarea>
      </div>
    </div>
    
    <hr>
    <h2>내 의견</h2>
    <div class ="add-comments">
      <b-form-textarea
        id="textarea-auto-height"
        v-model = "myComment"
        placeholder="의견을 남겨주세요."
        rows="3"
        max-rows="8"
      ></b-form-textarea>
      <b-button href="#" variant="primary" @click="addComment()">등록하기</b-button>
    </div>

  </b-container>
</template>

<script>
import Api from '@/api/Api'
export default {
  props : {
    roadmap_id : null,
    talk_id : null,
  },
  data () {
    return {
      myComment : "",
      sample : null,
      commentLength : 0,
      talk_edit : false

    }
  },
  // watch : {

  // },
  methods: {
    fetch(){
      this.sample = {}
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id

      Api.getTalk(roadmap_id, talk_id)
      .then((res) => {

        res.data.myComments.forEach((v, i) => {
          v.commentValid = v.commentValid =="yes" ? true : false
          v.edit = false
        })

        this.sample = res.data
        this.commentLength = this.sample.myComments.length

      })
    },
    deleteTalk(){
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id
      
      Api.deleteTalk(roadmap_id, talk_id)
      .then((res)=>{
        this.$router.push(`/roadmap/${roadmap_id}/talk`)
      })

    },
    editTalk(){
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id
      
      let data = {
        name : this.sample.name,
        description : this.sample.description

      }

      if(this.talk_edit){
        Api.editTalk(roadmap_id, talk_id, data)
        .then((res)=>{
          this.talk_edit = !this.talk_edit
        })
      }else{
        this.talk_edit = !this.talk_edit
      }
    },
    addComment(){
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id

      let data = {
        content : this.myComment
      }
      Api.addComment(roadmap_id, talk_id, data)
      .then((res) => {
        this.fetch()
      })
    },
    deleteComment(comment){
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id
      let comment_id = comment.id

      Api.deleteComment(roadmap_id, talk_id, comment_id)
      .then((res)=>{
        this.fetch()
      })
      
    },
    editComment(comment){
      let roadmap_id = this.roadmap_id
      let talk_id = this.talk_id
      let comment_id = comment.id
      let data = {
        content : comment.content
      }

      if(comment.edit){
        Api.editComment(roadmap_id, talk_id, comment_id, data)
        .then((res)=>{
          comment.edit = !comment.edit
        })
      }else{
        comment.edit = !comment.edit
      }
    }
  },
  computed: {

  },
  mounted() {
    this.fetch()
  },
  created(){
    
  }
  
};
</script>

<style lang="scss" scoped>
.comments-container{
    max-width : 1000px;
    margin : 0 auto;
     .edit-delete{
        margin : 0 0 0 auto;
        svg{
          cursor : pointer;
          margin : 0 4px;
        }
      }
    .title-input{
      width : 80%;
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
  .comments-body-container{
    max-width : 1000px;
    margin : 0 auto;
    padding : 10px;
    border : 1px solid #dee2e6;
    border-radius : 8px;
  }
  .title{
    display : flex;
    justify-content: space-between;
  }
  .comments{
    border : 1px solid #cee2e6;
    border-radius : 8px;
    margin : 0 0 20px 0;
    .comments-header{
      display : flex;
      justify-content: space-between;
      background: #e9ecef;
      padding : 10px;

      .edit-delete{
        margin : 0 0 0 auto;

      }


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