<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Make profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="/home" class="btn btn-sm btn-primary">Finish</a>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
           <div class="mb-2">
             <b-avatar size="20rem"></b-avatar>
            </div>

           




           



        <b-row>  
            <b-form-file
             v-model="imageData"
             :state="Boolean(imageData)"
             placeholder="Choose a prorfile image or drop it here..."
             drop-placeholder="Drop file here..."
             ></b-form-file>
        </b-row>

        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="User Id"
              placeholder="Userid"
              v-model="user.userid"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Name"
              placeholder="Name"
              v-model="user.name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Major"
              placeholder="CS"
              v-model="user.major"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row>
        <b-col>  
            <base-input
              type="text"
              label="birth"
              placeholder="YYYY-MM-DD"
              v-model="user.birth"
            >
            </base-input>
        </b-col>
        </b-row>
      </div>


      <hr class="my-4">

      <!-- Address -->
    <h6 class="heading-small text-muted mb-4">Contact information</h6>

      
  <div>
    <label for="tags-basic">Tag the field of interest and press enter</label>
    <b-form-tags input-id="tags-basic" v-model="values"></b-form-tags>
    <p class="mt-2">{{ values }}</p>
  </div>


      <hr class="my-4">
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">
        <b-form-group label="About Me" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" value="Hello!." id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        imageData:'',
        
        values: ['',''],
        company: '',
        userid: '',
        email: '',
        name: '',
        major:'',

        birth: '',

        postalCode: '',
        aboutMe: ''
      }
    };
  },
  
  
  
};
</script>
<style></style>
