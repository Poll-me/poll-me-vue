<template>
  <form class="flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <div class="mb-4">
        <label class="mb-2" for="email" v-t="'user.login.email.label'"></label>
        <input v-model.trim="email" @input="$v.email.$touch()"
          :class="{ 'border-red': $v.email.$error }" required
          id="email" type="email" :placeholder="$t('user.login.email.placeholder')" >
        <p v-show="$v.email.$error" class="field-errors mt-3">
          <span v-show="!$v.email.required" v-t="'user.login.email.required-error'"></span>
          <span v-show="!$v.email.email" v-t="'user.login.email.valid-error'"></span>
          <span v-show="!$v.email.exists" v-t="'user.login.email.exists-error'"></span>
        </p>
      </div>
      <div class="mb-4">
        <label class="mb-2" for="password" v-t="'user.login.password.label'"></label>
        <input v-model.trim="password" @input="$v.password.$touch()"
          :class="{ 'border-red': $v.password.$error }"
          id="password" type="password" placeholder="********" required >
        <p v-show="$v.password.$error" class="field-errors mt-3">
          <span v-show="!$v.password.required" v-t="'user.login.password.required-error'"></span>
          <span v-show="!$v.password.minLength"
            v-t="{
              path: 'user.login.password.min-length-error',
              args: { length: $v.password.$params.minLength.min }
            }">
          </span>
          <span v-show="!$v.password.notWrong" v-t="'user.login.password.wrong-error'"></span>
        </p>
      </div>
    </div>
    <button :class="{ 'opacity-75': $v.$invalid }" :disabled="$v.$invalid"
      type="submit" class="sticky pin-b py-4 bg-secondary text-center text-white text-xl">
      <font-awesome-icon icon="sign-in-alt" class="mr-1" ></font-awesome-icon>
      <span v-t="'user.login.submit'"></span>
    </button>
  </form>
</template>
<script>
import { VueWithValidations } from '@/utils';
import Component from 'vue-class-component';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

@Component({
  methods: mapActions(['signIn']),
  validations: {
    email: {
      required,
      email,
      exists() { return !this.isWrongEmail; }
    },
    password: {
      required,
      minLength: minLength(8),
      notWrong() { return !this.isWrongPassword; }
    }
  }
})
export default class LoginForm extends VueWithValidations {
  email = '';
  password = '';

  wrongEmails = [];
  wrongPasswords = {};

  get isWrongEmail() {
    return this.email && this.wrongEmails.indexOf(this.email) >= 0;
  }

  get isWrongPassword() {
    const wrongPasswords = this.wrongPasswords[this.email];
    return Array.isArray(wrongPasswords) && wrongPasswords.indexOf(this.password) >= 0;
  }

  submit() {
    if (!this.$v.$invalid) {
      const payload = { email: this.email, password: this.password };
      this.signIn(payload)
        .then(() => this.$emit('signIn', payload))
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              this.wrongEmails.push(this.email);
              break;
            case 'auth/wrong-password': {
              const passwordsList = this.wrongPasswords[this.email] || [];
              this.wrongPasswords = {
                ...this.wrongPasswords,
                [this.email]: [...passwordsList, this.password]
              };
              break;
            }
            default:
              this.$emit('error', error);
          }
        });
    }
  }
}
</script>
