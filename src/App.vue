<template>
  <MainLayout>
    <img class="mb-8" src="/static/img/favicon/android-chrome-192x192.png">
    <router-view/>
  </MainLayout>
</template>

<script>
import '@/assets/css/main.css';
import MainLayout from './components/layouts/MainLayout';

export default {
  name: 'App',
  components: { MainLayout }
};
</script>
