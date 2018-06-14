<template>
  <div class="h-full flex flex-col">
    <div v-if="!isLogged || hasVoted" class="bg-secondary rounded p-2 mb-4 shadow">
      <template v-if="!hasVoted" ref="vote-container">
        <form @submit.prevent="submit" class="flex">
          <div v-t="`polls.types.${poll.type}.fill.author-label`"
            class="text-white font-semibold pl-1 pr-3 flex items-center"></div>
          <div class="flex-1 text-grey-darker" >
            <input v-model.trim="name" @input="$v.name.$touch()"
              v-bind:class="{ 'border-red': $v.name.$error }"
              :placeholder="$t(`polls.types.${poll.type}.fill.author-placeholder`)"
              id="name" type="text" class="shadow-none border-transparent border-2">
          </div>
        </form>
      </template>
      <div v-else class="flex" ref="remove-vote-container">
        <div v-t="`polls.types.${poll.type}.fill.already-answered`"
          class="flex-1 text-white font-semibold px-1 flex items-center"></div>
        <button class="btn btn-primary" @click="removeVote()">
          <span v-t="`polls.types.${poll.type}.fill.get-out`"></span>
          <font-awesome-icon icon="sign-out-alt" fixed-width></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="flex-1 flex">
      <div v-if="!hasVoted" class="flex-1 self-center flex items-center justify-around">
        <button class="btn btn-tertiary p-4 rounded-lg"
          :title="$t(`polls.types.${poll.type}.yes`)"
          :disabled="!isValid"
          @click="submit(1)" >
          <font-awesome-icon icon="thumbs-up" size="3x" flip="horizontal" ></font-awesome-icon>
        </button>
        <button class="btn btn-tertiary p-4 rounded-lg"
          :title="$t(`polls.types.${poll.type}.no`)"
          :disabled="!isValid"
          @click="submit(0)" >
          <font-awesome-icon icon="thumbs-down" size="3x" ></font-awesome-icon>
        </button>
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
export default class YesNoPoll extends FillPollType {
  name = '';

  get isValid() {
    return this.isLogged || !this.$v.$invalid;
  }

  submit(option) {
    const vote = { option };
    if (!this.isLogged) {
      if (!this.$v.$invalid) {
        this.vote({ ...vote, author: this.name });
      }
    } else {
      this.vote(vote);
    }
  }
}
</script>
