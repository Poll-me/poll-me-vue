<template>
  <form class="flex-1 flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <NewPollFormBase
        :isLogged="isLogged"
        :name.sync="name"
        :author.sync="author"
        :hasDescription.sync="hasDescription"
        :description.sync="description"></NewPollFormBase>

      <div class="pt-2">
        <label v-t="`polls.types.${type}.options.title`"></label>
        <div v-for="(v, index) in $v.options.$each.$iter" :key="index">
          <div class="mt-2">
            <input v-model.trim="v.label.$model"
              :placeholder="getOptionPlaceholder(index)" />
          </div>
          <div class="error" v-if="!v.label.required">label is required.</div>
          <div class="error" v-if="!v.label.minLength">
            label must have at least {{ v.label.$params.minLength.min }} letters.
          </div>
        </div>
      </div>
    </div>
    <slot name="submit" :invalid="$v.$invalid"></slot>
  </form>
</template>
<script>
import Component from 'vue-class-component';
import { required, maxLength, minLength } from 'vuelidate/lib/validators';

import NewPollFormMixin from '../new-poll-form-mixin';

@Component({
  validations: {
    options: {
      required,
      minLength: minLength(2),
      $each: {
        label: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        }
      }
    }
  }
})
export default class NewSelectionPollForm extends NewPollFormMixin {
  options = [];

  getOptionPlaceholder(index) {
    const number = parseInt(index, 10) + 1;
    return this.$t(`polls.types.${this.type}.options.placeholder`, { number });
  }
}
</script>
