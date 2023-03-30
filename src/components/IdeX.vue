<script setup>
import { ref } from 'vue';
import Editor from '@guolao/vue-monaco-editor';
//scripts
import { reader, formatText, lexer, getErrors } from '../script/lexer.js';
import { parser, getErrorsParser } from '../script/parser.js';

//data
const fileContent = ref();
let errors = ref();

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
      ></Editor>
      <v-card class="mx-auto" max-width="300">
        <v-list>
          <v-list-item v-for="(error, i) in errors" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="error"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>
