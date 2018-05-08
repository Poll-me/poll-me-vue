<template>
  <div class="bg-secondary shadow">
    <div class="container py-2 flex">
      <div class="w-10">
        <img src="/static/img/favicon/favicon-64x64.png" alt="header-logo" />
      </div>
      <div class="flex-1 flex items-center justify-center text-white text-xl font-medium">
        PollMe
      </div>
      <div class="w-10 flex items-center justify-center text-white text-3xl">
        <font-awesome-icon :icon="['fab', 'pied-piper-alt']" fixed-width>
        </font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class MainHeader extends Vue {}
</script>
