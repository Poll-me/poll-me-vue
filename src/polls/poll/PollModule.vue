<template>
  <router-view/>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import storeModule from './store';

const { mapActions, mapState } = createNamespacedHelpers('polls/poll');

@Component({
  computed: mapState(['key']),
  methods: mapActions(['fetchPoll'])
})
export default class PollModule extends Vue {
  beforeCreate() {
    if (!this.$store.state.polls.poll) {
      this.$store.registerModule(['polls', 'poll'], storeModule);
    }
  }

  created() {
    const routeKey = this.$route.params.key;
    if (this.key !== routeKey) {
      this.fetchPoll({ key: routeKey });
    }
  }
}
</script>
