<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main class="container mx-auto text-center mt-8">
      <slot/>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'MainLayout'
};
</script>
<style scoped>

</style>

