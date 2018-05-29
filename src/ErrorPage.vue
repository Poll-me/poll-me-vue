<template>
  <div class="container py-4 text-center">
    <div class="font-title">
      <h1 class="uppercase" v-t="'error.title'"></h1>
      <img class="inline-block my-4" alt="Error image" src="/static/img/death-star-explosion.gif">
      <h2 v-t="'error.description'"></h2>
      <div class="mt-4" v-t="'error.info'"></div>
    </div>
    <div class="list-reset flex mt-2">
      <a class="flex-1 btn btn-primary" href="/">
        <font-awesome-icon icon="sync-alt" class="mr-1"></font-awesome-icon>
        <span v-t="'error.reload-link'"></span>
      </a>
      <a class="flex-1 btn btn-primary ml-2" @click.prevent="$router.back()" >
        <font-awesome-icon icon="redo-alt" class="mr-1"></font-awesome-icon>
        <span v-t="'error.try-link'"></span>
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class ErrorPage extends Vue {
}
</script>
