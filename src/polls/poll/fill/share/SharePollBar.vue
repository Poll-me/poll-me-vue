<template>
  <div class="sticky pin-b shadow-t flex">
    <a :href="`whatsapp://send?text=${whatsappShareText}`" data-action="share/whatsapp/share"
      class="bg-green text-white p-2 text-xl flex-1" >
      <font-awesome-icon :icon="['fab', 'whatsapp']" fixed-width></font-awesome-icon>
    </a>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    poll: {
      required: true,
      type: Object,
      validator: val => typeof val.key === 'string' && Array.isArray(val.answers)
    }
  }
})
export default class SharePollBar extends Vue {
  get whatsappShareText() {
    const answersText = this.poll.answers.reduce(
      (text, ans, i) => `${text}${i === 0 ? '\n' : ''}- ${ans.author}\n`,
      ''
    );
    return encodeURI(
      `*${this.poll.name}*\n${answersText}\nhttps://poll-me.com/polls/${this.poll.key}`
    );
  }
}
</script>
