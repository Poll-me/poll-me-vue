<template>
  <div class="h-full flex flex-col">
    <div class="container py-4 flex-1 flex flex-col" >
      <div v-if="votes.length > 0" class="mb-4">
        <h2 class="text-xl font-medium">Recent activity:</h2>
        <ul class="list-reset font-medium leading-tight">
          <li v-for="vote in votes" :key="vote.key"
            class="bg-primary rounded shadow mt-2">
            <router-link :to="{ name: 'fill-poll', params: { key: vote.key }}"
              class="text-white px-3 py-2 flex items-center">
              <div class="flex-1 truncate">{{ vote.name }}</div>
              <font-awesome-icon icon="eye" class="ml-2" fixed-width ></font-awesome-icon>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="polls.length > 0" key="polls-list" class="flex-1" >
        <h2 class="text-xl font-medium">Your polls:</h2>
        <div v-for="poll in polls" :key="poll.name"
          class="overflow-hidden py-2">
          <div class="p-3 border-2 border-primary rounded">
            <div class="font-bold mb-2">{{ poll.name }}</div>
            <p class="text-grey-darker text-sm">
              {{ poll.description }}
            </p>
            <router-link :to="{ name: 'fill-poll', params: { key: poll.key }}"
              v-t="'polls.view-poll'" class="bg-red hover:bg-red-dark
                text-white font-bold py-2 px-4 rounded block text-center mt-2" ></router-link>
          </div>
        </div>
      </div>
      <div v-else key="no-polls-prompt"
        class="flex-1 flex flex-col">
        <div class="flex-1 flex flex-col items-center justify-around py-4">
          <font-awesome-icon :icon="['far', 'frown']" size="3x"
            class="block text-grey-darkest" ></font-awesome-icon>
          <div class="my-4">You have no polls yet!!</div>
          <font-awesome-icon icon="arrow-down" size="3x"
            class="block text-grey-darkest" ></font-awesome-icon>
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
  computed: mapGetters(['polls', 'votes']),
  methods: mapActions(['fetchPolls', 'fetchVotes'])
})
export default class UserPolls extends Vue {
  mounted() {
    this.fetchPolls();
    this.fetchVotes();
  }
}
</script>
