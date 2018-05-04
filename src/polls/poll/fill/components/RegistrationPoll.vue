<template>
  <div class="">
    <div class="text-center pb-2">People IN</div>
    <div >
      <ul class="list-reset flex flex-wrap -m-1 text-sm text-center">
        <li v-for="ans in poll.answers" :key="ans.author"
          class="w-1/2 p-1" >
          <div class="border p-2 rounded h-full flex flex-col justify-center">
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
    answers: Array,
    config: Object
  }
})
export default class RegistrationPoll extends Vue {

}
</script>
