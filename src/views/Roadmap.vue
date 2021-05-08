<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">

    </base-header>

    <b-container fluid class="mt--7">
      <b-row ca>
        <h1>{{roadmapTitle}}</h1>
      </b-row>
      <b-row>
        <div class = "header-info-container">
          <div >
            <span>{{description}} </span>
          </div>
          <div class="fork-like-container">
            <!-- fork과 like에 관한 conatiner임 -->
            <!--
            <b-button @click="pushHeart()">
              <span :class="{heart:isActive}">❤ {{likeNum}}</span>
            </b-button>
            -->
            <b-button v-if="isMine" variant="warning" @click="forkRoadmap()">포크하기</b-button>
          </div>
        </div>
      </b-row>
      <b-row class="justify-content-center">
          <b-col lg="12" class="roadmap-container">
            <b-tabs v-model="tabIndex" content-class="mt-3" fill>
                <b-tab class="tab" title="MAP" @click="navigate(``)">
                    <RoadmapDiagram :isMine="isMine"></RoadmapDiagram>
                </b-tab>
                <b-tab class="tab" title="detail" @click="navigate(`detail`)">
                    <router-view></router-view>
                </b-tab>
                <b-tab class="tab" title="talk" @click="navigate(`talk`)">
                    <router-view></router-view>
                </b-tab>
            </b-tabs>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Api from '@/api/Api'
import RoadmapDiagram from "../views/Roadmap/RoadmapDiagram"
import RoadmapDetail from "../views/Roadmap/RoadmapDetail"
export default {
  components : {
    RoadmapDiagram,
    RoadmapDetail
  },
  data(){
    return {
        roadmap : null,
        isMine : true,
        likeNum : 0,
        isActive : false,
        roadmapTitle : "프론트 개발자의 기본기 기르기",
        description : "프론트 개발자의 기본기를 알아보고 심화과정까지 가는 길을 알아봅시다.",
        tabIndex : 0,
    }
  },
  methods:{
      forkRoadmap(){
        let data = {
          id : this.roadmap.id
        }
        Api.forkRoadmap(data)
        .then((res)=>{
          console.log(res)
        })
      },
      pushHeart(){
        this.isActive = !this.isActive
      },
      getRoadmap(){
        this.$store.dispatch('getRoadmap')
        .then(()=>{
          this.roadmap = this.$store.state.roadmap
          // 이
        })
        .catch((error)=>{

        })
      },
    
      navigate(route){
          //console.log("clicked")
          let id = this.$route.params.id
          //console.log(this.$route.params)
          this.$router.push({path:`/roadmap/${id}/${route}`})
      },
  },
  mounted(){

  },
  created(){
      let path = this.$route.fullPath.split('/').slice(-1)[0]
      switch(path){
            case 'detail':
                this.tabIndex = 1
                break
            case 'talk':
                this.tabIndex = 2
                break
            default:
                this.tabIndex = 0

          }
        //console.log(this.tabIndex)
      }
  }
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