<template>
  <h1 class="text-center mt-8">{{ message }}</h1>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';

@Component({
  computed: mapState(['message'])
})
export default class HelloWorld extends Vue {}
</script>
