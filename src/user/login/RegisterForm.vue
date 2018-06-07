<template>
  <div class="flex flex-col">
    <div class="bg-tertiary text-white text-xs">
      <div class="container py-4">
        <div v-t="'user.register.info'"></div>
      </div>
    </div>
    <form class="flex flex-col flex-1" @submit.prevent="submit">
      <div class="flex-1 container py-4">
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
          <label class="mb-2" for="email" v-t="'user.login.email.label'"></label>
          <input v-model.trim="email" @input="$v.email.$touch()"
            :class="{ 'border-red': $v.email.$error }" required
            id="email" type="email" :placeholder="$t('user.register.email.placeholder')" >
          <p v-show="$v.email.$error" class="field-errors mt-3">
            <span v-show="!$v.email.required" v-t="'user.login.email.required-error'"></span>
            <span v-show="!$v.email.email" v-t="'user.login.email.valid-error'"></span>
            <span v-show="!$v.email.notExists" v-t="'user.register.email.exists-error'"></span>
          </p>
        </div>
        <div class="mb-4">
          <label class="mb-2" for="password" v-t="'user.login.password.label'"></label>
          <input v-model.trim="password" @input="$v.password.$touch()"
            :class="{ 'border-red': $v.password.$error }" required
            id="password" type="password" :placeholder="$t('user.login.password.placeholder')" >
          <p v-show="$v.password.$error" class="field-errors mt-3">
            <span v-show="!$v.password.required" v-t="'user.login.password.required-error'"></span>
            <span v-show="!$v.password.minLength"
              v-t="{
                path: 'user.login.password.min-length-error',
                args: { length: $v.password.$params.minLength.min }
              }">
            </span>
          </p>
        </div>
      </div>
      <button class="sticky pin-b py-4 btn btn-secondary rounded-none text-center text-xl"
        type="submit" :disabled="$v.$invalid" >
        <font-awesome-icon icon="user-plus" class="mr-1" ></font-awesome-icon>
        <span v-t="'user.register.submit'"></span>
      </button>
    </form>
  </div>
</template>
<script>
import { VueWithValidations } from '@/utils';
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators';
import Component from 'vue-class-component';
import { mapActions } from 'vuex';

@Component({
  methods: mapActions(['registerEmail']),
  validations: {
    name: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24)
    },
    email: {
      required,
      email,
      notExists() { return !this.isWrongEmail; }
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
})
export default class RegisterForm extends VueWithValidations {
  name = '';
  email = '';
  password = '';

  wrongEmails = [];

  get isWrongEmail() {
    return this.email && this.wrongEmails.indexOf(this.email) >= 0;
  }

  submit() {
    if (!this.$v.$invalid) {
      const payload = { name: this.name, email: this.email, password: this.password };
      this.registerEmail(payload)
        .then(() => this.$emit('signIn', payload))
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.wrongEmails.push(this.email);
              break;
            default:
              this.$emit('error', error);
          }
        });
    }
  }
}
</script>
