<script setup>
import { ref } from 'vue';
import Editor from '@guolao/vue-monaco-editor';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <Editor
    height="80vh"
    width="150vh"
    theme="vs-dark"
    defaultLanguage="javascript"
    defaultValue="// some comment"
    :value="msg"
  ></Editor>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
