<script setup lang="ts">
import { ref } from 'vue';
const toggle1Value = ref('value1');
const toggle2Value = ref('value1');
const toggle2Options = ['value1', 'value2'];
</script>

<template>
  <div>
    <h2>explicit v-btn elements: working on pageload</h2>
    <v-btn-toggle v-model="toggle1Value">
      <v-btn value="value1">value1</v-btn>
      <v-btn value="value2">value2</v-btn>
    </v-btn-toggle>
    <h2>v-btn elements via v-for: not working on pageload</h2>
    <v-btn-toggle v-model="toggle2Value">
      <v-btn v-for="optionValue in toggle2Options" :value="optionValue">{{
        optionValue
      }}</v-btn>
    </v-btn-toggle>
  </div>
</template>
