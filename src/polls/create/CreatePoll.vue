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
              <font-awesome-icon icon="undo" size="sm"
                @click="resetType"></font-awesome-icon>
            </div>
            <small class="italic">{{ type.description }}</small>
          </div>
        </div>
        <form class="flex-1 flex flex-col" @submit.prevent="submit">
          <div class="flex-1 container py-4">
            <div class="flex items-center mb-4">
              <label for="poll-name">
                Name:
              </label>
              <input v-model.trim="name" :class="{ 'border-red': $v.name.$error }"
                @input="$v.name.$touch()"
                id="poll-name" type="text" placeholder="The poll topic" required >
            </div>
            <div class="flex items-center">
              <label for="poll-author">
                Author:
              </label>
              <input v-model.trim="author" :class="{ 'border-red': $v.author.$error }"
                @input="$v.author.$touch()"
                id="poll-author" type="text" placeholder="Who is asking?" required >
            </div>
            <div class="">
              <label for="poll-description" class="mt-4 mb-2 flex pr-0 items-center">
                <div class="flex-1">Description</div>
                <switches v-model="hasDescription" color="blue" type-bold="true" ></switches>
              </label>
              <textarea v-if="hasDescription" v-model.trim="description"
                @input="$v.description.$touch()" :class="{ 'border-red': $v.description.$error }"
                id="poll-author" rows="4" placeholder="Tell about what to participate in">
              </textarea>
            </div>
          </div>
          <button :class="{ 'opacity-75': $v.$invalid }" :disabled="$v.$invalid"
            type="submit" class="sticky pin-b py-4 bg-secondary">
            <div class="text-center text-white text-xl">
              Create
              <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
            </div>
          </button>
        </form>
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
import Component from 'vue-class-component';
import { required, requiredIf } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';
import Switches from 'vue-switches';

import { VueWithValidations } from '@/utils';

const { mapGetters, mapActions } = createNamespacedHelpers('polls');

@Component({
  components: { Switches },
  computed: mapGetters(['typesList']),
  methods: mapActions(['createPoll']),
  validations: {
    name: {
      required
    },
    author: {
      required
    },
    description: {
      required: requiredIf('hasDescription')
    }
  }
})
export default class CreatePoll extends VueWithValidations {
  name = '';
  author = '';
  description = '';
  hasDescription = false;
  type = {};

  resetType() {
    this.type = {};
  }

  submit() {
    if (!this.$v.$invalid) {
      const { name, author, description, hasDescription } = this;
      this.createPoll({
        type: this.type.id,
        name,
        author,
        description: hasDescription ? description : ''
      })
        .then(key => this.$router.push({ name: 'fill-poll', params: { key } }));
    }
  }
}
</script>
