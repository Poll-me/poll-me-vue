<template>
  <div class="">
    <form v-if="!submitted" @submit.prevent="submit"
      class="bg-secondary rounded p-2 mb-2 flex shadow">
      <label for="name" v-t="`polls.types.${poll.type}.fill.author-label`"
        class="text-white font-semibold flex-no-shrink pl-2 pr-4 flex items-center"></label>
      <div class="flex-1 text-grey-darker" >
        <input v-model.trim="name" @input="$v.name.$touch()"
          v-bind:class="{ 'border-red': $v.name.$error }"
          :placeholder="$t(`polls.types.${poll.type}.fill.author-placeholder`)"
          id="name" type="text" class="shadow-none border-transparent border-2">
      </div>
    </form>
    <div class="text-center py-2" v-t="`polls.types.${poll.type}.fill.people-in`"></div>
    <ul class="list-reset flex flex-wrap -m-1 text-sm text-center text-white">
      <li v-for="ans in poll.answers" :key="ans.author"
        class="w-1/2 p-1" >
        <div class="bg-tertiary shadow p-2 rounded h-full flex flex-col justify-center">
          {{ ans.author }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Component from 'vue-class-component';
import { required } from 'vuelidate/lib/validators';

import FillPollType from '../fill-poll-type-mixin';

@Component({
  validations: {
    name: {
      required,
      unique(val) { return !this.poll.answers.some(ans => ans.author === val); }
    }
  }
})
export default class RegistrationPoll extends FillPollType {
  name = '';
  submitted = false;

  mounted() {
    if (this.autofocus) {
      this.$el.querySelector('#name').focus();
    }
  }

  submit() {
    if (!this.$v.$invalid) {
      this.$emit('vote', { author: this.name });
      this.submitted = true;
    }
  }
}
</script>
