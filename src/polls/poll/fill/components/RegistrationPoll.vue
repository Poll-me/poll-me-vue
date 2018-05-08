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
        <input v-model.trim="name" @input="$v.name.$touch()"
          v-bind:class="{ 'border-red': $v.name.$error }"
          id="name" type="text" placeholder="Your name"
          class="shadow-none border-transparent border-2">
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
import { VueWithValidations } from '@/utils';
import Component from 'vue-class-component';
import { required } from 'vuelidate/lib/validators';

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
  },
  validations: {
    name: {
      required,
      unique(val) { return !this.poll.answers.some(ans => ans.author === val); }
    }
  }
})
export default class RegistrationPoll extends VueWithValidations {
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
