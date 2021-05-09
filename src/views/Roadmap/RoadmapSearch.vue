<template>
  <div>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      
      <b-row>
        <b-col xl="3" md="6" v-for="roadmap in roadmapList" :key="roadmap.id">
        <b-card
          :title= roadmap.name
          :img-src= roadmap.img
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
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
        
    </base-header>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';

  Vue.use(VueClipboard)
  import Api from '@/api/Api'
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    data(){
      return{
        Image : "@/assets/default_roadmap.jpg",
        //roadmapList : [],
      }
    },
    computed: {
      search(){
        return this.$store.state.search
      },
      roadmapList(){
        return this.$store.state.searchList
      }
    },
    methods: {
      fetch(){
        console.log("로드맵")
        console.log(this.roadmapList)
        let query = this.$route.query
        this.$store.dispatch('search', query)
        
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
<style></style>
