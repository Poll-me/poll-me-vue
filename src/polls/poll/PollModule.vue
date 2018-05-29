<template>
  <router-view/>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import store from '@/store';
import storeModule from './store';

@Component()
export default class PollModule extends Vue {
  beforeRouteEnter(to, from, next) {
    if (!store.state.polls.poll) {
      store.registerModule(['polls', 'poll'], storeModule);
    }
    const { key } = to.params;
    store.dispatch('polls/poll/fetchPoll', { key }).then(() => next(), () => next(false));
  }
}
</script>
