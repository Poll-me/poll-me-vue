<template>
  <div class="absolute z-50 pin-x bg-secondary shadow-md">
    <nav class="container pb-2 text-center">
      <ul class="list-reset">
        <li class="py-2">
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li class="py-2">
          <router-link :to="{ name: 'user-polls' }">
            Your polls
          </router-link>
        </li>
        <li class="py-2">
          <router-link :to="{ name: 'new-poll' }">
            New poll
          </router-link>
        </li>
        <li class="py-2">
          <router-link :to="{ name: 'profile' }">
            Profile
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class AsideMenu extends Vue {}
</script>
<style scoped>
a {
  color: white;
}
</style>

