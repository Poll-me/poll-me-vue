<template>
  <a :href="`whatsapp://send?text=${shareText}`" data-action="share/whatsapp/share"
    class="text-white p-2 flex items-center justify-center" >
    <div class="flex-shrink mr-1">Share via WhatsApp</div>
    <font-awesome-icon :icon="['fab', 'whatsapp']" fixed-width class="text-2xl">
    </font-awesome-icon>
  </a>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

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
  get title() {
    let title = `*${this.poll.name}*\n`;
    if (this.poll.answers.length > 1) {
      title += `_${this.poll.answers.length} people_\n`;
    }
    return title;
  }

  get answers() {
    return this.poll.answers.reduce(
      (text, ans, i) => `${text}${i === 0 ? '\n' : ''}- ${ans.author}\n`,
      ''
    );
  }

  get shareText() {
    return encodeURI(`${this.title}${this.answers}\n${this.url}`);
  }
}
</script>
<style scoped>
a {
  background-color: #25d366;
}
</style>

