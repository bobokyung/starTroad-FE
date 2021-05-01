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

    <hr>
    <h2>의견(3)</h2>

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
export default {
  components : {

  },
  data () {
    return {
      myComment : "",
      sample : {
        "id" : 1,
        "title" : "A 내용 추가해주세요",
        "author" : "sr",
        "created_at" : "2021-03-25 17:22:33",
        "content" : "A 내용이 상당히 중요해보여요 로드맵에 추가가 필요합니다.",
        "comments" : [
            {
                "author" : "sr2",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "그 내용은 더이상 쓰이지 않는 기술입니다."
            },
            {
                "author" : "sr3",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "그 내용은 더이상 쓰이지 않는 기술입니다."
            },
            {
                "author" : "sr4",
                "created_at" : "2021-03-25 17:22:33",
                "content" : "그 내용은 더이상 쓰이지 않는 기술입니다.",
            }
        ]
      }
    }
  },
  // watch : {

  // },
  methods: {

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