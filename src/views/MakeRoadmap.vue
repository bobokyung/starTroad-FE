<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">

    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
          <b-col lg="12" class="title-content-container">
            <b-button class="button" variant="success" @click="saveRoadmap()">저장하기</b-button>            
          </b-col>
          <b-col lg="6" class="title-content-container">            
            <b-form-input class="form title" label="TITLE"
            v-model="form.title" placeholder="로드맵의 제목을 입력해주세요">
            </b-form-input>
          </b-col>
          <b-col lg="3" class="title-content-container">            
            <b-form-input class="form title" label="TITLE"
            v-model="form.img" placeholder="로드맵의 썸네일 이미지 링크를 입력해주세요">
            </b-form-input>
          </b-col>
          <b-col lg ="3" class="title-content-container">
            <b-form-select v-model="form.category" class="from content"
            placeholder="카테코리를 선택해주세요"
            :options="options"></b-form-select>
          </b-col>
          <b-col class="title-content-container">
            <b-form-input class="form content"
            v-model="form.content" placeholder="로드맵의 콘텐츠를 입력해주세요">
            </b-form-input>
          </b-col>
          <b-col lg="12" class="roadmap-container">
            <b-tabs content-class="mt-3" fill>
              <b-tab class="tab" title="MAP" active>
                <RoadmapDiagram :isMine=isMine></RoadmapDiagram>
              </b-tab>
              <b-tab class="tab" title="Detail" >
                <RoadmapDetail :isMine=isMine></RoadmapDetail>
              </b-tab>
              <!--=<b-tab class="tab" title="Talk" >
                <RoadmapTalk></RoadmapTalk>
              </b-tab>
              <b-tab class="tab" title="Study" disabled><p>I'm a disabled tab!</p></b-tab> -->
            </b-tabs>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import RoadmapDiagram from "../views/Roadmap/RoadmapDiagram"
import RoadmapDetail from "../views/Roadmap/RoadmapDetail"
import Api from '@/api/Api'

export default {
  components : {
    RoadmapDiagram,
    RoadmapDetail
  },
  data(){
    return {
      isMine : true,
      form : {
        title : "",
        content : "",
        img : "",
        category: "",
      },
      isActive : false,
      options: [
        { value: null, text: '카테고리를 선택해주세요' },
        { value: "CS", text: 'Computer Science' },
        { value: "MATH", text: 'Mathematics' },
        { value: "STATS", text: 'Statistics' },
      ]
    }
  },
  computed :{
    
  },
  methods:{
    initialize(){
      this.$store.getters.description = null
    },
    saveRoadmap(){
      let description = this.$store.state.description
      let information = this.$store.state.information
      //console.log(description, information)
      let body = {
        name : this.form.title,
        summary : this.form.content,
        tag : this.form.category,
        image : this.form.img,
        description : description,
        information : information,
      }
      
      //console.log(body)
      
      Api.makeRoadmap(body)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
    
      
    },
    forkRoadmap(){
      // 추가
    },
    pushHeart(){
      this.isActive = !this.isActive
    },
    onSubmit(event){
      event.preventDefault()
    },
  },
  mounted(){

  },
  created(){
    //this.initialize()
  }
};
</script>

<style lang="scss" scoped>
.header-info-container{

  display:flex;
  flex-wrap : wrap;
  margin : 0 0 20px 0;
  justify-content : space-between;
  width : 100%;

  .form-container{
    width : 100px;
    height : 30px;
    border : 1px solid blue;
  }
  .fork-like-container{
    margin-left: auto;
    .heart{
      color : red !important;
    }
  
  }
}
.justify-content-center{
  padding : 0;
  .form{
    height : 45px !important;
  }
  .title-content-container{
    padding: 0;
    .button{
    display : flex;
    float : right;
    margin : 0 0 10px 0;
    }
  }
  .roadmap-container{
    padding: 0;
    width : 100%;
    border-radius: 6px;
    height : 1000px;
    box-shadow: 0 1px 4px 0 rgba(21, 34, 50, 0.08);
    background-color: #ffffff;
  }
}
</style>