<template>
  <div class="h-full flex flex-col">
    <div class="text-center container py-4">
      <div class="inline-block rounded-full border-4 border-primary w-24 h-24 overflow-hidden">
        <img v-if="profile.photoUrl" :src="profile.photoUrl"
          class="min-w-full min-h-full" >
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
        <div class="mb-4">
          <label class="mb-2 flex pr-0 items-center">
            <div class="flex-1" v-t="'user.profile.change-password'"></div>
            <switches id="change-password" v-model="changePassword" color="blue" type-bold="true" >
            </switches>
          </label>
          <div v-if="changePassword">
            <div class="mb-4">
              <label class="mb-2" for="currentPassword"
                v-t="'user.profile.current-password.label'"></label>
              <input v-model.trim="currentPassword" @input="$v.currentPassword.$touch()"
                id="currentPassword" type="password" required
                :class="{ 'border-red': $v.currentPassword.$error }"
                :placeholder="$t('user.profile.current-password.placeholder')" >
            </div>
            <div class="mb-4">
              <label class="mb-2" for="newPassword"
                v-t="'user.profile.new-password.label'"></label>
              <input v-model.trim="newPassword" @input="$v.newPassword.$touch()"
                id="newPassword" type="password" required
                :class="{ 'border-red': $v.newPassword.$error }"
                :placeholder="$t('user.profile.new-password.placeholder')" >
            </div>
            <div class="mb-4">
              <label class="mb-2" for="confirmPassword"
                v-t="'user.profile.confirm-password.label'"></label>
              <input v-model.trim="confirmPassword" @input="$v.confirmPassword.$touch()"
                id="confirmPassword" type="password" required
                :class="{ 'border-red': $v.confirmPassword.$error }"
                :placeholder="$t('user.profile.confirm-password.placeholder')" >
            </div>
          </div>
        </div>
      </div>
      <button v-show="hasChanges" :class="{ 'opacity-75': $v.$invalid }" :disabled="$v.$invalid"
        type="submit" class="sticky pin-b py-4 bg-secondary text-center text-white text-xl">
        <font-awesome-icon icon="edit" class="mr-1" ></font-awesome-icon>
        <span v-t="'user.profile.submit-button'"></span>
      </button>
    </form>
  </div>
</template>
<script>
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import { required, requiredIf, sameAs, maxLength, minLength } from 'vuelidate/lib/validators';
import Switches from 'vue-switches';

import { VueWithValidations } from '@/utils';


@Component({
  components: { Switches },
  computed: mapState({
    profile: state => state.user.profile
  }),
  methods: mapActions(['updateUserProfile']),
  validations: {
    name: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24)
    },
    currentPassword: {
      requiredIf: requiredIf('changePassword'),
      minLength: minLength(8)
    },
    newPassword: {
      requiredIf: requiredIf('changePassword'),
      minLength: minLength(8),
      notSameAsCurrentPassword(val) { return val !== this.currentPassword }
    },
    confirmPassword: {
      requiredIf: requiredIf('changePassword'),
      sameAsNewPassword: sameAs('newPassword')
    }
  }
})
export default class UserProfile extends VueWithValidations {
  name = '';
  photoUrl = '';
  changePassword = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  get hasChanges() {
    const { displayName, photoUrl } = this.profile;
    return this.name !== displayName ||
      (this.photoUrl.length > 0 && this.photoUrl !== photoUrl) ||
      this.newPassword.length > 0;
  }

  get updateData() {
    const { displayName, photoUrl } = this.profile;
    const data = {};
    if (this.name !== displayName) {
      data.displayName = this.name;
    }
    if (this.photoUrl.length > 0 && this.photoUrl !== photoUrl) {
      data.photoUrl = this.photoUrl;
    }
    return data;
  }

  created() {
    this.name = this.profile.displayName;
  }

  submit() {
    if (!this.$v.invalid) {
      this.updateUserProfile({ profile: this.updateData })
        .then(data => console.log(data));
    }
  }
}
</script>
