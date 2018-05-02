<template>
  <router-view/>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import router from './router';
import storeModule from './store';

@Component({
  router
})
export default class PollModule extends Vue {
  beforeCreate() {
    this.$store.registerModule('poll', storeModule);
  }
}
</script>
