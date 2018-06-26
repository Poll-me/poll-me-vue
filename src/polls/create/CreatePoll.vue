<template>
  <div class="h-full flex flex-col">
    <div class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-lg font-medium text-center" v-t="'polls.new.title'"></h1>
        <select v-show="!typeId" id="type-selector" class="mt-4"
          :value="typeIdNumber"
          @change="typeChanged" >
          <option disabled :value="0" v-t="'polls.new.type-placeholder'"></option>
          <option v-for="pollType in typesList" :key="pollType.id" :value="pollType.id"
            v-t="`polls.types.${pollType.id}.name`" ></option>
        </select>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <template v-if="typeExists">
        <div class="bg-tertiary text-white" >
          <div class="container py-4">
            <div class="flex mb-2 items-center">
              <div class="flex-1 font-medium" v-t="`polls.types.${typeId}.name`"></div>
              <router-link :to="{ name: 'new-poll' }" class="text-white">
                <font-awesome-icon icon="undo" size="sm" class="cursor-pointer">
                </font-awesome-icon>
              </router-link>
            </div>
            <small class="italic" v-t="`polls.types.${typeId}.description`"></small>
          </div>
        </div>
        <component
          :is="newPollComponent"
          :type="typeIdNumber"
          :is-logged="user.isLogged"
          @submit="submit" >
          <button type="submit" class="sticky pin-b py-4 btn btn-secondary rounded-none"
            slot="submit" slot-scope="submitScope"
            :disabled="submitScope.invalid" >
            <div class="text-center text-xl">
              <span v-t="'polls.new.form.submit-button'"></span>
              <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
            </div>
          </button>
        </component>
      </template>
      <div v-else class="container flex-1 flex items-center text-center" >
        <div class="flex-1">
          <font-awesome-icon icon="arrow-up" size="2x"></font-awesome-icon>
          <div class="mt-8">{{ $t('polls.new.first-select-type') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState as mapRootState, createNamespacedHelpers } from 'vuex';

import newPollComponentsMap from './components';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('polls');

@Component({
  props: {
    typeId: {
      type: String
    }
  },
  computed: { ...mapState(['types']), ...mapGetters(['typesList']), ...mapRootState(['user']) },
  methods: mapActions(['createPoll'])
})
export default class CreatePoll extends Vue {
  get typeIdNumber() {
    return parseInt(this.typeId || 0, 10);
  }

  get typeExists() {
    return this.typeId && this.types[this.typeId];
  }

  get newPollComponent() {
    return this.typeExists ? newPollComponentsMap(this.typeIdNumber) : {};
  }

  created() {
    if (this.typeId && !this.types[this.typeId]) {
      this.$router.replace({ name: 'not-found' });
    }
  }

  typeChanged(ev) {
    const typeId = ev.target.value;
    this.$router.push({ name: 'new-poll', params: { typeId } });
  }

  submit(data) {
    const pollData = { ...data, type: this.typeIdNumber };
    this.createPoll(pollData)
      .then(key => this.$router.push({ name: 'fill-poll', params: { key } }));
  }
}
</script>
