<template>
  <div class="container py-4 text-center">
    <div class="font-title">
      <h1>PAGE NOT FOUND</h1>
      <img src="/static/img/vader_computer.jpg">
      <h2 class="">A wild 404 error appeared!!</h2>
      <div class="mt-4">But keep calm, you still can go to:</div>
    </div>
    <div class="flex mt-2">
      <router-link class="flex-1 btn btn-primary" to="/">
        <font-awesome-icon icon="home"></font-awesome-icon>
        Home page
      </router-link>
      <router-link class="flex-1 btn btn-primary ml-2" :to="{ name: 'new-poll' }">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        New poll
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class NotFoundPage extends Vue {
}
</script>
