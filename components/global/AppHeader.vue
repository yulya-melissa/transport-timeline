<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">Хроника транспорта России</span>
      </NuxtLink>
      <button
        class="random-btn"
        @click="goToRandom"
        title="Случайное изобретение"
      >
        <span class="random-text">Случайное</span>
      </button>
    </div>
  </header>
</template>

<script setup>
const { getRandom } = useInventions()

const goToRandom = () => {
  const invention = getRandom()
  if (invention) {
    navigateTo(`/invention/${invention.slug}`)
  }
}
</script>

<style scoped>
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-family: 'Russo One', sans-serif;
  font-size: 1.1rem;
  color: var(--accent);
}

.random-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: var(--radius);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text);
  transition: all var(--transition);
}

.random-btn:hover {
  background: var(--gold-light);
  border-color: var(--gold);
}

.random-icon {
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .random-text {
    display: none;
  }
  
  .logo-text {
    font-size: 0.85rem;
  }
}
</style>