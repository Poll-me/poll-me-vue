<template>
  <div class="h-full flex flex-col">
    <div class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-lg font-medium text-center">New poll</h1>
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
    <div class="flex-1 flex flex-col">
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
        <form class="flex-1 container py-4">
          <div class="flex items-center mb-4">
            <label for="poll-name">
              Name:
            </label>
            <input v-model.trim="name"
              id="poll-name" type="text" placeholder="The poll topic">
          </div>
          <div class="flex items-center">
            <label for="poll-author">
              Author:
            </label>
            <input v-model.trim="author"
              id="poll-author" type="text" placeholder="Who is asking?">
          </div>
          <div class="">
            <label for="poll-description" class="mt-4 mb-2">
              Description:
            </label>
            <textarea v-model.trim="description"
              id="poll-author" rows="4" placeholder="Tell about what to participate in">
            </textarea>
          </div>
        </form>
        <div :class="{ 'opacity-75 cursor-not-allowed': !isValid }"
          class="sticky pin-b py-4 bg-secondary">
          <div class="text-center text-white text-xl">
            Create
            <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
          </div>
        </div>
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
import { VueWithValidations } from '@/utils';
import Component from 'vue-class-component';
import { required } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('polls');

@Component({
  computed: mapState(['types']),
  validations: {
    name: {
      required
    },
    author: {
      required
    }
  }
})
export default class CreatePoll extends VueWithValidations {
  name = '';
  author = '';
  description = '';
  type = 0;

  get selectedType() {
    return this.types[this.type];
  }

  get isValid() {
    return !this.$v.name.$invalid && !this.$v.author.$invalid;
  }

  resetType() {
    this.type = 0;
  }
}
</script>
