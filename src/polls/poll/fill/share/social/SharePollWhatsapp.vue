<template>
  <a :href="`whatsapp://send?text=${whatsappShareText}`" data-action="share/whatsapp/share"
    class="bg-green text-white p-2 text-xl block" >
    <font-awesome-icon :icon="['fab', 'whatsapp']" fixed-width></font-awesome-icon>
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
  get whatsappShareText() {
    const answersText = this.poll.answers.reduce(
      (text, ans, i) => `${text}${i === 0 ? '\n' : ''}- ${ans.author}\n`,
      ''
    );
    return encodeURI(
      `*${this.poll.name}*\n${answersText}\n${this.url}`
    );
  }
}
</script>
