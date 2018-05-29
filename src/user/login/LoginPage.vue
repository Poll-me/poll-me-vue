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
      <router-view class="flex-1" @signIn="onLogin"></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    redirectRoute: {
      type: Object,
      default: () => ({ name: 'home' })
    }
  }
})
export default class LoginPage extends Vue {
  onLogin() {
    this.$router.replace(this.redirectRoute);
  }
}
</script>
