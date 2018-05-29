<template functional>
  <div class="h-full flex flex-col">
    <header class="z-40">
      <slot name="header"></slot>
    </header>
    <main class="flex-1">
      <slot/>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
