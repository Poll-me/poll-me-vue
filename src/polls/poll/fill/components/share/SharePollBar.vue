<template>
  <div>
    <div class="flex">
      <component v-for="media in social" :key="media"
        :is="getSocialComponent(media)" :poll="poll" :url="pollUrl"
        class="flex-1"></component>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import socialComponents from './social';

@Component({
  props: {
    poll: {
      required: true,
      type: Object,
      validator: val => typeof val.key === 'string' && val.key.length > 0
    },
    social: {
      required: true,
      type: Array,
      validator: val => val.length > 0
    }
  },
  components: socialComponents
})
export default class SharePollBar extends Vue {
  socialComponentPrefix = 'SharePoll';

  get pollUrl() {
    return `${location.protocol}//${location.host}/polls/${this.poll.key}`;
  }

  getSocialComponent(media) {
    const mediaCapitalized = media[0].toUpperCase() + media.slice(1);
    return `${this.socialComponentPrefix}${mediaCapitalized}`;
  }
}
</script>
