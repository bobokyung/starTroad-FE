<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <font class="subtitle-home">
        Computer Science <hr>
      </font>
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in this.csLists" :key="roadmap.id">
        <b-card
          :title= roadmap.name
          :img-src= roadmap.image
          img-width="238"
          img-height="200"
          :img-alt=Image
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
      <br><br>

      <font class="subtitle-home">
        Mathematics <hr>
      </font>
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in this.mathLists" :key="roadmap.id">
        <b-card
          :title= roadmap.name
          :img-src= roadmap.image
          img-width="238"
          img-height="200"
          :img-alt=Image
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
      <br><br>
      <font class="subtitle-home">
        Statistics <hr>
      </font>
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in this.statLists" :key="roadmap.id">
        <b-card
          :title= roadmap.name
          :img-src= roadmap.image
          img-width="238"
          img-height="200"
          :img-alt=Image
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
      <br><br>
      <font class="subtitle-home">
        Others <hr>
      </font>
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in this.noTagLists" :key="roadmap.id">
        <b-card
          :title= roadmap.name
          :img-src= roadmap.image
          img-width="238"
          img-height="200"
          :img-alt=Image
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
      <br><br>
    </base-header>
  </div>
</template>
<script>
import Api from '@/api/Api'
export default {
  components: {
    
  },
  data() {
    return {
      Image : "@/assets/default_roadmap.jpg",
      roadmapList : [],
      csLists : [],
      mathLists : [],
      statLists : [],
      title : ['Computer Science', 'Mathematics', 'Statistics']
    };
  },
  computed :{


  },
  methods: {
    beforeFetch(){
      Api.getProfile()
      .then((res)=>{

      })
    },
    fetch(){
      this.roadmapList = []
      this.csLists = []
      this.mathLists = []
      this.statsLists = []
      this.noTagLists = []

      Api.getHome()
      .then((res)=>{

        res.data.forEach((v, i)=>{
          if(v.image == null){
            v.image = require('@/assets/default_roadmap.jpg')
          }
          // tag별 분류
          switch(v.tag){
            case 'CS':
              this.csLists.push(v)
              break;
            
            case 'MATH':
              this.mathLists.push(v)
              break;
            
            case 'STATS':
              this.statLists.push(v)
              break;
            default:
              this.noTagLists.push(v)
              break;
          }

        })
        console.log(res.data)
        if(this.csLists.length > 8){
          this.csLists = this.csLists.slice(0,8)
        }
        if(this.mathLists.length > 8){
          this.mathLists = this.mathLists.slice(0,8)
        }
        if(this.statLists.length > 8){
          this.statLists = this.statLists.slice(0,8)
        }
        if(this.noTagLists.length > 8){
          this.noTagLists = this.noTagLists.slice(0,8)
        }

        //this.roadmapList = res.data
        //console.log(res.data)
        // 여기서 computer Science, Mathematics, Statistics 분리 해야함.

      })
      .catch((error) => {

      })
    },
    goToRoadmap(roadmap_id){
      //나중에는 data redering을 해보고 각 로드맵에 대한 id를 부여해서 roadmap 상세 페이지로 이동해야함
      this.$store.dispatch('getRoadmap', roadmap_id)
      this.$router.push({path:`/roadmap/${roadmap_id}`})
    }
  },
  mounted() {

    
  },
  created(){
    this.fetch()

  }
};
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
.subtitle-home{
  font-weight : bold;
  font-size : 1.5rem;
}
</style>
