<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <font class="subtitle-home">
        Computer Science <hr>
      </font>
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
          <b-card-text>
            {{roadmap.summary}}
          </b-card-text>
          <b-button href="#" variant="primary" @click="goToRoadmap(roadmap.id)">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
      <br><br>





      <font class="subtitle-home">
        Department of Mathematics <hr>
      </font>
      <b-row>
        <b-col xl="3" md="6">
        <b-card
          title="linear algebra"
          img-src="data:image/png;base64,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"
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            linear algebra roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="statistics"
          img-src="data:image/png;base64,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" 
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            statistics roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="derivative"
          img-src="data:image/png;base64,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"
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            derivative roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>

        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="integral"
          img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLia7vBfMnf_0D4wR-f_yo7BXLmUfsGoikdw&usqp=CAU"
          img-width="238"
          img-height="200"
          :img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            integral roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
      </b-row>
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
    };
  },
  computed :{


  },
  methods: {
    fetch(){
      Api.getHome()
      .then((res)=>{

        res.data.forEach((v, i)=>{
          if(v.image == null){
            v.image = require('@/assets/default_roadmap.jpg')
          }
        })
        if(res.data.length > 8){
          res.data = res.data.slice(0,8)
        }
        this.roadmapList = res.data

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
    this.fetch()
    
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
