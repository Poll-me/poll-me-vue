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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
