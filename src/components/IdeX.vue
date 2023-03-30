<script setup>
import { ref } from 'vue';
import Editor from '@guolao/vue-monaco-editor';
//scripts
import { reader, formatText, lexer, getErrors } from '../script/lexer.js';
import { parser, getErrorsParser } from '../script/parser.js';

//data
const fileContent = ref();
let errors = ref();
let showErrors = ref();

//methods
const read = async (event) => {
  const file = event.target.files[0]; //contenido crudo del archivo
  fileContent.value = await reader(file);
  analize();
};
const analize = () => {
  const result = formatText(fileContent.value);
  const tokens = lexer(result);
  console.log(tokens);
  errors.value = getErrors();
  const validateDeclaration = parser(tokens);
  errors.value = [...getErrors(), ...getErrorsParser()];
  showErrors.value = errors.value.join('\n');
};
</script>

<template>
  <v-container>
    <v-form>
      <v-row>
        <v-card-text>
          There are many variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration in some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
          sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
          generators on the Internet tend to repeat predefined chunks as necessary, making this the
          first true generator on the Internet.
          <v-file-input
            outlined
            chips
            label="Selecciona el archivo"
            accept=".txt"
            prepend-icon="mdi-file"
            @change="read"
          />
          <v-btn variant="text" color="primary" append-icon="mdi-console-line" @click="analize">
            Analize
          </v-btn>
        </v-card-text>
      </v-row>
    </v-form>
    <v-row>
      <Editor
        height="80vh"
        width="100vh"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue="// some comment"
        v-model:value="fileContent"
        style="margin-right: 20px"
      ></Editor>
      <Editor
        height="80vh"
        width="60vh"
        theme="vs-dark"
        defaultLanguage="powershell"
        defaultValue="> results"
        v-model:value="showErrors"
      ></Editor>
    </v-row>
  </v-container>
</template>
