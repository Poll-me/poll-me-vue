<template>
  <div>
    <div v-for="poll in items" :key="poll.name"
      class="rounded overflow-hidden border-2 border-primary my-2">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ poll.name }}</div>
        <p class="text-grey-darker text-base">
          {{ poll.description }}
        </p>
        <router-link :to="{ name: 'poll-view', params: { key: poll.key }}"
          class="bg-red hover:bg-red-dark
            text-white font-bold py-2 px-4 rounded block text-center mt-2" >
          View poll
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('polls');

@Component({
  computed: mapGetters(['items']),
  methods: mapActions(['fetchPolls'])
})
export default class UserPolls extends Vue {
  created() {
    if (this.items.length === 0) {
      this.fetchPolls();
    }
  }
}
</script>
