<template>
  <form class="flex-1 flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <NewPollFormBase
        :isLogged="isLogged"
        :name.sync="name"
        :author.sync="author"
        :hasDescription.sync="hasDescription"
        :description.sync="description"></NewPollFormBase>

      <div>
        <label class="py-2" v-t="`polls.types.${type}.options.title`"></label>
        <div v-for="(v, index) in $v.options.$each.$iter" :key="v.$model.value">
          <div class="mt-2">
            <div class="flex">
              <input v-model.trim="v.label.$model" class="flex-1"
                :class="{ 'border-red': v.label.$error }"
                :placeholder="getOptionPlaceholder(index)" />
              <button class="btn ml-2" @click="removeOption(v.$model.value)">
                <font-awesome-icon icon="trash-alt"></font-awesome-icon>
              </button>
            </div>
            <p v-show="v.label.$error" class="field-errors mt-2">
              <span v-show="!v.label.required"
                v-t="`polls.types.${type}.options.label.required-error`"></span>
              <span v-show="!v.label.minLength || !v.label.maxLength"
                v-t="{
                  path: `polls.types.${type}.options.label.length-error`,
                  args: { min: v.label.$params.minLength.min, max: v.label.$params.maxLength.max }
                }">
              </span>
              <span v-show="!v.label.unique"
                v-t="`polls.types.${type}.options.label.unique-error`"></span>
            </p>
          </div>
        </div>
        <p v-show="$v.options.$error" class="field-errors mt-2">
          <span v-show="!$v.options.minLength"
            v-t="{
              path: `polls.types.${type}.options.length-error`,
              args: { min: $v.options.$params.minLength.min }
            }">
          </span>
        </p>
        <button class="btn btn-tertiary outline text-sm w-full mt-4"
          @click="addOption">
          <span v-t="`polls.types.${this.type}.options.add`"></span>
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </button>
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
          maxLength: maxLength(24),
          unique(val) { return this.options.filter(opt => opt.label === val).length === 1; }
        }
      }
    }
  }
})
export default class NewSelectionPollForm extends NewPollFormMixin {
  options = [];

  addOption() {
    this.$v.options.$touch();
    this.options = [...this.options, { label: '', value: this.options.length + 1 }];
  }

  removeOption(value) {
    this.options = this.options
      .filter(opt => opt.value !== value)
      .map((opt, index) => ({ ...opt, value: index + 1 }));
  }

  getOptionPlaceholder(index) {
    const number = parseInt(index, 10) + 1;
    return this.$t(`polls.types.${this.type}.options.placeholder`, { number });
  }

  getOptionsMap() {
    return this.options.reduce((opts, opt) => ({ ...opts, [opt.value]: opt.label }), {});
  }

  getFormData() {
    const options = this.getOptionsMap();
    return {
      options
    };
  }
}
</script>
