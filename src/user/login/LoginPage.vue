<template>
  <div>
    <div class="bg-primary text-white">
      <div class="container py-4 text-center">
        <h1 class="text-xl" v-t="'user.login.title'"></h1>
        <p class="mt-2 text-xs italic" v-t="'user.login.description'"></p>
      </div>
    </div>
    <FirebaseUIForm></FirebaseUIForm>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import FirebaseUIForm from './FirebaseUIForm';

@Component({
  components: { FirebaseUIForm }
})
export default class LoginPage extends Vue {}
</script>
