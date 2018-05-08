<template>
  <div class="footer-wrapper bg-black text-white shadow-t-md">
    <div class="container py-3 text-xs text-center">
      <i18n path="footer.project-details.message" tag="p">
        <a place="project-link" v-t="'footer.project-details.project'"
          class="text-primary" target="_blank" href="https://github.com/Poll-me/poll-me-vue"></a>
        <font-awesome-icon place="love-icon"
          icon="heart"></font-awesome-icon>
        <a place="community-link" v-t="'footer.project-details.community'"
          class="text-primary" target="_blank" href="https://github.com/Poll-me"></a>
        <a place="license-link" v-t="'footer.project-details.license'"
          class="text-primary" target="_blank"
          href="https://github.com/Poll-me/poll-me-vue/blob/master/LICENSE"></a>
      </i18n>
      <i18n path="footer.contribution.message" tag="p" class="mt-2">
        <a place="issues-link" v-t="'footer.contribution.link'"
          class="text-primary" target="_blank"
          href="https://github.com/Poll-me/poll-me-vue/issues"></a>
      </i18n>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class MainFooter extends Vue {}
</script>
