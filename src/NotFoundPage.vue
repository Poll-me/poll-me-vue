<template>
  <div class="container py-4 text-center">
    <div class="font-title">
      <h1 class="uppercase" v-t="'not-found.title'"></h1>
      <img class="inline-block" alt="vader" src="/static/img/vader_computer.jpg">
      <h2 v-t="'not-found.description'"></h2>
      <div class="mt-4" v-t="'not-found.info'"></div>
    </div>
    <div class="flex mt-2">
      <router-link class="flex-1 btn btn-primary" to="/">
        <font-awesome-icon icon="home"></font-awesome-icon>
        <span v-t="'not-found.home-link'"></span>
      </router-link>
      <router-link class="flex-1 btn btn-primary ml-2" :to="{ name: 'new-poll' }">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span v-t="'not-found.create-link'"></span>
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
