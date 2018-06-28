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
          <router-link class="partial-match" v-t="'header.nav-menu.new-link'"
           :to="{ name: 'new-poll' }">
          </router-link>
        </li>
        <template v-if="isLogged">
          <li>
            <router-link :to="{ name: 'profile' }" v-t="'header.nav-menu.profile-link'">
            </router-link>
          </li>
          <li>
            <a v-t="'header.nav-menu.logout-link'" @click.prevent="logOut"></a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link :to="{ name: 'login' }" v-t="'header.nav-menu.login-link'">
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'register' }" v-t="'header.nav-menu.register-link'">
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

@Component({
  computed: mapState({
    isLogged: state => state.user.isLogged
  }),
  methods: mapActions(['signOut'])
})
export default class NavMenu extends Vue {
  logOut() {
    this.$router.push({ name: 'home' });
    this.signOut().then(() => {
      this.$emit('logout');
    });
  }
}
</script>
