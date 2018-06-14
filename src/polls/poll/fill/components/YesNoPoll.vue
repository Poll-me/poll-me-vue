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
    <div class="flex-1">
      <div v-if="!hasVoted" class="h-full flex items-center justify-around"
        ref="vote-container">
        <button class="btn btn-tertiary p-4 rounded-lg"
          :title="$t(`polls.types.${poll.type}.yes`)"
          :disabled="!isValid"
          @click="submit(yesOptionValue)" >
          <font-awesome-icon icon="thumbs-up" size="3x" flip="horizontal" ></font-awesome-icon>
        </button>
        <button class="btn btn-tertiary p-4 rounded-lg"
          :title="$t(`polls.types.${poll.type}.no`)"
          :disabled="!isValid"
          @click="submit(noOptionValue)" >
          <font-awesome-icon icon="thumbs-down" size="3x" ></font-awesome-icon>
        </button>
      </div>
      <div v-else ref="results-container">
        <div class="text-center pb-2">
          <b v-t="`polls.types.${poll.type}.results`"></b>
          <span v-if="this.poll.answers.length > 1" class="italic">
            (<span class="text-sm"
              v-t="{ path: `poll.fill.people`, args: { number: this.poll.answers.length }}"></span>)
          </span>
        </div>
        <div class="results-grid">
          <div class="gr-1 gc-1 font-semibold pr-2">
            <span v-t="`polls.types.${poll.type}.yes`"></span>:
          </div>
          <div class="gr-2 gc-1 font-semibold pr-2">
            <span v-t="`polls.types.${poll.type}.no`"></span>:
          </div>
          <ProgressBar class="gr-1 gc-2 my-2" :value="yesPercent" color="tertiary"></ProgressBar>
          <ProgressBar class="gr-2 gc-2 my-2" :value="noPercent" color="tertiary"></ProgressBar>
        </div>
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
  value = 45;
  yesOptionValue = 1;
  noOptionValue = 0;

  get yesPercent() {
    return this.getOptionPercent(this.yesOptionValue);
  }

  get noPercent() {
    return this.getOptionPercent(this.noOptionValue);
  }

  get totalVotes() {
    return this.poll.answers.length;
  }

  get isValid() {
    return this.isLogged || !this.$v.$invalid;
  }

  getOptionPercent(option) {
    const optionVotes = this.poll.answers.filter(ans => ans.option === option).length;
    return (optionVotes * 100) / this.totalVotes;
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
<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: min-content;
  align-items: center;
}
.gr-1 {
  grid-row: 1;
}
.gr-2 {
  grid-row: 2;
}
.gc-1 {
  grid-column: 1;
}
.gc-2 {
  grid-column: 2;
}
</style>
