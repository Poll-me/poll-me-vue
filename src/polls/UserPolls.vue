<template>
  <div>
    <div v-for="poll in items" :key="poll.name"
      class="rounded overflow-hidden border-2 border-primary my-2">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ poll.name }}</div>
        <p class="text-grey-darker text-base">
          {{ poll.description }}
        </p>
        <router-link :to="poll.key">asd</router-link>
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
