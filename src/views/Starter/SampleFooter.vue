<template>
<footer class="py-5" id="footer-main">
      <b-container >
        <b-row align-v="center" class="justify-content-xl-between">
          <b-col xl="6">
            <div class="copyright text-center text-xl-left text-muted">
              © {{year}} <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">CAU Capstone Project</a>
            </div>
          </b-col>
          <b-col xl="6" class="col-xl-6">
            <b-nav  class="nav-footer justify-content-center justify-content-xl-end">
              <b-nav-item href="https://github.com/starTroad2021" target="_blank" >
                Github Project
              </b-nav-item>
              <!-- <b-nav-item href="https://www.creative-tim.com/presentation" target="_blank" >
                About Us
              </b-nav-item>
              <b-nav-item href="http://blog.creative-tim.com"  target="_blank">
                Blog
              </b-nav-item>
              <b-nav-item href="https://www.creative-tim.com/license" target="_blank">
                License
              </b-nav-item> -->
            </b-nav>
          </b-col>
        </b-row>
      </b-container>
    </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      };
    }
  };
</script>
<style></style>
