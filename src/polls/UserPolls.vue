<template>
  <div class="h-full flex flex-col">
    <div class="container py-4 flex-1 flex flex-col">
      <div v-if="!isLogged"
        class="border-tertiary border-2 bg-tertiary-lightest p-2 rounded mb-4 text-tertiary-dark">
        <i18n path="polls.no-login.message">
          <router-link :to="{ name: 'login' }" class="font-semibold text-tertiary-dark underline"
            place="login" v-t="'polls.no-login.login-link'"></router-link>
        </i18n>
      </div>
      <div class="flex-1 flex flex-col" >
        <div v-if="votes.length > 0" class="mb-4">
          <h2 class="text-lg font-medium" v-t="'polls.activity-title'"></h2>
          <ul class="list-reset font-medium leading-tight">
            <li v-for="vote in votes" :key="vote.key"
              class="btn btn-primary shadow mt-2">
              <router-link :to="{ name: 'fill-poll', params: { key: vote.key }}"
                class="text-white flex items-center">
                <div class="flex-1 truncate">{{ vote.name }}</div>
                <font-awesome-icon icon="eye" class="ml-2" fixed-width ></font-awesome-icon>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="polls.length > 0" key="polls-list" class="flex-1" >
          <h2 class="text-lg font-medium " v-t="'polls.polls-title'"></h2>
          <div v-for="poll in polls" :key="poll.name"
            class="overflow-hidden mt-2">
            <div class="p-3 border-2 border-primary rounded">
              <div class="font-bold mb-2">{{ poll.name }}</div>
              <p class="text-grey-darker text-sm">
                {{ poll.description }}
              </p>
              <div class="flex mt-2">
                <router-link :to="{ name: 'fill-poll', params: { key: poll.key }}"
                  v-t="'polls.view-poll'" class="btn btn-primary
                    font-bold flex-1 text-center" ></router-link>
                <button class="btn ml-2" @click="askForPollDeletion(poll)">
                  <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else key="no-polls-prompt"
          class="flex-1 flex flex-col">
          <div class="flex-1 flex flex-col items-center justify-around py-4">
            <font-awesome-icon :icon="['far', 'frown']" size="3x"
              class="block text-grey-darkest" ></font-awesome-icon>
            <div class="my-4 text-center">
              <div v-t="'polls.no-polls.title'" class="text-primary font-medium"></div>
              <div v-t="'polls.no-polls.description'" class="text-sm"></div>
            </div>
            <font-awesome-icon icon="arrow-down" size="3x"
              class="block text-grey-darkest" ></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'new-poll' }"
      class="sticky pin-b py-4 btn btn-secondary text-center rounded-none text-lg">
      <span v-t="'polls.create-poll'"></span>
      <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
    </router-link>
    <ModalDialog :open.sync="openDeleteDialog" @confirm="deletePoll">
      <i18n path="polls.delete-poll-confirm">
        <b place="name" class="text-lg">"{{ pollToDelete.name }}"</b>
      </i18n>
    </ModalDialog>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers, mapState as mapRootState } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('polls');

@Component({
  computed: {
    ...mapRootState({ isLogged: state => state.user.isLogged }),
    ...mapGetters(['polls', 'votes'])
  },
  methods: mapActions(['fetchPolls', 'fetchVotes', 'removePoll'])
})
export default class UserPolls extends Vue {
  openDeleteDialog = false;
  pollToDelete = {};

  mounted() {
    this.fetchPolls();
    this.fetchVotes();
  }

  askForPollDeletion(poll) {
    this.pollToDelete = poll;
    this.openDeleteDialog = true;
  }

  deletePoll() {
    this.removePoll(this.pollToDelete.key);
  }
}
</script>
