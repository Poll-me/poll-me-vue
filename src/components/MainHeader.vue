<template>
  <div class="bg-teal">
    <div class="container py-2 flex">
      <div class="w-10">
        <img src="/static/img/favicon/favicon-64x64.png" alt="header-logo" />
      </div>
      <div class="flex-1 flex items-center justify-center text-white text-2xl">
        PollMe
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
