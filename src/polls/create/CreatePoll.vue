<template>
  <div class="h-full flex flex-col">
    <div class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-lg font-medium text-center">Create a poll</h1>
        <select v-show="!type" v-model="type"
          id="poll-type"
          class="mt-4">
          <option disabled :value="0">What kind of poll?</option>
          <option v-for="(pollType, typeId) in types" :key="typeId" :value="typeId">
            {{ pollType.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex-1">
      <template v-if="selectedType">
        <div class="bg-blue-dark text-white" >
          <div class="container py-4">
            <div class="flex mb-2 items-center">
              <div class="flex-1 font-medium">{{ selectedType.name }}</div>
              <font-awesome-icon icon="undo" size="sm"
                @click="resetType"></font-awesome-icon>
            </div>
            <small class="italic">{{ selectedType.description }}</small>
          </div>
        </div>
        <form class="container py-4">
          <div class="flex items-center mb-4">
            <label for="poll-name">
              Name:
            </label>
            <input v-model="name"
              id="poll-name" type="text" placeholder="The poll topic">
          </div>
          <div class="flex items-center">
            <label for="poll-author">
              Author:
            </label>
            <input v-model="author"
              id="poll-author" type="text" placeholder="Who is asking?">
          </div>
        </form>
      </template>
      <div v-else class="container h-full flex items-center text-center" >
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

const { mapState } = createNamespacedHelpers('polls');

@Component({
  computed: mapState(['types'])
})
export default class CreatePoll extends Vue {
  name = '';
  author = '';
  type = 0;

  get selectedType() {
    return this.types[this.type];
  }

  resetType() {
    this.type = 0;
  }
}
</script>
<style lang="postcss" scoped >
@tailwind utilities;

label {
  @apply .block;
  @apply .text-grey-darker;
  @apply .text-sm;
  @apply .font-semibold;
  @apply .pr-2;
}

input, select, textarea {
  @apply .shadow;
  @apply .appearance-none;
  @apply .border;
  @apply .rounded;
  @apply .w-full;
  @apply .py-2;
  @apply .px-3;
  @apply .text-grey-darker;
}

select {
  @apply .bg-white;
}
</style>

