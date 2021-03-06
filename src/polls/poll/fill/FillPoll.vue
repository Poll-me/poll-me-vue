<template>
  <div class="h-full flex flex-col">
    <div class="sticky pin-t z-10 shadow bg-primary">
      <div class="container text-white py-4">
        <h1 class="text-lg font-medium">{{ poll.name }}</h1>
        <i18n path="poll.fill.author" tag="div"
          class="italic text-xs mt-2">
          <span place="author-name">{{ poll.author }}</span>
        </i18n>
      </div>
    </div>
    <div class="container py-4 flex-1 flex flex-col">
      <div class="text-grey-darker whitespace-pre-line">{{ poll.description }}</div>
      <div class="pt-4 flex-1">
        <component :is="pollTypeComponent" :user="user" :isLogged="isLogged" :poll="poll"
          @vote="onVote" @remove-vote="onRemoveVote" ></component>
        <template v-if="!pollTypeComponent">Poll type: {{ poll.type }}</template>
      </div>
    </div>
    <SharePollBar :poll="poll" :social="['whatsapp']"
      class="sticky pin-b shadow-t"></SharePollBar>
    <ModalDialog :open.sync="openRemoveDialog" @confirm="removeVote(userToDeleteVote)">
      <i18n path="poll.fill.remove-vote-confirm">
        <b place="name" class="text-lg">"{{ authorToDeleteVote }}"</b>
      </i18n>
    </ModalDialog>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers, mapState as mapRootState } from 'vuex';

import store from '@/store';
import pollTypeComponentsMap from './components';
import SharePollBar from './components/share';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('polls/poll');

@Component({
  computed: {
    ...mapRootState({
      user: state => state.user.uid,
      isLogged: state => state.user.isLogged
    }),
    ...mapGetters(['poll']),
    ...mapState(['key', 'answersEntities'])
  },
  methods: mapActions(['submitVote', 'removeVote']),
  components: { SharePollBar }
})
export default class FillPoll extends Vue {
  openRemoveDialog = false;
  userToDeleteVote = '';

  get pollTypeComponent() {
    return pollTypeComponentsMap[this.poll.type];
  }

  get authorToDeleteVote() {
    return this.answersEntities[this.userToDeleteVote] ?
      this.answersEntities[this.userToDeleteVote].author :
      '';
  }

  beforeRouteEnter(to, from, next) {
    const { key } = to.params;
    store.dispatch('polls/poll/fetchAnswers', { key });
    next();
  }

  onVote(vote) {
    this.submitVote(vote);
  }

  askForVoteDeletion(user) {
    this.userToDeleteVote = user;
    this.openRemoveDialog = true;
  }

  onRemoveVote(user) {
    if (this.user === user) {
      this.removeVote(user);
    } else {
      this.askForVoteDeletion(user);
    }
  }
}
</script>
