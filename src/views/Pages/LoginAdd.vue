<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Make profile </h3>
      </b-col>
      <b-col cols="4" class="text-right">
        <a href="#dashboard" class="btn btn-sm btn-primary">Finish</a>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
          

        <b-row>  
           <label>Profile Image <b-avatar size="20rem"></b-avatar></label>

        

           <b-form-file
             v-model="user.imageData"
             :state="Boolean(user.imageData)"
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
  methods: {
        previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    user.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        }
    }

  
  
  
};
</script>
<style></style>
