<template>
  <b-container fluid class="comments-container">
    <div class="comments-body-container">
      <div class="title">
        <h1>{{sample.name}}</h1>
      </div>
      <div class="author">
        <h2>{{sample.talk_writer}}</h2>
        <span> commented at {{sample.created_at}} </span>
      </div>
      <div class="content">
        <div>{{sample.description}}</div>
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
      </div>
      <div class="content">
        <div>{{comment.content}}</div>
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
      <b-button href="#" variant="primary">등록하기</b-button>
    </div>

  </b-container>
</template>

<script>
import Api from '@/api/Api'
export default {
  components : {

  },
  props : {
    roadmap_id : null,
    talk_id : null,
  },
  data () {
    return {
      myComment : "",
      sample : null,
      commentLength : 0,

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
        console.log("res")
        console.log(res.data)
        this.sample = res.data
        this.commentLength = this.sample.myComments.length
        console.log(this.sample.myComments)

      })
    }
  },
  computed: {

  },
  mounted() {
    console.log("mounted")
    console.log(this.roadmap_id, this.talk_id)
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