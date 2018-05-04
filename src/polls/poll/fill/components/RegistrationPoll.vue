<template>
  <div class="">
    <div class="text-center pb-2">People IN</div>
    <form v-if="!submitted" @submit.prevent="submit"
      class="bg-blue-dark rounded p-2 mb-2 flex">
      <label for="name"
        class="text-white font-semibold flex-no-shrink pl-2 pr-4 flex items-center">
        Are you in?
      </label>
      <div class="flex-1 text-grey-darker text-sm" >
        <input v-model.trim="name" @input.once="dirty = true"
          v-bind:class="{ 'border-red': !valid && dirty }"
          id="name" type="text" placeholder="Your name"
          class="appearance-none rounded w-full p-2 border-2 border-transparent">
      </div>
    </form>
    <ul class="list-reset flex flex-wrap -m-1 text-sm text-center text-white">
      <li v-for="ans in poll.answers" :key="ans.author"
        class="w-1/2 p-1" >
        <div class="bg-teal-dark shadow p-2 rounded h-full flex flex-col justify-center">
          {{ ans.author }}
        </div>
      </li>
    </ul>
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
      validator: poll => poll.type === 1
    },
    config: Object,
    autofocus: {
      type: Boolean,
      default: false
    }
  }
})
export default class RegistrationPoll extends Vue {
  name = '';
  dirty = false;
  submitted = false;

  get valid() {
    const voteExists = this.poll.answers.some(ans => ans.author === this.name);
    return this.name.length > 0 && !voteExists;
  }

  mounted() {
    if (this.autofocus) {
      this.$el.querySelector('#name').focus();
    }
  }

  submit() {
    if (this.valid) {
      this.$emit('vote', { author: this.name });
      this.submitted = true;
    }
  }
}
</script>
