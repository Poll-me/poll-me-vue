<template>
  <div>
    Poll:
    {{ entity.name }}
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('poll');

@Component({
  computed: mapState(['entity']),
  methods: mapActions(['fetchPoll'])
})
export default class PollContainer extends Vue {
  created() {
    const key = this.$route.params.key;
    this.fetchPoll({ key });
  }

  beforeRouteUpdate(to, from, next) {
    const key = to.params.key;
    this.fetchPoll({ key });
    next();
  }
}
</script>
