<template>
  <router-view/>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import storeModule from './store';

@Component()
export default class PollsModule extends Vue {
  beforeCreate() {
    if (!this.$store.state.polls) {
      this.$store.registerModule('polls', storeModule);
    }
  }
}
</script>
