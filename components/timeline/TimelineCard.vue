<template>
  <div class="timeline-card-wrapper" :class="position">
    <NuxtLink :to="`/invention/${invention.slug}`" class="timeline-card">
      <div class="card-image">
        <img
          :src="invention.image_main"
          :alt="invention.title"
          loading="lazy"
        />
        <span class="card-type-badge">{{ typeIcon }}</span>
      </div>
      <div class="card-content">
        <span class="card-year">{{ invention.year }}</span>
        <h3 class="card-title">{{ invention.title }}</h3>
        <p class="card-inventor">{{ invention.inventor }}</p>
        <p class="card-fact">{{ invention.fact }}</p>
      </div>
    </NuxtLink>
    <div class="timeline-dot"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  invention: {
    type: Object,
    required: true
  }
})

const index = computed(() => {
  const { all } = useInventions()
  return all.findIndex(i => i.slug === props.invention.slug)
})

const position = computed(() => {
  return index.value % 2 === 0 ? 'left' : 'right'
})

const typeIcon = computed(() => {
  const icons = {
    'наземный': '🚂',
    'водный': '🚢',
    'воздушный': '✈️',
    'космический': '🚀',
    'экспериментальный': '⚙️'
  }
  return icons[props.invention.type] || '🔧'
})
</script>

<style scoped>
.timeline-card-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  z-index: 1;
}

.timeline-card-wrapper.left {
  align-self: flex-start;
  padding-right: 50px;
}

.timeline-card-wrapper.right {
  align-self: flex-end;
  padding-left: 50px;
}

.timeline-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  transition: all var(--transition);
  width: 100%;
}

.timeline-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-type-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 1.1rem;
}

.card-content {
  padding: 16px 20px 20px;
}

.card-year {
  font-family: 'Russo One', sans-serif;
  font-size: 1.5rem;
  color: var(--accent);
}

.card-title {
  font-size: 1.1rem;
  margin: 4px 0;
  color: var(--text);
}

.card-inventor {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.card-fact {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.timeline-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  background: var(--accent);
  border: 3px solid var(--card-bg);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--accent);
  z-index: 2;
}

.timeline-card-wrapper.left .timeline-dot {
  right: -7px;
}

.timeline-card-wrapper.right .timeline-dot {
  left: -7px;
}

@media (max-width: 768px) {
  .timeline-card-wrapper {
    width: 100%;
    padding-left: 40px !important;
    padding-right: 0 !important;
  }

  .timeline-card-wrapper.left,
  .timeline-card-wrapper.right {
    align-self: flex-start;
  }

  .timeline-dot {
    left: 13px !important;
    right: auto !important;
  }

  .timeline-card {
    flex-direction: column;
  }
}
</style>