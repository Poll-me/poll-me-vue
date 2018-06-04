<template>
  <form class="flex-1 flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <div class="flex items-center mb-4">
        <label for="poll-name" v-t="'polls.new.form.name-label'"></label>
        <input v-model.trim="name" :class="{ 'border-red': $v.name.$error }"
          :placeholder="$t('polls.new.form.name-placeholder')" @input="$v.name.$touch()"
          id="poll-name" type="text" required >
      </div>
      <div v-if="!isLogged" class="flex items-center">
        <label for="poll-author" v-t="'polls.new.form.author-label'"></label>
        <input v-model.trim="author" :class="{ 'border-red': $v.author.$error }"
          @input="$v.author.$touch()" :placeholder="$t('polls.new.form.author-placeholder')"
          id="poll-author" type="text" required >
      </div>
      <div class="">
        <label for="poll-description" class="mt-4 mb-2 flex pr-0 items-center">
          <div class="flex-1" v-t="'polls.new.form.description-label'"></div>
          <switches v-model="hasDescription" color="blue" type-bold="true" ></switches>
        </label>
        <textarea v-show="hasDescription" v-model.trim="description"
          :placeholder="$t('polls.new.form.description-placeholder')"
          @input="$v.description.$touch()" :class="{ 'border-red': $v.description.$error }"
          id="poll-description" rows="4" >
        </textarea>
      </div>
    </div>
    <button type="submit" class="sticky pin-b py-4 btn btn-secondary rounded-none"
      :disabled="$v.$invalid" >
      <div class="text-center text-xl">
        <span v-t="'polls.new.form.submit-button'"></span>
        <font-awesome-icon icon="plus" class="ml-1" ></font-awesome-icon>
      </div>
    </button>
  </form>
</template>
<script>
import Component from 'vue-class-component';
import { required, requiredIf, requiredUnless } from 'vuelidate/lib/validators';
import Switches from 'vue-switches';

import { VueWithValidations } from '@/utils';

@Component({
  components: { Switches },
  props: {
    isLogged: {
      type: Boolean,
      required: true
    },
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
      required: requiredUnless('isLogged')
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

  mounted() {
    if (this.userName) {
      this.author = this.userName;
    }
  }

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
