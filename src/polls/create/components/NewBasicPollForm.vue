<template>
  <form class="flex-1 flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <NewPollFormBase
        ref="baseForm"
        :isLogged="isLogged"
        :name.sync="name"
        :author.sync="author"
        :hasDescription.sync="hasDescription"
        :description.sync="description"></NewPollFormBase>
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
// import {  } from 'vuelidate/lib/validators';

import NewPollFormMixin from '../new-poll-form-mixin';

@Component({
  validations: {
  }
})
export default class NewBasicPollForm extends NewPollFormMixin {
  submit() {
    if (!this.$v.$invalid) {
      this.$emit('submit', this.getSubmitData());
    }
  }
}
</script>
