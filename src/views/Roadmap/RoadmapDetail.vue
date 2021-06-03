<template>
  <b-container class="roadmap-detail">
    <b-row v-if="isMine" class="roadmap-detail-button-c">
      <b-button class = "roadmap-detail-button" variant="info" @click="togglePreview()">
        {{ toggleContent }}
      </b-button>
      <b-button class = "roadmap-detail-button" variant="success" @click="saveTmp()">
        저장하기
      </b-button>
    </b-row>

    <b-row class="editor-container">
      <quill-editor
        v-if = "viewToggle"
        class="editor"
        ref="myTextEditor"
        :value="content"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />

      <div class="output ql-snow" v-else>
        <div class="ql-editor" v-html="content"></div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import { quillEditor } from 'vue-quill-editor'
  // highlight.js style
  import 'highlight.js/styles/tomorrow.css'
  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'

export default {
  components : {
      quillEditor
  },
  props:{
    isMine:null,
  },
  data () {
    return {
      content : null,
      type : null,
      toggleContent : "수정하기",
      viewToggle : false,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
    }
  },
  computed:{
    // content(){
    //   return this.$store.getters.description || this.$store.state.roadmap.description
    // }
  },

  methods: {
    saveTmp(){
      alert('저장되었습니다');
      if(this.type == "makemap"){
        this.$store.commit("saveDescription", this.content)
      }else if(this.type == "roadmap"){
        this.$store.commit("modifyDescription", this.content)
        console.log(this.$store.state.roadmap.description)
      }
      console.log("saveTmp")
    },
    togglePreview(){
      this.viewToggle = !this.viewToggle
      this.toggleContent = this.viewToggle ? "미리보기" : "수정하기"
      console.log(this.content)
    },
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    onEditorBlur(editor) {
      //console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      //console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      //console.log('editor ready!', editor)
    },
    loadData(){
      if(this.type == "makemap"){
        this.content = this.$store.state.description
      }else if(this.type == "roadmap"){
        this.content = this.$store.state.roadmap.description
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted() {
    this.loadData()
    //console.log(this.content)
  },
  created(){
    //url 따라 저장하고 있는 내용이 각기 다르다.
    this.type = this.$route.fullPath.split('/').slice()[1]
    this.loadData()
    //console.log(this.type)
    //this.content = this.$store.state.roadmap.description
  }
  
};
</script>

<style lang="scss" scoped>
.roadmap-detail{
  max-width : 100%;
  .roadmap-detail-button-c{
    margin : 0;
    .roadmap-detail-button{
      margin : 0 5px 15px 0 ;
    }
  }
  .editor-container{
    display : block;
    margin : 0 auto;
    .editor {
      height : 830px;
      //overflow-y : scroll;
      //height: 40rem;
      //overflow: hidden;
    }
    .output {
      width: 100%;
      height : 830px;
      margin: 0;
      //border: 1px solid #ccc;
      overflow-y: auto;
      resize: vertical;
      .ql-editor{
        height: 100%;
        padding : 0;
      }
      &.code {
        padding: 1rem;
        height: 16rem;
      }
      &.ql-snow {
        border-top: none;
        height: 830px;
      }
    }
  }
}
</style>