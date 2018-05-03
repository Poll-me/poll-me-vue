<template>
  <div>
    Poll type: {{ poll.type }}
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
