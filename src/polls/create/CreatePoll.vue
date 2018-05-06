<template>
  <div class="h-full flex flex-col">
    <div class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-lg font-medium text-center mb-4">Create a poll</h1>
        <select id="poll-type" v-model="type" placeholder="What kind of poll?">
          <option disabled :value="0">What kind of poll?</option>
          <option :value="1">Registration</option>
        </select>
      </div>
    </div>
    <div class="container py-4 flex-1">
      <form v-if="type" class="">
        <div>
          <div class="flex items-center mb-4">
            <label for="poll-name">
              Name:
            </label>
            <input id="poll-name" type="text" placeholder="The poll topic">
          </div>
          <div class="flex items-center">
            <label for="poll-author">
              Author:
            </label>
            <input id="poll-author" type="text" placeholder="Who is asking?">
          </div>
        </div>
      </form>
      <div v-else class="h-full flex items-center text-center" >
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

@Component()
export default class CreatePoll extends Vue {
  name = '';
  author = '';
  type = 0;
}
</script>
<style lang="postcss" scoped>
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

