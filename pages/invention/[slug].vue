<template>
  <div v-if="invention" class="invention-page">
    <div class="container">
      <NuxtLink to="/" class="back-link">← Вернуться на ленту времени</NuxtLink>

      <article class="invention-article">
        <header class="invention-header fade-up">
          <div class="invention-meta">
            <span class="invention-era">{{ invention.era }}</span>
            <span class="invention-dot">·</span>
            <span class="invention-status">{{ statusLabel }}</span>
          </div>
          <h1 class="invention-title">{{ invention.title }}</h1>
          <p class="invention-inventor">{{ invention.inventor }}</p>
        </header>

        <div class="invention-image fade-up">
          <img
            :src="invention.image_main"
            :alt="invention.title"
          />
        </div>

        <section class="content-section fade-up">
          <h2>История создания</h2>
          <div class="text-block" v-html="formattedHistory"></div>
        </section>

        <section class="content-section fade-up">
          <h2>Конструкция</h2>
          <InteractiveImage :image="invention.interactive_image" />
        </section>

        <section class="content-section fade-up">
          <h2>Технические характеристики</h2>
          <div class="specs-table-wrapper">
            <table class="specs-table">
              <tbody>
                <tr v-for="spec in invention.specs" :key="spec.key">
                  <td>{{ spec.key }}</td>
                  <td>{{ spec.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="content-section fade-up">
          <h2>Значение для науки</h2>
          <div class="text-block" v-html="formattedSignificance"></div>
        </section>

        <section class="content-section fade-up">
          <h2>Судьба проекта</h2>
          <div class="text-block" v-html="formattedFate"></div>
        </section>

        <section v-if="invention.related_persons.length > 0" class="content-section fade-up">
          <h2>Связанные личности</h2>
          <div class="persons-list">
            <span
              v-for="person in invention.related_persons"
              :key="person"
              class="person-tag"
            >
              {{ person }}
            </span>
          </div>
        </section>

        <nav class="invention-nav fade-up">
          <NuxtLink
            v-if="neighbors.previous"
            :to="`/invention/${neighbors.previous.slug}`"
            class="nav-card nav-prev"
          >
            <span class="nav-arrow">←</span>
            <span class="nav-label">Предыдущее</span>
            <span class="nav-title">{{ neighbors.previous.title }}</span>
            <span class="nav-year">{{ neighbors.previous.year }}</span>
          </NuxtLink>

          <div v-else class="nav-card nav-empty"></div>

          <NuxtLink
            v-if="neighbors.next"
            :to="`/invention/${neighbors.next.slug}`"
            class="nav-card nav-next"
          >
            <span class="nav-arrow">→</span>
            <span class="nav-label">Следующее</span>
            <span class="nav-title">{{ neighbors.next.title }}</span>
            <span class="nav-year">{{ neighbors.next.year }}</span>
          </NuxtLink>
        </nav>

        <footer class="invention-footer fade-up">
          <h3>Источники</h3>
          <ul class="sources-list">
            <li v-for="source in invention.sources" :key="source">
              {{ source }}
            </li>
          </ul>
        </footer>
      </article>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h1>Изобретение не найдено</h1>
      <p>Возможно, страница была удалена или перемещена.</p>
      <NuxtLink to="/" class="back-link">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import InteractiveImage from '~/components/invention/InteractiveImage.vue'

const route = useRoute()
const { getBySlug, getNeighbors } = useInventions()

const invention = computed(() => getBySlug(route.params.slug))
const neighbors = computed(() => getNeighbors(route.params.slug))

const statusLabel = computed(() => {
  const labels = {
    'реализовано': 'Реализовано',
    'опытный образец': 'Опытный образец',
    'проект': 'Проект'
  }
  return labels[invention.value?.status] || invention.value?.status
})

const formattedHistory = computed(() => {
  return invention.value?.history?.replace(/\n/g, '<br>') || ''
})

const formattedSignificance = computed(() => {
  return invention.value?.significance?.replace(/\n/g, '<br>') || ''
})

const formattedFate = computed(() => {
  return invention.value?.fate?.replace(/\n/g, '<br>') || ''
})

useHead({
  title: invention.value ? `${invention.value.title} — Хроника транспорта России` : 'Изобретение не найдено'
})

useScrollReveal()
</script>

<style scoped>
.invention-page {
  padding: 32px 0 80px;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: var(--accent);
}

.back-link:hover {
  color: var(--accent-hover);
}

.invention-header {
  text-align: center;
  margin-bottom: 32px;
}

.invention-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.invention-dot {
  color: var(--gold);
}

.invention-title {
  color: var(--accent);
  margin-bottom: 8px;
}

.invention-inventor {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.invention-image {
  max-width: 800px;
  margin: 0 auto 40px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.invention-image img {
  width: 100%;
  object-fit: cover;
}

.content-section {
  max-width: 800px;
  margin: 0 auto 40px;
}

.content-section h2 {
  color: var(--text);
  margin-bottom: 16px;
  padding-left: 16px;
  border-left: 3px solid var(--accent);
}

.text-block {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
}

.specs-table-wrapper {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.specs-table td:first-child {
  font-weight: 600;
  color: var(--text-secondary);
  width: 200px;
}

.persons-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.person-tag {
  padding: 8px 16px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text);
}

.invention-nav {
  max-width: 800px;
  margin: 40px auto 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: all var(--transition);
}

.nav-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
}

.nav-arrow {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 4px;
}

.nav-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-title {
  font-family: 'Russo One', sans-serif;
  font-size: 1rem;
  color: var(--text);
  margin-top: 4px;
}

.nav-year {
  font-size: 0.85rem;
  color: var(--accent);
  margin-top: 2px;
}

.nav-empty {
  visibility: hidden;
}

.invention-footer {
  max-width: 800px;
  margin: 40px auto 0;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.invention-footer h3 {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.sources-list {
  list-style: none;
}

.sources-list li {
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 2px 0;
}

.not-found {
  padding: 120px 0;
  text-align: center;
}

.not-found h1 {
  color: var(--accent);
  margin-bottom: 12px;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .invention-title {
    font-size: 1.5rem;
  }

  .invention-nav {
    grid-template-columns: 1fr;
  }

  .specs-table td:first-child {
    width: 120px;
  }
}
</style>