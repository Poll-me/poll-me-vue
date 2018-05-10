<template>
  <div class="container py-4 text-center">
    <div class="font-title">
      <h1 class="uppercase italic text-2xl" v-t="'polls.not-found.title'"></h1>
      <img class="inline-block my-4" alt="vader" src="/static/img/obi-wan3.gif">
      <h2 v-t="{ path: 'polls.not-found.description', args: { key: pollKey } }"
        class="text-lg" ></h2>
      <div class="mt-4" v-t="'not-found.info'"></div>
    </div>
    <div class="flex mt-2">
      <router-link class="flex-1 btn btn-primary" :to="{ replace: true, path: '/' }">
        <font-awesome-icon icon="home"></font-awesome-icon>
        <span v-t="'not-found.home-link'"></span>
      </router-link>
      <router-link class="flex-1 btn btn-primary ml-2" :to="{ replace: true, name: 'new-poll' }">
        <font-awesome-icon icon="plus"></font-awesome-icon>
        <span v-t="'not-found.create-link'"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    pollKey: {
      required: true,
      type: String
    }
  }
})
export default class PollNotFound extends Vue {}
</script>
