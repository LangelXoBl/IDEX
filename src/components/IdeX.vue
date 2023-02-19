<script setup>
import { ref } from 'vue';
import Editor from '@guolao/vue-monaco-editor';

defineProps({
  msg: String,
});

const count = ref(0);
console.log();
</script>

<template>
  <h1>{{ msg }}</h1>
  <v-container>
    <v-form>
      <v-row>
        <v-card-text>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet.
          <v-file-input
            outlined
            chips
            label="Selecciona el archivo"
            accept=".txt"
            prepend-icon="mdi-file"
          />
        </v-card-text>
      </v-row>
    </v-form>
    <Editor
      height="80vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      :value="msg"
    ></Editor>
  </v-container>
</template>
