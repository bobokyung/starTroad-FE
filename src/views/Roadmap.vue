<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">

    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
          <b-col lg="12" class="roadmap-container">
            <b-tabs v-model="tabIndex" content-class="mt-3" fill>
                <b-tab class="tab" title="MAP" @click="navigate(``)">
                    <RoadmapDiagram></RoadmapDiagram>
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
import RoadmapDiagram from "../views/Roadmap/RoadmapDiagram"
import RoadmapDetail from "../views/Roadmap/RoadmapDetail"
export default {
  components : {
    RoadmapDiagram,
    RoadmapDetail
  },
  data(){
    return {
        tabIndex : 0,
    }
  },
  methods:{
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
.justify-content-center{
  .roadmap-container{
    padding: 0;
    width : 100%;
    border-radius: 6px;
    height : 1000px;
    box-shadow: 0 1px 4px 0 rgba(21, 34, 50, 0.08);
    background-color: #ffffff;
    .tab{
    }
  }
}
</style>