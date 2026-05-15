<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h2 class="footer-title">Использованные источники</h2>
          <p class="footer-intro">
            Исторические данные в проекте основаны на проверенных научных источниках, музейных коллекциях и архивных материалах. Каждый объект хронологии имеет свой набор источников.
          </p>
          <ul class="sources-list">
            <li v-for="source in sourceList" :key="source">{{ source }}</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="section-title">О проекте</h3>
          <p class="footer-text">
            Интерактивная хронология российского транспорта — это образовательный проект, объединяющий основную линию автомобилестроения (1791–2018) с параллельными ветвями развития водного, железнодорожного, авиационного и космического транспорта.
          </p>
          <p class="footer-text">
            <strong>{{ totalText }}</strong>
          </p>
        </div>

        <div class="footer-section">
          <h3 class="section-title">Структура проекта</h3>
          <ul class="info-list">
            <li>📍 Основная линия: автомобилестроение России</li>
            <li>📍 Соседние ветви: транспорт других видов</li>
            <li>📍 Фильтры: тип, год, статус, название</li>
            <li>📍 Интерактив: детали конструкции в каждом объекте</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          Проект создан в образовательных целях • История техники России • 2024–2025
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { all } = useInventions()

const sourceList = computed(() => {
  const uniq = new Set()
  all.forEach((item) => {
    item.sources.forEach((source) => uniq.add(source))
  })
  return [...uniq].slice(0, 12)
})

const totalText = computed(() => {
  const mainline = all.filter(i => i.branch === 'mainline').length
  const adjacent = all.filter(i => i.branch === 'adjacent').length
  return `В проекте ${mainline} объектов основной автомобильной линии и ${adjacent} объектов из соседних ветвей, всего ${all.length} вех транспортной истории.`
})
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #fafaf9 0%, #f5f3f0 100%);
  border-top: 1px solid var(--border);
  padding: 48px 0 24px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}

.footer-section {
  padding-right: 12px;
}

.footer-title {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: var(--text);
  font-family: 'Russo One', sans-serif;
}

.section-title {
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: var(--text);
  font-weight: 600;
}

.footer-intro {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 14px;
  line-height: 1.6;
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 8px;
  line-height: 1.6;
}

.sources-list,
.info-list {
  list-style: none;
  margin: 0;
}

.sources-list li,
.info-list li {
  color: var(--text-secondary);
  font-size: 0.78rem;
  margin: 6px 0;
  padding-left: 0;
}

.info-list li {
  margin: 8px 0;
}

.footer-bottom {
  padding-top: 16px;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-copyright {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 32px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-section {
    padding-right: 0;
  }

  .footer-title {
    font-size: 1rem;
  }

  .section-title {
    font-size: 0.9rem;
  }
}
</style>
