<template>
  <div class="editorDiv">
    <div ref="editorContainer" class="editorClass"></div>
    <p>{{ editorDeltaContent }}</p>
    <button @click="copyDataToEditor()">
      Copy to same data to editor
    </button>

    <div ref="editorContainer2" class="editorClass"></div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Quill from 'quill';

let quillEditor = ref(null);
let quillEditor2 = ref(null);
let editorContainer = ref(null);
let editorContainer2 = ref(null);
let editorDeltaContent = ref(null);

const options = {
  debug: 'info',
  modules: {
    // toolbar: true,
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6] }],
      // [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['bold', 'italic', 'underline', { 'color': [] }, { 'background': [] }, 'link', 'blockquote', 'code-block', 'image'],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      ['clean']


    ],
  },
  placeholder: 'Start writing ...',
  theme: 'snow',
};

onMounted(() => {
  if (editorContainer.value) {
    quillEditor.value = new Quill(editorContainer.value, options);
  }
  if (editorContainer.value) {
    quillEditor2.value = new Quill(editorContainer2.value, options);

  }
  if (quillEditor.value) {
    // Listen for changes in the Quill editor
    quillEditor.value.on('text-change', () => {
      // Get the delta content
      // editorDeltaContent.value = quillEditor.value.getContents();
      // Get the plain text content
      editorDeltaContent.value = quillEditor.value.getText();
      console.log('Text Content of first editor:', editorDeltaContent.value); // Log text content
    });
  }


});

function copyDataToEditor() {

  if (quillEditor.value && quillEditor2.value) {
    // Listen for changes in the Quill editor
    const htmlContent = quillEditor.value.root.innerHTML; // Get HTML content from the first editor
    quillEditor2.value.root.innerHTML = htmlContent;
    quillEditor2.value.setContents(quillEditor.value.getContents());       // to set delta content of second edtr
  }
}
</script>

<style>
/* You can import the Quill theme stylesheet here */
@import 'quill/dist/quill.snow.css';

.editorDiv {
  border: 2px solid;
  /* min-width: 80vw; */
  min-height: 50vh;
}

.editorClass {
  height: 50vh;
  /* width: 80vw; */
  min-width: 200px;
  background-color: #EBFBF7;
  border-radius: 5px;
}

.ql-toolbar {
  z-index: 1;

  /* height: 10vh; */
  /* width: 80vw; */
  min-width: 200px;
  border-radius: 10px;
  font-size: medium;
}

.ql-toolbar.ql-snow,
.editorClass.ql-snow {
  border-color: #A6E9DC;
}
</style>
