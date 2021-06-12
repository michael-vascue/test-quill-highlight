<template>
  <div ref="scrollingContainer" class="scrolling-container">
    <div ref="editorNode" class="editor-node" :style="editorStyle">
      <pre>console.log("hi")</pre>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import hljs from "highlight.js";

import CodeSyntax from "./codeSyntax";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";

export default {
  name: "App",
  props: {
    minHeight: {
      type: String,
      default: "450px",
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editorInstance: null,
    };
  },
  computed: {
    editorStyle() {
      var style = "min-height: " + this.minHeight + ";";
      if (this.scrollable) {
        style += "overflow-y:auto;";
        style += "max-height: " + this.minHeight + ";";
      }
      return style;
    },
  },
  mounted() {
    const editorOpts = {
      modules: {
        syntax: {
          hljs,
          // highlight: (() => {
          //   if (hljs == null) return null;
          //   return function(text) {
          //     let result = hljs.highlightAuto(text);
          //     return result.value;
          //   };
          // })(),
        },
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "code-block"],
          ],
        },
      },
      theme: "snow",
    };
    editorOpts["scrollingContainer"] = this.$refs.scrollingContainer;
    Quill.register({ "modules/syntax": CodeSyntax }, true);
    this.editorInstance = new Quill(this.$refs.editorNode, editorOpts);
  },
};
</script>

<style>
.editor-node {
  height: auto;
}
.scrolling-container {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}
.ql-editor strong {
  font-weight: bold;
}
.ql-editor {
  letter-spacing: 0;
  font-style: normal;
  color: rgba(0, 0, 0, 0.84);
  font-size: 16px;
  line-height: 1.8;
}
.ql-editor p {
  letter-spacing: 0;
  font-weight: 300;
  font-style: normal;
  margin-block-start: 0px !important;
  margin-block-end: 0px !important;
  color: rgba(0, 0, 0, 0.84);
  font-size: 16px;
  line-height: 1.8;
}
</style>
