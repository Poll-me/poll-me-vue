<template>
  <div class="absolute z-10 pin-x bg-secondary shadow-md">
    <nav class="container pb-2 text-center nav-list">
      <ul>
        <li>
          <router-link :to="{ name: 'home' }" v-t="'header.nav-menu.home-link'"></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user-polls' }" v-t="'header.nav-menu.polls-link'">
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'new-poll' }" v-t="'header.nav-menu.new-link'">
          </router-link>
        </li>
        <li v-if="isLogged">
          <router-link :to="{ name: 'profile' }" v-t="'header.nav-menu.profile-link'">
          </router-link>
        </li>
        <li v-if="!isLogged">
          <router-link :to="{ name: 'login' }" v-t="'header.nav-menu.login-link'">
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import { mapState } from 'vuex';

@Component({
  computed: mapState({
    isLogged: 'user.isLogged'
  })
})
export default class NavMenu extends Vue {}
</script>
