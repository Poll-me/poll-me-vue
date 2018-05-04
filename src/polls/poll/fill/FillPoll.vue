<template>
  <div>
    <div class="container bg-primary text-white py-4">
      <h1 class="text-lg font-medium">{{ poll.name }}</h1>
      <div class="italic text-xs mt-2">by {{ poll.author }}</div>
    </div>
    <div class="container py-4">
      <div class="text-sm text-grey-darker">{{ poll.description }}</div>
      <div class="pt-2">
        <component :is="pollTypeComponent" :poll="poll" ></component>
        <template v-if="!pollTypeComponent">Poll type: {{ poll.type }}</template>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import RegistrationPoll from './components/RegistrationPoll';

const { mapGetters } = createNamespacedHelpers('polls/poll');
const pollTypeMap = {
  1: RegistrationPoll
};

@Component({
  computed: mapGetters(['poll'])
})
export default class FillPoll extends Vue {
  get pollTypeComponent() {
    return pollTypeMap[this.poll.type];
  }
}
</script>
