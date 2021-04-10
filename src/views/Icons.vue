<template>
  <div>
       <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
        <b-card
          title="Frontend"
          img-src="https://roadmap.sh/roadmaps/frontend.png"
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            Frontend roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="Backend"
          img-src="https://roadmap.sh/roadmaps/backend.png" 
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            Backend roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>
        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="DevOps"
          img-src="https://roadmap.sh/roadmaps/devops.png"
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            DevOps roadmap
          </b-card-text>
          <b-button href="#" variant="primary">Go roadmap</b-button>
        </b-card>

        </b-col>
        <b-col xl="3" md="6">
          <b-card
          title="Android"
          img-src="https://roadmap.sh/roadmaps/android/roadmap.svg"
          img-width="238"
          img-height="200"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="mb-2">
          <b-card-text>
            Android roadmap
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
  export default {
    name: 'icons',
    components: {
      BaseHeader
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      }
    }
  };
</script>
<style></style>
