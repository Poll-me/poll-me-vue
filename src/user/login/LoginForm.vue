<template>
  <form class="flex flex-col" @submit.prevent="submit">
    <div class="flex-1 container py-4">
      <div class="mb-4">
        <label class="mb-2" for="email" v-t="'user.login.email.label'"></label>
        <input v-model.trim="email" @input="$v.email.$touch()"
          :class="{ 'border-red': $v.email.$error }" required
          id="email" type="email" :placeholder="$t('user.login.email.placeholder')" >
        <p v-show="$v.email.$error" class="text-red text-xs italic mt-3">
          <span v-show="!$v.email.required" v-t="'user.login.email.required-error'"></span>
          <span v-show="!$v.email.email" v-t="'user.login.email.valid-error'"></span>
        </p>
      </div>
      <div class="mb-4">
        <label class="mb-2" for="password" v-t="'user.login.password.label'"></label>
        <input v-model.trim="password" @input="$v.password.$touch()"
          :class="{ 'border-red': $v.password.$error }"
          id="password" type="password" placeholder="********" required >
        <p v-show="$v.password.$error" class="text-red text-xs italic mt-3">
          <span v-show="!$v.password.required" v-t="'user.login.password.required-error'"></span>
          <span v-show="!$v.password.minLength"
            v-t="{ path: 'user.login.password.min-length-error', args: { length: $v.password.$params.minLength.min } }">
          </span>
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

const passMinLength = 8;

@Component({
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(passMinLength)
    }
  }
})
export default class LoginForm extends VueWithValidations {
  email = '';
  password = '';
  passMinLength = passMinLength;

  submit() {
    if (!this.$v.invalid) {
      console.log({ email: this.email, password: this.password });
    }
  }
}
</script>
