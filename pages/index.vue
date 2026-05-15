<template>
  <div class="home">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Хроника транспортных изобретений России</h1>
        <p class="hero-subtitle">
          Путешествие по истории отечественной транспортной науки:
          от паровой телеги Кулибина до современных электромобилей
        </p>
      </div>
    </section>

    <section class="timeline-section">
      <div class="container">
        <div class="filters">
          <div class="search-row">
            <div class="search-wrapper">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск по названию или изобретателю..."
                class="search-input"
                @input="onSearchInput"
              />
              <div v-if="searchSuggestions.length > 0 && searchQuery.length > 0" class="search-suggestions">
                <button
                  v-for="suggestion in searchSuggestions"
                  :key="suggestion.slug"
                  class="suggestion-item"
                  @click="goToInvention(suggestion.slug)"
                >
                  <span class="suggestion-title">{{ suggestion.title }}</span>
                  <span class="suggestion-year">{{ suggestion.year }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="filter-row">
            <span class="filter-label">Тип транспорта</span>
            <div class="filter-options">
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
          </div>

          <div class="filter-row">
            <span class="filter-label">Период</span>
            <div class="filter-options">
              <button
                v-for="era in eras"
                :key="era.value"
                class="filter-btn"
                :class="{ active: activeEra === era.value }"
                @click="activeEra = activeEra === era.value ? null : era.value"
              >
                {{ era.label }}
              </button>
            </div>
          </div>

          <div class="filter-row">
            <span class="filter-label">Статус</span>
            <div class="filter-options">
              <button
                v-for="status in statuses"
                :key="status.value"
                class="filter-btn"
                :class="{ active: activeStatus === status.value }"
                @click="activeStatus = activeStatus === status.value ? null : status.value"
              >
                {{ status.label }}
              </button>
            </div>
          </div>

          <button
            v-if="hasActiveFilters"
            class="clear-filters-btn"
            @click="clearFilters"
          >
            Сбросить все фильтры
          </button>
        </div>

        <div class="timeline">
          <div class="timeline-line"></div>
          <TransitionGroup name="timeline-card">
            <TimelineCard
              v-for="invention in filteredInventions"
              :key="invention.slug"
              :invention="invention"
            />
          </TransitionGroup>
        </div>

        <div v-if="filteredInventions.length === 0" class="empty-state">
          <p>Ничего не найдено. Попробуйте изменить параметры поиска или фильтры.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TimelineCard from '~/components/timeline/TimelineCard.vue'

const { all, searchInventions } = useInventions()

const searchQuery = ref('')
const activeType = ref(null)
const activeEra = ref(null)
const activeStatus = ref(null)
const searchSuggestions = ref([])

const types = [
  { label: 'Наземный', value: 'наземный' },
  { label: 'Водный', value: 'водный' },
  { label: 'Воздушный', value: 'воздушный' },
  { label: 'Космический', value: 'космический' },
  { label: 'Экспериментальный', value: 'экспериментальный' }
]

const eras = [
  { label: 'Российская Империя', value: 'Российская Империя' },
  { label: 'СССР', value: 'СССР' },
  { label: 'Современная Россия', value: 'Современная Россия' }
]

const statuses = [
  { label: 'Реализовано', value: 'реализовано' },
  { label: 'Опытный образец', value: 'опытный образец' },
  { label: 'Проект', value: 'проект' }
]

const hasActiveFilters = computed(() => {
  return activeType.value || activeEra.value || activeStatus.value
})

const filteredInventions = computed(() => {
  let result = all

  if (searchQuery.value) {
    result = searchInventions(searchQuery.value)
  }

  if (activeType.value) {
    result = result.filter(i => i.type === activeType.value)
  }

  if (activeEra.value) {
    result = result.filter(i => i.era === activeEra.value)
  }

  if (activeStatus.value) {
    result = result.filter(i => i.status === activeStatus.value)
  }

  return result
})

const onSearchInput = () => {
  if (searchQuery.value.length > 0) {
    searchSuggestions.value = searchInventions(searchQuery.value).slice(0, 5)
  } else {
    searchSuggestions.value = []
  }
}

const goToInvention = (slug) => {
  searchQuery.value = ''
  searchSuggestions.value = []
  navigateTo(`/invention/${slug}`)
}

const clearFilters = () => {
  activeType.value = null
  activeEra.value = null
  activeStatus.value = null
  searchQuery.value = ''
  searchSuggestions.value = []
}

useScrollReveal()
</script>

<style scoped>
.hero-section {
  padding: 60px 0 32px;
  text-align: center;
}

.hero-title {
  color: var(--accent);
  margin-bottom: 12px;
  font-size: 2.2rem;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.timeline-section {
  padding-bottom: 80px;
}

.filters {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.search-row {
  width: 100%;
}

.search-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  background: var(--bg);
  color: var(--text);
  transition: border-color var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--gold);
}

.search-input::placeholder {
  color: #b0a89a;
}

.search-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  z-index: 50;
  overflow: hidden;
}

.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text);
  transition: background var(--transition);
}

.suggestion-item:hover {
  background: var(--bg);
}

.suggestion-year {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  min-width: 130px;
  padding-top: 7px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.filter-btn {
  padding: 7px 16px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text);
  transition: all var(--transition);
  white-space: nowrap;
}

.filter-btn:hover {
  border-color: var(--gold);
  background: var(--gold-light);
}

.filter-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.clear-filters-btn {
  align-self: flex-start;
  padding: 8px 18px;
  border: 1px solid var(--accent);
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--accent);
  transition: all var(--transition);
}

.clear-filters-btn:hover {
  background: var(--accent);
  color: #fff;
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
  transform: translateX(-50%);
  z-index: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.timeline-card-enter-active {
  transition: all 0.5s ease;
}

.timeline-card-leave-active {
  transition: all 0.3s ease;
}

.timeline-card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.timeline-card-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 36px 0 24px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .filters {
    padding: 16px;
    gap: 14px;
  }

  .filter-row {
    flex-direction: column;
    gap: 8px;
  }

  .filter-label {
    min-width: auto;
    padding-top: 0;
  }

  .timeline-line {
    left: 20px;
  }
}
</style>