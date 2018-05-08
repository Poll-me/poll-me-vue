<template>
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
<script>
import Component from 'vue-class-component';
import { required, requiredIf } from 'vuelidate/lib/validators';
import Switches from 'vue-switches';

import { VueWithValidations } from '@/utils';

@Component({
  components: { Switches },
  props: {
    type: {
      required: true,
      type: Number
    }
  },
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
export default class NewPollForm extends VueWithValidations {
  name = '';
  author = '';
  description = '';
  hasDescription = false;

  submit() {
    if (!this.$v.$invalid) {
      const { name, author, description, hasDescription } = this;
      this.$emit('submit', {
        name,
        author,
        description: hasDescription ? description : ''
      });
    }
  }
}
</script>
