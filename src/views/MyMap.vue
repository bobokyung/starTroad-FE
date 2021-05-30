<template>
  <div>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in roadmapList" :key="roadmap.id">
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
          <a class="fork-ribbon" v-if=roadmap.isForked>Forked</a>
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
        
    </base-header>
  </div>
</template>
<script>
  import Api from '@/api/Api'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';

  Vue.use(VueClipboard)
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    data(){
      return{
        Image : "@/assets/default_roadmap.jpg",
        roadmapList : [],
      }
    },
    methods: {
    fetch(){
      Api.getMyroadMap()
      .then((res)=>{
        res.data.forEach((v, i)=>{
          if(v.image == null){
            v.image = require('@/assets/default_roadmap.jpg')
          }
          if(v.generator != v.owner){
            v.isForked = true
          }
        })
        this.roadmapList = res.data
        console.log(this.roadmapList)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goToRoadmap(roadmap_id){
      //나중에는 data redering을 해보고 각 로드맵에 대한 id를 부여해서 roadmap 상세 페이지로 이동해야함
      this.$store.dispatch('getRoadmap', roadmap_id)
      this.$router.push({path:`/roadmap/${roadmap_id}`})
    }
  },
  mounted() {
    this.fetch()
    
  },
  created(){
    this.fetch()

  }
  };
</script>
<style lang="scss" scoped>
.fork-ribbon{

    /* positioning */
    position: absolute;
    padding: 5px 38px;
    width: 128px;
    /* top right of the page */
    top: 25px;
    right: -25px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    /* effects with some shadow */
    box-shadow: 0 0 0 3px #f6c304, 0 0 20px -3px rgba(0, 0, 0, 0.5);
    text-shadow: 0 0 0 #ffffff, 0 0 5px rgba(0, 0, 0, 0.3);
    /* looks */
    background-color: #f6c304;
    color: #ffffff;
    font-size: 13px;
    font-family: sans-serif;
    text-decoration: none;
    font-weight: bold;
    /* ribbon effects */
    border: 2px dotted #ffffff;
    /* webkit antialias fix */
    -webkit-backface-visibility: hidden;
    letter-spacing: .5px;

}

</style>


