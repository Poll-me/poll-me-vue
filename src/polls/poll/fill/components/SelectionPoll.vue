<template>
  <div class="h-full flex flex-col">
    <div v-if="!isLogged || hasVoted" class="bg-secondary rounded p-2 mb-4 shadow">
      <template v-if="!hasVoted" ref="vote-container">
        <div class="flex">
          <div v-t="`polls.fill.author-label`"
            class="text-white font-semibold pl-1 pr-3 flex items-center"></div>
          <div class="flex-1 text-grey-darker" >
            <input v-model.trim="name" @input="$v.name.$touch()"
              v-bind:class="{ 'border-red': $v.name.$error }"
              :placeholder="$t(`polls.fill.author-placeholder`)"
              id="name" type="text" class="shadow-none border-transparent border-2">
          </div>
        </div>
      </template>
      <div v-else class="flex" ref="remove-vote-container">
        <div v-t="`polls.fill.already-answered`"
          class="flex-1 text-white font-semibold px-1 flex items-center"></div>
        <button class="btn btn-primary" @click="removeVote()">
          <span v-t="`polls.fill.get-out`"></span>
          <font-awesome-icon icon="sign-out-alt" fixed-width></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="flex-1">
      <div v-if="!hasVoted" ref="vote-container">
        <label class="text-base text-center pb-2" v-t="`polls.types.${poll.type}.choose`"></label>
        <ul class="list-reset">
          <li v-for="(label, value) in poll.options" :key="value" class="mt-2">
            <button
              class="btn btn-tertiary w-full text-left"
              @click="submit(value)"
              >#{{ value + 1 }} - {{ label }}</button>
          </li>
        </ul>
      </div>
      <div v-else ref="results-container">
        <div class="text-center pb-2">
          <span class="text-lg font-medium" v-t="`polls.fill.results`"></span>
          <i v-if="totalVotes > 1" class="text-sm">
            (<span v-t="{ path: `poll.fill.people`, args: { number: totalVotes }}"></span>)
          </i>
        </div>
        <div class="">
          <div v-for="optionVotes in optionsVotes" :key="optionVotes.label" class="mt-2">
            <div class="mb-2">
              <span class="font-medium text-grey-bg-grey-darker">{{ optionVotes.label }}</span>
              <i class="text-sm">({{ optionVotes.count }})</i>
            </div>
            <ProgressBar color="primary"
              :value="optionVotes.percentage"></ProgressBar>
          </div>
        </div>
        <button class="btn btn-tertiary outline w-full mt-4"
          @click="showVotes = !showVotes">
          <span class="font-bold"
            v-t="`polls.fill.${showVotes ? 'hide' : 'show'}-votes`"></span>
          <font-awesome-icon fixed-width
            :icon="`${showVotes ? 'chevron-up' : 'list-ul'}`"></font-awesome-icon>
        </button>
        <div v-if="showVotes" class="flex flex-wrap text-center -m-2">
          <div v-for="optionVotes in optionsWithVotes" :key="optionVotes.label" class="w-1/2 p-2">
            <div class="font-medium my-2 truncate" >{{ optionVotes.label }}</div>
            <ul class="list-reset -m-1 text-sm text-white">
              <li v-for="ans in optionVotes.votes" :key="ans.user"
                class="p-1 flex w-full" >
                <div class="bg-tertiary shadow p-2 rounded flex-1 flex flex-col justify-center"
                  :class="{ 'rounded-r-none': isAuthor }">
                  {{ ans.author }}
                </div>
                <button v-if="isAuthor" class="btn rounded-l-none" @click="removeVote(ans.user)">
                  <font-awesome-icon icon="times" size="lg"></font-awesome-icon>
                </button>
              </li>
            </ul>
          </div>
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
export default class SelectionPoll extends FillPollType {
  name = '';
  showVotes = false;

  get optionsVotes() {
    return this.poll.options.map((label, value) => {
      const votes = this.poll.answers.filter(ans => ans.option === value);
      const count = votes.length;
      const percentage = (count * 100) / this.totalVotes;
      return { label, votes, count, percentage };
    });
  }

  get optionsWithVotes() {
    return this.optionsVotes.filter(optVotes => optVotes.count > 0);
  }

  get totalVotes() {
    return this.poll.answers.length;
  }

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
