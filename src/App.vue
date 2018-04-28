<template>
  <MainLayout>
    <template slot="header">
      <MainHeader />
    </template>
    <router-view/>
  </MainLayout>
</template>

<script>
import '@/assets/css/main.css';
import MainLayout from './components/layouts/MainLayout';
import MainHeader from './components/MainHeader';

export default {
  name: 'App',
  components: { MainLayout, MainHeader }
};
</script>
