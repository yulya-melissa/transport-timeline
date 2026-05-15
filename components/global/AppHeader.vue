<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">Хроника истории транспорта России</span>
      </NuxtLink>
      <p class="header-subtitle">История транспорта</p>
    </div>
  </header>
</template>

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
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.logo {
  text-decoration: none;
  color: var(--text);
}

.logo-text {
  font-family: 'Russo One', sans-serif;
  font-size: 1.1rem;
  color: var(--accent);
}

.header-subtitle {
  color: var(--text-secondary);
  font-size: 0.86rem;
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .logo-text {
    font-size: 0.95rem;
  }

  .header-subtitle {
    font-size: 0.8rem;
  }
}
</style>
