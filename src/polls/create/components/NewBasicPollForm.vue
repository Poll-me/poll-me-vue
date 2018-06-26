<template>
  <form class="flex-1 flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <NewPollFormBase
        :isLogged="isLogged"
        :name.sync="name"
        :author.sync="author"
        :hasDescription.sync="hasDescription"
        :description.sync="description"></NewPollFormBase>
    </div>
    <slot name="submit" :invalid="$v.$invalid"></slot>
  </form>
</template>
<script>
import Component from 'vue-class-component';

import NewPollFormMixin from '../new-poll-form-mixin';

@Component()
export default class NewBasicPollForm extends NewPollFormMixin {}
</script>
