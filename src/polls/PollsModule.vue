<template>
  <router-view/>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import store from '@/store';
import storeModule from './store';

@Component()
export default class PollsModule extends Vue {
  beforeRouteEnter(to, from, next) {
    if (!store.state.polls) {
      store.registerModule('polls', storeModule);
    }
    next();
  }
}
</script>
