<template>
  <div class="bg-secondary" :class="{ shadow: !navMenuOpen }">
    <div class="container py-2 flex text-white bg-secondary relative z-20">
      <div class="w-10">
        <router-link to="/" class="text-white">
          <img src="/static/img/favicon/favicon-64x64.png" alt="header-logo" />
        </router-link>
      </div>
      <div class="flex-1 flex items-center justify-center text-2xl font-medium font-title">
        <router-link to="/" class="text-white">PollMe</router-link>
      </div>
      <div class="flex items-center justify-center text-3xl w-10">
        <font-awesome-icon :icon="menuIcon" @click="navMenuOpen = !navMenuOpen"
          class="cursor-pointer">
        </font-awesome-icon>
      </div>
    </div>
    <transition name="slide-down">
      <NavMenu v-if="navMenuOpen" @logout="navMenuOpen = false"></NavMenu>
    </transition>
    <transition name="fade">
      <div v-if="navMenuOpen" class="fixed pin bg-black opacity-50"
        @click="navMenuOpen = false"></div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import NavMenu from './NavMenu';

@Component({
  components: { NavMenu },
  watch: {
    $route() {
      this.navMenuOpen = false;
    }
  }
})
export default class MainHeader extends Vue {
  navMenuOpen = false;

  get menuIcon() {
    return this.navMenuOpen ? 'times' : 'bars';
  }
}
</script>
