<template>
  <div>User polls!!! {{ pollMessage }}</div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';

@Component({
  computed: mapState('polls', ['pollMessage'])
})
export default class UserPolls extends Vue {

}
</script>
