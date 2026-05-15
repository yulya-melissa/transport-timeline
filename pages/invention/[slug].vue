<template>
  <div v-if="invention" class="invention-page">
    <div class="container">
      <NuxtLink to="/" class="back-link">← Вернуться к хронологии</NuxtLink>

      <article class="invention-article">
        <header class="invention-header fade-up">
          <div class="invention-meta">
            <span class="invention-era">{{ invention.era }}</span>
            <span class="invention-dot">·</span>
            <span class="invention-status">{{ statusLabel }}</span>
            <span class="invention-dot">·</span>
            <span>{{ invention.yearLabel }}</span>
          </div>
          <h1 class="invention-title">{{ invention.title }}</h1>
          <p class="invention-inventor">{{ invention.inventor }}</p>
        </header>

        <div class="hero-media fade-up">
          <a
            :href="invention.image_hero"
            target="_blank"
            rel="noopener"
            class="hero-link"
            :aria-label="`Открыть изображение в полном размере: ${invention.title}`"
          >
            <img :src="invention.image_hero" :alt="invention.title" />
          </a>
        </div>

        <section class="content-section fade-up">
          <h2>История создания</h2>
          <div class="text-block" v-html="formattedHistory"></div>
        </section>

        <section class="content-section fade-up">
          <h2>Переход на интерактивную конструкцию</h2>
          <ul class="hover-list">
            <li v-for="point in invention.hover_points" :key="point">{{ point }}</li>
          </ul>
          <InteractiveImage :image="invention.interactive_image" />
        </section>

        <section class="content-section fade-up">
          <h2>Значение для транспортной истории</h2>
          <div class="text-block" v-html="formattedSignificance"></div>
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

        <section class="content-section fade-up">
          <h2>Коротко о влиянии</h2>
          <div class="text-block" v-html="formattedFate"></div>
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
            <span class="nav-year">{{ neighbors.previous.yearLabel }}</span>
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
            <span class="nav-year">{{ neighbors.next.yearLabel }}</span>
          </NuxtLink>
        </nav>

        <footer class="invention-footer fade-up">
          <h3>Источники по объекту</h3>
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
      <h1>Объект не найден</h1>
      <p>Возможно, страница была удалена или запрошен неправильный адрес.</p>
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
  const map = {
    key: 'Ключевой вклад',
    important: 'Важный вклад',
    indirect: 'Косвенно связан с автомобильной историей',
    contested: 'Исторически спорный объект',
    project: 'Проектный/экспериментальный проект'
  }
  return invention.value ? map[invention.value.status] : ''
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
  title: invention.value
    ? `${invention.value.title} — Хронология транспорта России`
    : 'Объект не найден'
})

useScrollReveal()
</script>

<style scoped>
.invention-page {
  padding: 28px 0 90px;
}

.back-link {
  display: inline-block;
  margin-bottom: 22px;
  font-size: 0.9rem;
  color: var(--accent);
}

.back-link:hover {
  color: var(--accent-hover);
}

.invention-header {
  text-align: center;
  margin-bottom: 30px;
}

.invention-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.89rem;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.invention-dot {
  color: var(--gold);
}

.invention-title {
  color: var(--accent);
  margin-bottom: 6px;
}

.invention-inventor {
  font-size: 1.04rem;
  color: var(--text-secondary);
}

.hero-media {
  max-width: 900px;
  margin: 0 auto 40px;
}

.hero-link {
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.hero-link img {
  width: 100%;
  object-fit: cover;
}

.content-section {
  max-width: 900px;
  margin: 0 auto 42px;
}

.content-section h2 {
  color: var(--text);
  margin-bottom: 12px;
  padding-left: 12px;
  border-left: 3px solid var(--accent);
}

.text-block {
  color: var(--text);
  line-height: 1.8;
}

.hover-list {
  list-style: none;
  margin-bottom: 16px;
}

.hover-list li {
  margin: 6px 0;
  color: var(--text);
  position: relative;
  padding-left: 16px;
}

.hover-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent);
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
  width: 250px;
}

.persons-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.person-tag {
  padding: 8px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.9rem;
}

.invention-nav {
  max-width: 900px;
  margin: 24px auto 42px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  padding: 18px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: all var(--transition);
}

.nav-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.nav-prev {
  text-align: left;
}

.nav-next {
  text-align: right;
}

.nav-arrow {
  font-size: 1.3rem;
  color: var(--accent);
}

.nav-label {
  font-size: 0.76rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
}

.nav-title {
  font-family: 'Russo One', sans-serif;
  color: var(--text);
  margin-bottom: 4px;
}

.nav-year {
  color: var(--accent);
  font-size: 0.86rem;
}

.nav-empty {
  visibility: hidden;
}

.invention-footer {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.invention-footer h3 {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.sources-list {
  list-style: none;
}

.sources-list li {
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 3px 0;
}

.not-found {
  padding: 100px 0 120px;
  text-align: center;
}

.not-found h1 {
  color: var(--accent);
  margin-bottom: 10px;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .hero-media {
    margin-bottom: 26px;
  }

  .invention-nav {
    grid-template-columns: 1fr;
  }

  .specs-table td:first-child {
    width: 160px;
  }
}
</style>
