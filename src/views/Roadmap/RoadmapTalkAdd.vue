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

    <b-form>
      <div class="pl-lg-4">   
        <b-row>
          <b-col>
             <base-input
              type="text"
              label="title"
              placeholder="Title"
              v-model = "name"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <div class="pl-lg-4">
        <b-form-group label="content" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
          <b-form-textarea rows="10" 
          id="about-form-textaria" 
          placeholder="A few words about ..."
          v-model = "description"
          ></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>

<script>
import Api from '@/api/Api'

export default {
  props : {
    roadmap_id : null
  },
  data () {
    return {
      name : '',
      description : ''
    }
  }, 
  methods: {
    gotoComplete(){
      let roadmap_id = this.roadmap_id
      let data = {
        name : this.name,
        description : this.description
      }
      Api.addTalkList(roadmap_id, data)
      .then((res)=>{
        this.$router.push({path:`/roadmap/${roadmap_id}/talk`})
      })
    }
  },
  
};
</script>
<style scoped>
.btn{
  cursor : pointer;
}
</style>