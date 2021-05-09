<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">

    </base-header>

    <b-container fluid class="mt--7">
      <b-row ca>
        <h1>{{roadmap.name}}</h1>
      </b-row>
      <b-row>
        <div class = "header-info-container">
          <div >
            <span>{{roadmap.summary}} </span>
          </div>
          <div class="fork-like-container">
            <!-- fork과 like에 관한 conatiner임 -->
            <!--
            <b-button @click="pushHeart()">
              <span :class="{heart:isActive}">❤ {{likeNum}}</span>
            </b-button>
            -->
            <b-button v-if="!isMine" variant="warning" @click="forkRoadmap()">포크하기</b-button>
            <b-button v-if="isMine" variant="success" @click="editRoadmap()">업데이트</b-button>
          </div>
        </div>
      </b-row>
      <b-row class="justify-content-center">
          <b-col lg="12" class="roadmap-container">
            <b-tabs v-model="tabIndex" content-class="mt-3" fill>
                <b-tab class="tab" title="MAP" @click="navigate(``)">
                    <RoadmapDiagram :isMine="isMine" :info="roadmap.information"></RoadmapDiagram>
                </b-tab>
                <b-tab class="tab" title="detail" @click="navigate(`detail`)">
                    <router-view :isMine="isMine"></router-view>
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
        roadmap:{
          id : null,
          name : null,
          summary : null,
          valid : null,
          tag : null,
          information : null,
          description : null,
        },
        // id : null,
        // roadmap : null,
        isMine : true,
        likeNum : 0,
        isActive : false,
        tabIndex : 0,
    }
  },
  watch : {
    
  },
  methods:{
      editRoadmap(){
        let description = this.$store.state.roadmap.description
        let information = this.$store.state.roadmap.information
        let id = this.roadmap.id

        let body = {
          name : this.roadmap.name,
          summary : this.roadmap.summary,
          tag : this.roadmap.tag,
          description : description,
          information : information,
        }
        console.log("edit roadmap")
        console.log(description, information)
        console.log(body)
        Api.editRoadmap(id, body)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {

        })

      },
      forkRoadmap(){
        let data = {
          id : this.roadmap.id
        }
        Api.forkRoadmap(data)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          
        })
      },
      pushHeart(){
        this.isActive = !this.isActive
      },
      getRoadmap(id){
        Api.getRoadmap(id)
        .then((res)=>{
          ("saveRoadmap", res.data)

          let storeRoadMap = this.$store.state.roadmap
          this.roadmap.id = res.data.id
          this.roadmap.name = res.data.name
          this.roadmap.summary = res.data.summary
          this.roadmap.information = res.data.information
          this.roadmap.tag = res.data.tag

          console.log(res.data.valid)
          this.isMine = res.data.valid == "yes" ? true : false
          console.log(this.isMine)

          console.log(this.$store.state.roadmap)
        })
      },
    
      navigate(route){
          //console.log("clicked")
          let id = this.roadmap.id
          //console.log(this.$route.params)
          this.$router.push({path:`/roadmap/${id}/${route}`})
      },
  },
  mounted(){
    this.getRoadmap(this.id)
  },
  created(){
      this.id = this.$route.fullPath.split('/').slice()[2]
      //console.log(this.$route.fullPath.split('/').slice()[2])

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