<template>
  <div class="h-full flex flex-col">
    <div class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-lg font-medium text-center">New poll</h1>
        <select v-show="!type.id" v-model="type"
          id="poll-type"
          class="mt-4">
          <option disabled :value="{}">What kind of poll?</option>
          <option v-for="pollType in typesList" :key="pollType.id" :value="pollType">
            {{ pollType.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <template v-if="type.id">
        <div class="bg-blue-dark text-white" >
          <div class="container py-4">
            <div class="flex mb-2 items-center">
              <div class="flex-1 font-medium">{{ type.name }}</div>
              <font-awesome-icon icon="undo" size="sm" class="cursor-pointer"
                @click="resetType"></font-awesome-icon>
            </div>
            <small class="italic">{{ type.description }}</small>
          </div>
        </div>
        <NewPollForm :type="type.id" @submit="submit"></NewPollForm>
      </template>
      <div v-else class="container flex-1 flex items-center text-center" >
        <div class="flex-1">
          <font-awesome-icon icon="arrow-up" size="2x"></font-awesome-icon>
          <div class="mt-8">First, select what kind of poll you want to create</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { createNamespacedHelpers } from 'vuex';

import NewPollForm from './components';

const { mapGetters, mapActions } = createNamespacedHelpers('polls');

@Component({
  components: { NewPollForm },
  computed: mapGetters(['typesList']),
  methods: mapActions(['createPoll'])
})
export default class CreatePoll extends Vue {
  type = {};

  resetType() {
    this.type = {};
  }

  submit(data) {
    const pollData = { ...data, type: this.type.id };
    this.createPoll(pollData)
      .then(key => this.$router.push({ name: 'fill-poll', params: { key } }));
  }
}
</script>
