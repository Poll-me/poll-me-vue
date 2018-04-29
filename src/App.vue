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
import mainComponents from './components';

export default {
  name: 'App',
  components: { ...mainComponents }
};
</script>
