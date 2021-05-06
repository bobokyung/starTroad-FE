<template>
  <card>
    <b-row>
        <b-col cols="8">
        <h3 class="mb-0">Add Content</h3>
        </b-col>
    <b-col class="text-right">
        <div class="btn btn-sm btn-primary" @click="gotoComplete()">complete</div>
    </b-col>
    </b-row>

    <b-form @submit.prevent="updateTalk">
      <div class="pl-lg-4">   
        <b-row>
          <b-col>
             <base-input
              type="text"
              label="title"
              placeholder="Title"
              v-model="title"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <div class="pl-lg-4">
         <label for="range-2">모집인원</label>
         <b-form-input id="range-2" v-model="value" type="range" min="2" max="15" step="1"></b-form-input>
         <div class="mt-2">스터디 인원 : {{ value }}</div>
      </div>

      

      <div class="pl-lg-4">
        <b-form-group label="content" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
          <b-form-textarea rows="10" id="about-form-textaria" placeholder="내용을 입력하세요.(시간,장소,진행방식)"></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>

<script>
export default {
  data () {
    return {
      title : '',
      value : '5',
      content : ''
    }
  }, 
  methods: {
    updateTalk() {
      alert('' + JSON.stringify());
    },
    gotoComplete(){
      this.$router.push({path:'/roadmap/${roadmap_id}/s'})
    }
  },
  
};
</script>
<style scoped>
.btn{
  cursor : pointer;
}
</style>