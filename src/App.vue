<script setup>
import IdeX from './components/IdeX.vue';
</script>

<template>
  <v-app>
    <v-app-bar app color="grey lighten-1">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="http://www.theredballoon.com.au/wp-content/uploads/orders/LX-Logo.png"
          transition="scale-transition"
          width="40"
        />

        <h1>Analizador Lexico</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        href="http://w3.unpocodetodo.info/utiles/regex.php"
        target="_blank"
        variant="text"
        color="primary"
        append-icon="mdi-open-in-new"
      >
        REGEX
      </v-btn>
    </v-app-bar>

    <v-main>
      <IdeX />
    </v-main>
  </v-app>
</template>
