<template>
  <a :href="`whatsapp://send?text=${shareText}`" data-action="share/whatsapp/share"
    class="text-white p-2 flex items-center justify-center" >
    <div class="flex-shrink mr-1" v-t="'poll.fill.share.whatsapp.button'"></div>
    <font-awesome-icon :icon="['fab', 'whatsapp']" fixed-width class="text-2xl">
    </font-awesome-icon>
    WhatsApp
  </a>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import shareTextParser from './share-text-parser';

@Component({
  props: {
    poll: {
      required: true,
      type: Object,
      validator: val => Array.isArray(val.answers)
    },
    url: {
      required: true,
      type: String
    }
  }
})
export default class SharePollWhatsapp extends Vue {
  answersLimit = 5;

  get description() {
    return this.poll.description ? `_${this.poll.description.replace(/\n/g, '_\n_')}_\n` : '';
  }

  get header() {
    const title = `*${this.poll.name}*`;
    let participants = '';
    if (this.poll.answers.length > 1) {
      participants =
        ` _(${this.$t('poll.fill.people', { number: this.poll.answers.length })})_`;
    }

    return `${title}${participants}\n${this.description}`;
  }

  get answers() {
    return shareTextParser.call(this);
  }

  get footer() {
    return `\n*${this.$t('poll.fill.share.vote')}*\n${this.url}`;
  }

  get shareText() {
    return encodeURI(`${this.header}${this.answers}${this.footer}`);
  }
}
</script>
<style scoped>
a {
  background-color: #25d366;
}
</style>

