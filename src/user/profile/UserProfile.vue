<template>
  <div class="h-full flex flex-col">
    <div class="text-center container py-4">
      <UserAvatar :profile="profile" size="lg"></UserAvatar>
      <div class="mt-2 flex justify-center">
        <FileUploader file-types="image/*" :text="$t('user.profile.upload-avatar')"
          :loading="updatingAvatar" @files-ready="updateAvatar" ></FileUploader>
        <button v-if="profile.photoUrl" @click="updateAvatar()" :disabled="updatingAvatar"
          class="btn bg-grey-dark ml-2 text-white">
          <font-awesome-icon icon="trash-alt">
          </font-awesome-icon>
        </button>
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
              <p v-show="$v.currentPassword.$error" class="field-errors mt-3">
                <span v-show="!$v.currentPassword.requiredIf"
                  v-t="'user.profile.required-error'"></span>
                <span v-show="!$v.currentPassword.minLength"
                  v-t="{
                    path: 'user.profile.min-length-error',
                    args: { min: $v.currentPassword.$params.minLength.min }
                  }">
                </span>
                <span v-show="!$v.currentPassword.notWrong"
                  v-t="'user.login.password.wrong-error'"></span>
              </p>
            </div>
            <div class="mb-4">
              <label class="mb-2" for="newPassword"
                v-t="'user.profile.new-password.label'"></label>
              <input v-model.trim="newPassword" @input="$v.newPassword.$touch()"
                id="newPassword" type="password" required
                :class="{ 'border-red': $v.newPassword.$error }"
                :placeholder="$t('user.profile.new-password.placeholder')" >
              <p v-show="$v.newPassword.$error" class="field-errors mt-3">
                <span v-show="!$v.newPassword.requiredIf"
                  v-t="'user.profile.required-error'"></span>
                <span v-show="!$v.newPassword.minLength"
                  v-t="{
                    path: 'user.profile.min-length-error',
                    args: { min: $v.newPassword.$params.minLength.min }
                  }">
                </span>
                <span v-show="!$v.newPassword.notSameAsCurrentPassword"
                  v-t="'user.profile.new-password.not-same-as-current-error'"></span>
              </p>
            </div>
            <div class="mb-4">
              <label class="mb-2" for="confirmPassword"
                v-t="'user.profile.confirm-password.label'"></label>
              <input v-model.trim="confirmPassword" @input="$v.confirmPassword.$touch()"
                id="confirmPassword" type="password" required
                :class="{ 'border-red': $v.confirmPassword.$error }"
                :placeholder="$t('user.profile.confirm-password.placeholder')" >
              <p v-show="$v.confirmPassword.$error" class="field-errors mt-3">
                <span v-show="!$v.confirmPassword.requiredIf"
                  v-t="'user.profile.required-error'"></span>
                <span v-show="!$v.confirmPassword.sameAsNewPassword"
                  v-t="'user.profile.confirm-password.same-as-new-error'"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button v-show="hasChanges" :class="{ 'opacity-75': $v.$invalid || loading }"
        :disabled="$v.$invalid || loading"
        type="submit" class="sticky pin-b py-4 bg-secondary text-center text-white text-xl">
        <template v-if="!loading">
          <font-awesome-icon icon="edit" class="mr-1" ></font-awesome-icon>
          <span v-t="'user.profile.submit-button'"></span>
        </template>
        <font-awesome-icon v-else icon="spinner" spin ></font-awesome-icon>
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
  methods: mapActions(['updateUserProfile', 'updateUserPassword', 'updateUserAvatar']),
  watch: {
    changePassword(val) {
      if (!val) {
        this.resetPasswordFields();
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24)
    },
    currentPassword: {
      requiredIf: requiredIf('changePassword'),
      minLength: minLength(8),
      notWrong() { return !this.isWrongPassword; }
    },
    newPassword: {
      requiredIf: requiredIf('changePassword'),
      minLength: minLength(8),
      notSameAsCurrentPassword(val) { return !(val && val === this.currentPassword); }
    },
    confirmPassword: {
      requiredIf: requiredIf('changePassword'),
      sameAsNewPassword: sameAs('newPassword')
    }
  }
})
export default class UserProfile extends VueWithValidations {
  name = '';
  changePassword = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  wrongPasswords = [];
  loading = false;
  updatingAvatar = false;

  get hasChanges() {
    return this.name !== this.profile.displayName ||
      this.newPassword.length > 0;
  }

  get updateData() {
    const { displayName } = this.profile;
    const data = {};
    if (this.name !== displayName) {
      data.displayName = this.name;
    }
    return data;
  }

  get isWrongPassword() {
    return this.changePassword && this.wrongPasswords.indexOf(this.currentPassword) >= 0;
  }

  mounted() {
    this.name = this.profile.displayName;
  }

  updateAvatar(files) {
    this.updatingAvatar = true;
    const image = Array.isArray(files) ? files.shift() : undefined;
    this.updateUserAvatar({ image }).then(() => {
      this.updatingAvatar = false;
    });
  }

  resetPasswordFields() {
    this.changePassword = false;
    this.currentPassword = '';
    this.$v.currentPassword.$reset();
    this.newPassword = '';
    this.$v.newPassword.$reset();
    this.confirmPassword = '';
    this.$v.confirmPassword.$reset();
  }

  submit() {
    if (!this.$v.invalid) {
      const updatePromises = [];
      this.loading = true;
      if (Object.keys(this.updateData).length > 0) {
        updatePromises.push(this.updateUserProfile({ profile: this.updateData }));
      }
      if (this.changePassword) {
        updatePromises.push(this.updateUserPassword({
          password: this.currentPassword,
          newPassword: this.newPassword
        })
          .then(() => this.resetPasswordFields())
          .catch((error) => {
            switch (error.code) {
              case 'auth/wrong-password':
                this.wrongPasswords = [...this.wrongPasswords, this.currentPassword];
                break;
              default:
                this.resetPasswordFields();
            }
          })
        );
      }
      Promise.all(updatePromises).then(() => {
        this.loading = false;
      });
    }
  }
}
</script>
