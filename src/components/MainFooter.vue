<template>
  <div class="bg-black text-white">
    <div class="container py-3 text-xs text-center">
      <p>
        This is an
        <a class="text-primary" target="_blank" href="https://github.com/Poll-me/poll-me-vue">
          open source project
        </a>
        made with <font-awesome-icon icon="heart"></font-awesome-icon> by
        <a class="text-primary" target="_blank" href="https://github.com/Poll-me">
          PollMe community
        </a>
        under the
        <a class="text-primary" target="_blank"
          href="https://github.com/Poll-me/poll-me-vue/blob/master/LICENSE">
          MIT license
        </a>
      </p>
      <p class="mt-2">
        You can contribute by coding or propose new features
        <a class="text-primary" target="_blank"
          href="https://github.com/Poll-me/poll-me-vue/issues">
          here
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class MainFooter extends Vue {}
</script>
