<template>
  <div class="site-wrapper">
    <AppHeader />
    <main class="site-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/global/AppHeader.vue'
import AppFooter from '~/components/global/AppFooter.vue'
</script>

<style scoped>
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-main {
  flex: 1;
}
</style>