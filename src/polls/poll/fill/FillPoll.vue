<template>
  <div class="h-full flex flex-col">
    <div class="sticky pin-t z-10 shadow bg-primary">
      <div class="container text-white py-4">
        <h1 class="text-lg font-medium">{{ poll.name }}</h1>
        <div class="italic text-xs mt-2">by {{ poll.author }}</div>
      </div>
    </div>
    <div class="container py-4 flex-1">
      <div class="text-sm text-grey-darker">{{ poll.description }}</div>
      <div class="pt-2">
        <component :is="pollTypeComponent" :poll="poll" @vote="onVote" ></component>
        <template v-if="!pollTypeComponent">Poll type: {{ poll.type }}</template>
      </div>
    </div>
    <SharePollBar :poll="poll" :social="['whatsapp']"
      class="sticky pin-b shadow-t"></SharePollBar>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import pollTypeComponentsMap from './components';
import SharePollBar from './share';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('polls/poll');

@Component({
  computed: {
    ...mapGetters(['poll', 'voteActionPayload']),
    ...mapState(['key'])
  },
  methods: mapActions(['submitVote']),
  components: { SharePollBar }
})
export default class FillPoll extends Vue {
  get pollTypeComponent() {
    return pollTypeComponentsMap[this.poll.type];
  }

  onVote(vote) {
    const actionPayload = this.voteActionPayload(vote);
    this.submitVote(actionPayload);
  }
}
</script>
