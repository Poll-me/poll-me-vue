<template>
  <div>
    <div class="flex items-center mb-4">
      <label for="poll-name" v-t="'polls.new.form.name-label'"></label>
      <input id="poll-name" type="text"
        :class="{ 'border-red': $v.name.$error }"
        :placeholder="$t('polls.new.form.name-placeholder')"
        @input="updateField('name', $event.target.value)" >
    </div>
    <div v-if="!isLogged" class="flex items-center">
      <label for="poll-author" v-t="'polls.new.form.author-label'"></label>
      <input id="poll-author" type="text"
        :class="{ 'border-red': $v.author.$error }"
        :placeholder="$t('polls.new.form.author-placeholder')"
        @input="updateField('author', $event.target.value)" >
    </div>
    <div>
      <label for="poll-description" class="mt-4 mb-2 flex pr-0 items-center">
        <div class="flex-1" v-t="'polls.new.form.description-label'"></div>
        <switches color="blue" type-bold="true"
          :value="hasDescription"
          @input="updateField('hasDescription', $event)" ></switches>
      </label>
      <textarea v-show="hasDescription" id="poll-description" rows="4"
        :placeholder="$t('polls.new.form.description-placeholder')"
        :class="{ 'border-red': $v.description.$error }"
        @input="updateField('description', $event.target.value)" >
      </textarea>
    </div>
  </div>
</template>
<script>
import Component from 'vue-class-component';
import Switches from 'vue-switches';

import { VueWithValidations } from '@/utils';
import { getBaseValidations } from '../new-poll-form-mixin';

@Component({
  components: { Switches },
  props: {
    name: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    hasDescription: {
      type: Boolean,
      default: false
    },
    isLogged: {
      type: Boolean,
      required: true
    }
  },
  validations: getBaseValidations()
})
export default class NewPollFormBase extends VueWithValidations {
  updateField(field, value) {
    this.$emit(`update:${field}`, value);
    if (typeof this.$v[field] === 'object') {
      this.$v[field].$touch();
    }
  }
}
</script>
