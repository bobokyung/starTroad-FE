<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">

    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
          <b-col lg="12" class="roadmap-container">
            <b-tabs content-class="mt-3" fill>
              <b-tab class="tab" title="MAP" active>
                <Roadmap></Roadmap>
              </b-tab>
              <b-tab class="tab" title="Detail" ><p>I'm the second tab</p></b-tab>
              <b-tab class="tab" title="Talk" disabled><p>I'm the tab with the very, very long title</p></b-tab>
              <b-tab class="tab" title="Study" disabled><p>I'm a disabled tab!</p></b-tab>
            </b-tabs>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Roadmap from "../views/Roadmap/Roadmap"
export default {
  components : {
    Roadmap
  },
  data(){
    return {

    }
  },
  methods:{
  },
  mounted(){

  }
};
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