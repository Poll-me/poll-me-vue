<template>
  <div class="h-full flex flex-col">
    <div class="bg-secondary rounded p-2 mb-4 shadow">
      <template v-if="!hasVoted" ref="vote-container">
        <div v-if="isLogged" class="flex" ref="logged-vote-container">
          <div v-t="`polls.types.${poll.type}.fill.author-label`"
            class="flex-1 text-white font-semibold px-1 flex items-center"></div>
          <button class="btn btn-primary" @click="loggedVote">
            <span v-t="`polls.types.${poll.type}.fill.get-in`"></span>
            <font-awesome-icon icon="sign-in-alt" fixed-width></font-awesome-icon>
          </button>
        </div>
        <form v-else @submit.prevent="submit" class="flex" ref="anonymous-vote-container">
          <label for="name" v-t="`polls.types.${poll.type}.fill.author-label`"
            class="text-white font-semibold flex-no-shrink pl-2 pr-4 flex items-center"></label>
          <div class="flex-1 text-grey-darker" >
            <input v-model.trim="name" @input="$v.name.$touch()"
              v-bind:class="{ 'border-red': $v.name.$error }"
              :placeholder="$t(`polls.types.${poll.type}.fill.author-placeholder`)"
              id="name" type="text" class="shadow-none border-transparent border-2">
          </div>
        </form>
      </template>
      <div v-else class="flex" ref="remove-vote-container">
        <div v-t="`polls.types.${poll.type}.fill.already-in`"
          class="flex-1 text-white font-semibold px-1 flex items-center"></div>
        <button class="btn btn-primary" @click="removeVote">
          <span v-t="`polls.types.${poll.type}.fill.get-out`"></span>
          <font-awesome-icon icon="sign-out-alt" fixed-width></font-awesome-icon>
        </button>
      </div>
    </div>
    <template v-if="poll.answers.length > 0" >
      <div class="text-center py-2" v-t="`polls.types.${poll.type}.fill.people-in`"></div>
      <ul class="list-reset flex flex-wrap -m-1 text-sm text-center text-white">
        <li v-for="ans in poll.answers" :key="ans.author"
          class="w-1/2 p-1" >
          <div class="bg-tertiary shadow p-2 rounded h-full flex flex-col justify-center">
            {{ ans.author }}
          </div>
        </li>
      </ul>
    </template>
    <div v-else key="no-answers-prompt"
      class="flex-1 flex flex-col">
      <div class="flex-1 flex flex-col items-center justify-around text-grey-darkest">
        <font-awesome-icon :icon="['far', 'frown']" size="3x"
          class="block" ></font-awesome-icon>
        <div v-t="`polls.types.${poll.type}.fill.no-answers`"
          class="mt-4 text-center font-medium"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Component from 'vue-class-component';
import { required } from 'vuelidate/lib/validators';

import FillPollType from '../fill-poll-type-mixin';

@Component({
  validations: {
    name: {
      required,
      unique(val) { return !this.poll.answers.some(ans => ans.author === val); }
    }
  }
})
export default class RegistrationPoll extends FillPollType {
  name = '';

  get hasVoted() {
    return this.poll.answers.some(ans => ans.user === this.user);
  }

  loggedVote() {
    this.vote({});
  }

  submit() {
    if (!this.$v.$invalid) {
      this.vote({ author: this.name });
    }
  }
}
</script>
