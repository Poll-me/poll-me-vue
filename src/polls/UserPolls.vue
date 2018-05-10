<template>
  <div class="h-full flex flex-col">
    <div class="container py-2 flex-1" >
      <div v-for="poll in items" :key="poll.name"
        class="overflow-hidden py-2">
        <div class="p-3 border-2 border-primary rounded">
          <div class="font-bold mb-2">{{ poll.name }}</div>
          <p class="text-grey-darker text-sm">
            {{ poll.description }}
          </p>
          <router-link :to="{ name: 'fill-poll', params: { key: poll.key }}" v-t="'polls.view-poll'"
            class="bg-red hover:bg-red-dark
              text-white font-bold py-2 px-4 rounded block text-center mt-2" ></router-link>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'new-poll' }"
      class="sticky pin-b py-4 bg-secondary text-center text-white text-lg">
      <span v-t="'polls.create-poll'"></span>
      <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
    </router-link>
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
