<template>
  <div>
    <div ref="console" class="console">{{ consoleText }}</div>
    <div class="input-container">
      <input type="text" v-model="command" @keydown.enter="executeCommand" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      consoleText: '',
      command: '',
    };
  },
  methods: {
    executeCommand() {
      // Aquí puedes agregar la lógica para ejecutar los comandos
      // Puedes usar una librería como 'commander.js' para parsear los comandos
      // y ejecutar las funciones correspondientes
      this.consoleText += '> ' + this.command + '\n';
      this.command = '';
    },
  },
};
</script>

<style>
.console {
  height: 300px;
  overflow: scroll;
  background-color: black;
  color: white;
  font-family: monospace;
  padding: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
}
</style>
