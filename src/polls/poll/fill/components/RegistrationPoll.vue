<template>
  <div class="">
    <div class="text-center pb-2">People IN</div>
    <div >
      <form @submit.prevent="submit"
        class="bg-blue-dark rounded p-2 mb-2 flex">
        <label for="name"
          class="text-white font-semibold flex-no-shrink pl-2 pr-4 flex items-center">
          Are you in?
        </label>
        <div class="flex-1" >
          <input id="name" type="text" placeholder="Your name" v-model.trim="name"
            class="shadow appearance-none rounded w-full p-2 text-grey-darker text-sm">
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
    config: Object
  }
})
export default class RegistrationPoll extends Vue {
  name = '';

  submit() {
    this.$emit('vote', this.name);
  }
}
</script>
