<template>
  <div>
    <ul class="tab-nav">
      <li>
        <router-link :to="{ name: 'login' }">
          Login
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'register' }">
          Register
        </router-link>
      </li>
    </ul>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class LoginPage extends Vue {}
</script>
