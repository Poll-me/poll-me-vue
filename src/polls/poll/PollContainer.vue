<template>
  <div>
    Poll:
    {{ entity.name }}
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('polls/poll');

@Component({
  computed: mapState(['entity'])
})
export default class PollContainer extends Vue {}
</script>
