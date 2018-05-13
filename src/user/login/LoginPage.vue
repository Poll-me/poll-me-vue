<template>
  <div class="h-full flex flex-col">
    <ul class="tab-nav">
      <li>
        <router-link :to="{ name: 'login' }" v-t="'user.login-link'"></router-link>
      </li>
      <li>
        <router-link :to="{ name: 'register' }" v-t="'user.register-link'"></router-link>
      </li>
    </ul>
    <div class="flex-1 flex flex-col">
      <router-view class="flex-1" @signIn="login"></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions } from 'vuex';

@Component({
  props: {
    redirectRoute: {
      type: Object,
      default: () => ({ name: 'home' })
    }
  },
  methods: mapActions(['signIn'])
})
export default class LoginPage extends Vue {
  login({ email, password }) {
    this.signIn({ email, password }).then(() => {
      this.$router.replace(this.redirectRoute);
    });
  }
}
</script>
