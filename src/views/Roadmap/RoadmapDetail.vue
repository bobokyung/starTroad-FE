<template>
  <b-container class="roadmap-detail">
    <!-- Two-way Data-Binding -->
    <b-row class="roadmap-detail-button-c">
      <b-button class = "roadmap-detail-button" variant="info" @click="togglePreview()">
        {{ toggleContent }}
      </b-button>
      <b-button class = "roadmap-detail-button" variant="success">
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
  data () {
    return {
      toggleContent : "수정하기",
      viewToggle : false,
      content: dedent`
        <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
      `,
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
  // watch : {
  //   content : function(){
  //     console.log(this.content)  
  //   },
  // },
  methods: {
    togglePreview(){
      this.viewToggle = !this.viewToggle
      this.toggleContent = this.viewToggle ? "미리보기" : "수정하기"
      console.log(this.content)
    },
    onEditorChange: debounce(function(value) {
      this.content = value.html
    }, 466),
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
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
    console.log('this is Quill instance:', this.editor)
    console.log(this.content)
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