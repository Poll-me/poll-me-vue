<template>
  <div  class="container mx-auto text-center mt-8">
    <img class="mb-8" src="/static/img/favicon/android-chrome-192x192.png">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/main.css';

export default {
  name: 'App'
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
