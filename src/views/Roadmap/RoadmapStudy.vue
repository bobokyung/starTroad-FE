<template>
  <b-container fluid class="comments-container">
    <div class="comments-body-container">
      <div class="title">
        <h1>{{sample.title}}</h1>
        
      </div>
      <div class="author">
        <h2>{{sample.author}}</h2>
        <span> commented at {{sample.created_at}} </span>
      </div>
      <div class="content">
        <div>{{sample.content}}</div>
      </div>
    </div>
    <b-row class="text-right">
        <b-col class="status">
           <b-avatar variant="black" icon="people-fill" class="mr-3"></b-avatar>
        <span>{{sample.status}}/{{sample.max_num}}     </span>
      </b-col>
        <b-col  cols="1" class="btn btn-sm btn-primary" @click="gotoparticipate()">스터디 참가</b-col>
    </b-row> 
    <hr>
    <h2>댓글(3)</h2>

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
    </div>

  </b-container>
</template>

<script>
export default {
  components : {

  },
  data () {
    return {
      myComment : "",
      sample : {
        "id" : 1,
        "title" : "javascript 공부같이 합시당~!",
        "author" : "sr",
        "created_at" : "2021-03-25 17:22:33",
        "content" : "자바스크립트 공부 같이할사람 구합니다. 월요일 7시 가능한사람 요청버튼 눌러주세요",
        "status" : 3,
        "max_num" : 6,
        "comments" : [
            {
                "author" : "sr",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "요청 보냈습니당"
            },
            {
                "author" : "es",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "저랑 같이 공부해요."
            },
            {
                "author" : "bk",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "저도 스터디 참가하고싶습니다!",
            }
        ]
      }
    }
  },
  // watch : {

  // },
  methods: {
     gotoparticipate(){
      this.$router.push({})
    },

  },
  computed: {

  },
  mounted() {
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