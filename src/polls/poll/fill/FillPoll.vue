<template>
  <div>
    <div class="container bg-primary text-white py-4">
      <h1 class="text-lg font-medium">{{ poll.name }}</h1>
      <div class="italic text-xs mt-2">by {{ poll.author }}</div>
    </div>
    <div class="container py-4">
      <div class="text-sm text-grey-darker">{{ poll.description }}</div>
      <div class="pt-2">
        <component :is="pollTypeComponent" :poll="poll" @vote="onVote" ></component>
        <template v-if="!pollTypeComponent">Poll type: {{ poll.type }}</template>
      </div>
      <div class="mt-8">
        <a :href="`whatsapp://send?text=${whatsappShareText}`" data-action="share/whatsapp/share"
          class="bg-green text-white p-2 rounded text-xl" >
          <font-awesome-icon :icon="['fab', 'whatsapp']" fixed-width></font-awesome-icon>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import pollTypeComponentsMap from './components';
import { voteToActionPayload } from './utils';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('polls/poll');

@Component({
  computed: {
    ...mapGetters(['poll']),
    ...mapState(['key'])
  },
  methods: mapActions(['submitVote'])
})
export default class FillPoll extends Vue {
  get pollTypeComponent() {
    return pollTypeComponentsMap[this.poll.type];
  }

  get whatsappShareText() {
    const answersText = this.poll.answers.reduce(
      (text, ans, i) => `${text}${i === 0 ? '\n' : ''}- ${ans.author}\n`,
      ''
    );
    return encodeURI(`*${this.poll.name}*\n${answersText}\nhttp://poll-me.com/polls/${this.key}`);
  }

  onVote(vote) {
    const actionPayload = voteToActionPayload(this.poll.type, this.key, vote);
    this.submitVote(actionPayload);
  }
}
</script>
