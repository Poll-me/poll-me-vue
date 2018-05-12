<template>
  <div>
    <div class="bg-primary text-white">
      <div class="container py-4 text-center">
        <h1 class="text-xl" v-t="'user.login.title'"></h1>
        <p class="mt-2 text-xs italic" v-t="'user.login.description'"></p>
      </div>
    </div>
    <FirebaseUIForm tosUrl="/" @success="loginSuccess" @error="loginError"></FirebaseUIForm>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions } from 'vuex';

import FirebaseUIForm from './FirebaseUIForm';

@Component({
  components: { FirebaseUIForm },
  methods: mapActions(['linkUser'])
})
export default class LoginPage extends Vue {
  loginSuccess(auth) {
    if (auth.operationType === 'link') {
      this.linkUser({
        provider: auth.credential.providerId,
        data: auth.additionalUserInfo
      });
    }
    this.$router.replace({ name: 'home' });
  }

  loginError() {
    this.$router.go({ name: 'not-found' });
  }
}
</script>
