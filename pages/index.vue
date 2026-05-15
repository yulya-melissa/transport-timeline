<template>
  <div class="home">
    <section class="hero-section">
      <div class="container">
        <p class="hero-kicker">Интерактивная история транспорта России</p>
        <h1 class="hero-title">Эволюция техники в мини‑спиральной ленте</h1>
        <p class="hero-subtitle">
          От первого самодвижущегося экипажа Ивана Кулибина до современных электрических платформ и космических машин.
          Выбирайте ветку, тип, год или признак массовой эксплуатации, вводите имя — и переходите к развёрнутой странице.
        </p>
      </div>
    </section>

    <section class="timeline-section">
      <div class="container">
        <div class="filters">
          <div class="search-wrapper">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Поиск по названию, изобретателю или роли в истории..."
              @input="onSearchInput"
            />
            <div
              v-if="searchSuggestions.length > 0 && searchQuery.length > 0"
              class="search-suggestions"
            >
              <button
                v-for="suggestion in searchSuggestions"
                :key="suggestion.slug"
                class="suggestion-item"
                @click="goToInvention(suggestion.slug)"
              >
                <span class="suggestion-title">{{ suggestion.title }}</span>
                <span class="suggestion-meta">{{ suggestion.yearLabel }}</span>
              </button>
            </div>
          </div>

          <div class="filter-strip">
            <span class="filter-label">Ветка:</span>
            <button
              v-for="option in branchOptions"
              :key="option.value"
              class="filter-btn"
              :class="{ active: activeBranch === option.value }"
              @click="activeBranch = activeBranch === option.value ? null : option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="filter-strip">
            <span class="filter-label">Тип:</span>
            <button
              v-for="type in types"
              :key="type.value"
              class="filter-btn"
              :class="{ active: activeType === type.value }"
              @click="activeType = activeType === type.value ? null : type.value"
            >
              {{ type.label }}
            </button>
          </div>

          <div class="filter-strip">
            <span class="filter-label">Массовая эксплуатация:</span>
            <button
              v-for="option in massOptions"
              :key="String(option.value)"
              class="filter-btn"
              :class="{ active: activeMassAdoption === option.value }"
              @click="activeMassAdoption = activeMassAdoption === option.value ? null : option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <div class="filter-strip">
            <span class="filter-label">Год:</span>
            <button
              v-for="year in availableYears"
              :key="year"
              class="filter-btn"
              :class="{ active: activeYear === year }"
              @click="activeYear = activeYear === year ? null : year"
            >
              {{ year }}
            </button>
          </div>

          <div class="actions-strip">
            <button class="random-btn" type="button" @click="goToRandom">
              🎲 Случайный объект
            </button>
            <button
              v-if="hasActiveFilters"
              class="clear-filters-btn"
              @click="clearFilters"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div v-if="filteredInventions.length === 0" class="empty-state">
          <p>По заданным фильтрам пока ничего не найдено. Смените настройки поиска или откройте случайный объект.</p>
        </div>

        <section v-if="filteredGroups.mainline.length > 0" class="timeline-block">
          <div class="section-title-wrap">
            <h2>Автопоток</h2>
            <p>Основные этапы развития отечественного автотранспорта.</p>
          </div>
          <div class="spiral-track">
            <TimelineCard
              v-for="(invention, index) in filteredGroups.mainline"
              :key="invention.slug"
              :index="index"
              :invention="invention"
            />
          </div>
        </section>

        <section v-if="filteredGroups.adjacent.length > 0" class="timeline-block">
          <div class="section-title-wrap">
            <h2>Параллельные направления</h2>
            <p>Другие техники, которые влияли на транспортную экосистему, но не относились к автомобильной линии.</p>
          </div>
          <div class="spiral-track">
            <TimelineCard
              v-for="(invention, index) in filteredGroups.adjacent"
              :key="invention.slug"
              :index="index"
              :invention="invention"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import TimelineCard from '~/components/timeline/TimelineCard.vue'

const { all, searchInventions } = useInventions()

const searchQuery = ref('')
const activeBranch = ref(null)
const activeType = ref(null)
const activeMassAdoption = ref(null)
const activeYear = ref(null)
const searchSuggestions = ref([])

const branchOptions = [
  { label: 'Все', value: null },
  { label: 'Автопоток', value: 'mainline' },
  { label: 'Параллельные направления', value: 'adjacent' }
]

const types = [
  { label: 'Наземный', value: 'Наземный' },
  { label: 'Водный', value: 'Водный' },
  { label: 'Железнодорожный', value: 'Железнодорожный' },
  { label: 'Воздушный', value: 'Воздушный' },
  { label: 'Космический', value: 'Космический' },
  { label: 'Экспериментальный', value: 'Экспериментальный' }
]

const massOptions = [
  { label: 'В массовую эксплуатацию', value: true },
  { label: 'Не вводилась массово', value: false }
]

const availableYears = computed(() => {
  return [...new Set(all.map((inv) => inv.year))].sort((a, b) => a - b)
})

const filteredInventions = computed(() => {
  let result = all

  if (searchQuery.value.trim()) {
    result = searchInventions(searchQuery.value)
  }

  if (activeBranch.value) {
    result = result.filter((inv) => inv.branch === activeBranch.value)
  }

  if (activeType.value) {
    result = result.filter((inv) => inv.type === activeType.value)
  }

  if (activeMassAdoption.value !== null) {
    result = result.filter((inv) => inv.mass_adoption === activeMassAdoption.value)
  }

  if (activeYear.value !== null) {
    result = result.filter((inv) => inv.year === activeYear.value)
  }

  return result
})

const filteredGroups = computed(() => ({
  mainline: filteredInventions.value.filter((inv) => inv.branch === 'mainline'),
  adjacent: filteredInventions.value.filter((inv) => inv.branch === 'adjacent')
}))

const hasActiveFilters = computed(() => {
  return (
    activeBranch.value !== null ||
    activeType.value !== null ||
    activeMassAdoption.value !== null ||
    activeYear.value !== null ||
    searchQuery.value.trim().length > 0
  )
})

const onSearchInput = () => {
  if (searchQuery.value.length > 0) {
    searchSuggestions.value = searchInventions(searchQuery.value).slice(0, 6)
  } else {
    searchSuggestions.value = []
  }
}

const goToInvention = (slug) => {
  searchQuery.value = ''
  searchSuggestions.value = []
  navigateTo(`/invention/${slug}`)
}

const goToRandom = () => {
  if (filteredInventions.value.length === 0) return
  const random = filteredInventions.value[Math.floor(Math.random() * filteredInventions.value.length)]
  navigateTo(`/invention/${random.slug}`)
}

const clearFilters = () => {
  activeBranch.value = null
  activeType.value = null
  activeMassAdoption.value = null
  activeYear.value = null
  searchQuery.value = ''
  searchSuggestions.value = []
}

useScrollReveal()
</script>

<style scoped>
.hero-section {
  padding: 54px 0 42px;
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.hero-title {
  color: var(--accent);
  margin-bottom: 12px;
}

.hero-subtitle {
  color: var(--text-secondary);
  max-width: 780px;
  font-size: 1.03rem;
  line-height: 1.65;
}

.timeline-section {
  padding-bottom: 64px;
}

.filters {
  margin-bottom: 28px;
  display: grid;
  gap: 14px;
}

.search-wrapper {
  position: relative;
  max-width: 520px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  background: var(--card-bg);
  color: var(--text);
  transition: border-color var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--gold);
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 var(--radius) var(--radius);
  box-shadow: var(--shadow);
  z-index: 50;
}

.suggestion-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px 12px;
  color: var(--text);
  transition: background var(--transition);
  font-size: 0.9rem;
}

.suggestion-item:hover {
  background: var(--bg);
}

.suggestion-meta {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.filter-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  width: 100%;
  margin-bottom: -2px;
}

.filter-btn {
  border: 1px solid var(--border);
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.84rem;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all var(--transition);
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.actions-strip {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.random-btn {
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.86rem;
  cursor: pointer;
  transition: all var(--transition);
}

.random-btn:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.clear-filters-btn {
  border: none;
  background: none;
  cursor: pointer;
  color: var(--accent);
  text-decoration: underline;
  font-size: 0.85rem;
}

.timeline-block {
  margin-top: 28px;
}

.section-title-wrap {
  margin-bottom: 14px;
}

.section-title-wrap h2 {
  font-size: 1.5rem;
  color: var(--accent);
}

.section-title-wrap p {
  color: var(--text-secondary);
  max-width: 760px;
}

.spiral-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 14px;
}

.spiral-track::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 50%;
  width: 2px;
  bottom: 10px;
  transform: translateX(-50%);
  border-left: 2px dashed var(--border);
}

.empty-state {
  padding: 50px 20px;
  border-radius: var(--radius);
  border: 1px dashed var(--border);
  text-align: center;
  color: var(--text-secondary);
  background: var(--card-bg);
  margin: 12px 0;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 36px 0 28px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .spiral-track::before {
    left: 20px;
  }
}
</style>
