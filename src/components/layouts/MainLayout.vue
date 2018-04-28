<template functional>
  <div class="h-full flex flex-col">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="flex-1">
      <div class="container">
        <slot/>
      </div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
