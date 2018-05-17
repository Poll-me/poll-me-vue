<template>
  <div class="h-full flex flex-col">
    <div class="flex-1">
      <div class="text-center container py-4">
        <div class="inline-block rounded-full border-4 border-primary w-24 h-24">
          <img v-if="profile.photoUrl" :src="profile.photoUrl">
          <div v-else class="h-full flex items-center justify-center">
            <font-awesome-icon :icon="['far', 'smile']" size="4x"
              class="text-grey-darker"></font-awesome-icon>
          </div>
        </div>
      </div>
      <form class="flex flex-col flex-1" @submit.prevent="submit" >
        <div class="flex-1 container">
          <div class="mb-4">
            <label class="mb-2" for="name" v-t="'user.register.name.label'"></label>
            <input v-model.trim="name" @input="$v.name.$touch()"
              :class="{ 'border-red': $v.name.$error }" required
              id="name" type="text" :placeholder="$t('user.register.name.placeholder')" >
            <p v-show="$v.name.$error" class="field-errors mt-3">
              <span v-show="!$v.name.required" v-t="'user.register.name.required-error'"></span>
              <span v-show="!$v.name.minLength || !$v.name.maxLength"
                v-t="{
                  path: 'user.register.name.length-error',
                  args: { min: $v.name.$params.minLength.min, max: $v.name.$params.maxLength.max }
                }">
              </span>
            </p>
          </div>
          <div class="mb-4">
            <label class="mb-2" v-t="'user.login.email.label'"></label>
            <input id="email" type="email" :value="profile.email" disabled >
          </div>
        </div>
        <button :class="{ 'opacity-75': $v.$invalid }" :disabled="$v.$invalid"
          type="submit" class="sticky pin-b py-4 bg-secondary text-center text-white text-xl">
          <font-awesome-icon icon="user-plus" class="mr-1" ></font-awesome-icon>
          <span v-t="'user.register.submit'"></span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import { required, maxLength, minLength } from 'vuelidate/lib/validators';

import { VueWithValidations } from '@/utils';


@Component({
  computed: mapState({
    profile: state => state.user.profile
  }),
  methods: mapActions(['updateUserProfile']),
  validations: {
    name: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24)
    }
  }
})
export default class UserProfile extends VueWithValidations {
  name = '';
  photoUrl = '';
  currentPassword = '';
  newPasswrod = '';
  confirmPassword = '';

  created() {
    this.name = this.profile.displayName;
  }

  submit() {
    if (!this.$v.invalid) {
      console.log('Hello');
    }
  }
}
</script>
