<template>
  <MainLayout>
    <template slot="header">
      <MainHeader />
    </template>
    <router-view/>
    <template slot="footer">
      <MainFooter />
    </template>
  </MainLayout>
</template>

<script>
import '@/assets/css/main.css';
import { mapActions } from 'vuex';

import coreComponents from './core';

export default {
  name: 'App',
  components: { ...coreComponents },
  methods: mapActions(['changeLanguage']),

  created() {
    let userLang = navigator.language;
    if (typeof userLang === 'string' && userLang.length > 0) {
      userLang = userLang.slice(0, 2);
      this.changeLanguage({ lang: userLang });
    }
  }
};
</script>
