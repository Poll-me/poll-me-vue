<template>
  <div class="bg-secondary" :class="{ shadow: !navMenuOpen }">
    <div class="container py-2 flex text-white bg-secondary relative z-20">
      <div class="w-10">
        <img src="/static/img/favicon/favicon-64x64.png" alt="header-logo" />
      </div>
      <div class="flex-1 flex items-center justify-center text-2xl font-medium font-title">
        PollMe
      </div>
      <div class="flex items-center justify-center text-3xl">
        <font-awesome-icon :icon="menuIcon" fixed-width
          @click="navMenuOpen = !navMenuOpen"
          class="cursor-pointer">
        </font-awesome-icon>
      </div>
    </div>
    <transition name="slide-down">
      <NavMenu v-if="navMenuOpen"></NavMenu>
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
