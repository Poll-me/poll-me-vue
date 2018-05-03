<template>
  <div class="border-2 border-primary rounded">
    <div class="bg-primary text-white p-2">
      <div class="font-medium">{{ entity.name }}</div>
      <small class="italic text-xs">by {{ entity.author }}</small>
    </div>
    <div class="p-2">
      <div class="text-sm text-grey-darker">{{ entity.description }}</div>
      <div class="pt-2">
        <component :is="pollTypeComponent" :poll="entity" ></component>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import RegistrationPoll from './components/RegistrationPoll';

const { mapState } = createNamespacedHelpers('polls/poll');
const pollTypeMap = {
  1: RegistrationPoll
};

@Component({
  computed: mapState(['entity'])
})
export default class FillPoll extends Vue {
  get pollTypeComponent() {
    return pollTypeMap[this.entity.type];
  }
}
</script>
