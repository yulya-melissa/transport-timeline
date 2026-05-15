<template>
  <div
    class="timeline-card-wrapper fade-up"
    :class="[position, branchTone]"
    :style="spiralStyle"
  >
    <NuxtLink
      :to="`/invention/${invention.slug}`"
      class="timeline-card"
      :aria-label="`Открыть карточку: ${invention.title}`"
    >
      <div class="card-image">
        <img :src="invention.image_main" :alt="invention.title" loading="lazy" />
        <span class="card-type-badge">{{ typeIcon }}</span>
        <span class="card-mass" :class="massClass">{{ massLabel }}</span>
      </div>

      <div class="card-content">
        <span class="card-year" :title="invention.yearLabel">{{ invention.yearLabel }}</span>
        <h3 class="card-title">{{ invention.title }}</h3>
        <p class="card-inventor">{{ invention.inventor }}</p>
        <p class="card-fact">{{ invention.fact }}</p>

        <div class="card-hover-hints">
          <span
            v-for="point in invention.hover_points.slice(0, 3)"
            :key="point"
            class="hover-hint"
          >
            {{ point }}
          </span>
        </div>
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
  },
  index: {
    type: Number,
    required: true
  }
})

const position = computed(() => {
  return props.index % 2 === 0 ? 'left' : 'right'
})

const branchTone = computed(() => {
  return props.invention.branch === 'mainline' ? 'branch-main' : 'branch-adj'
})

const massLabel = computed(() => {
  return props.invention.mass_adoption ? 'Введён в массовую эксплуатацию' : 'Не введён в массовую эксплуатацию'
})

const massClass = computed(() => props.invention.mass_adoption ? 'mass-yes' : 'mass-no')

const spiralStyle = computed(() => {
  const direction = position.value === 'left' ? -1 : 1
  const depth = Math.min(280, 60 + props.index * 14)
  const wave = ((props.index % 4) - 1.5) * 24
  const radius = depth + wave
  const toRotate = props.index === 0 ? direction * 3.5 : 0
  const fromShift = `${direction * 28}px`
  const toShift = `${direction * radius}px`

  return {
    '--to-x': toShift,
    '--to-y': `${wave * 0.3}px`,
    '--to-rotate': `${toRotate}deg`,
    '--from-x': fromShift,
    '--from-y': `${32 + props.index * 8}px`,
    '--reveal-delay': `${Math.min(props.index * 0.08, 1.5)}s`
  }
})

const icons = {
  'Наземный': '🚗',
  'Воздушный': '✈️',
  'Водный': '🚢',
  'Железнодорожный': '🚂',
  'Космический': '🛰️',
  'Экспериментальный': '🧪'
}

const typeIcon = computed(() => icons[props.invention.type] || '⚙️')
</script>

<style scoped>
.timeline-card-wrapper {
  position: relative;
  width: 52%;
  z-index: 2;
  opacity: 0;
  transform: translate(var(--from-x), var(--from-y)) rotate(1deg);
  transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay),
    opacity 0.85s ease-out var(--reveal-delay);
}

.timeline-card-wrapper.visible {
  opacity: 1;
  transform: translate(var(--to-x), var(--to-y)) rotate(var(--to-rotate));
}

.timeline-card-wrapper.left {
  align-self: flex-start;
  padding-right: 54px;
}

.timeline-card-wrapper.right {
  align-self: flex-end;
  padding-left: 54px;
}

.timeline-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--text);
  transition: transform var(--transition), box-shadow var(--transition);
  width: 100%;
}

.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.card-image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.94);
  padding: 4px 8px;
  border-radius: 18px;
  font-size: 1.02rem;
}

.card-mass {
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 0.73rem;
  color: #fff;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.card-mass.mass-yes {
  background: #0f6b3c;
}

.card-mass.mass-no {
  background: #a24f2f;
}

.card-content {
  padding: 16px 18px 20px;
}

.card-year {
  font-family: 'Russo One', sans-serif;
  font-size: 1.12rem;
  color: var(--accent);
}

.card-title {
  font-size: 1.12rem;
  margin-top: 6px;
  margin-bottom: 6px;
}

.card-inventor {
  font-size: 0.86rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.card-fact {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.card-hover-hints {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.hover-hint {
  padding: 4px 9px;
  background: rgba(180, 68, 60, 0.08);
  border-radius: 14px;
  font-size: 0.75rem;
  color: var(--accent);
  border: 1px solid rgba(180, 68, 60, 0.24);
}

.timeline-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid var(--card-bg);
  box-shadow: 0 0 0 3px var(--accent);
  z-index: 4;
  top: 24px;
  background: var(--accent);
}

.timeline-card-wrapper.left .timeline-dot {
  right: 18px;
}

.timeline-card-wrapper.right .timeline-dot {
  left: 18px;
}

@media (max-width: 768px) {
  .timeline-card-wrapper {
    width: 100% !important;
    transform: translate(var(--from-x), calc(var(--from-y) + 10px)) rotate(0deg) !important;
    padding-left: 34px !important;
    padding-right: 0 !important;
  }

  .timeline-card-wrapper.visible {
    transform: translate(var(--to-x), calc(var(--to-y) + 4px)) rotate(0deg);
  }

  .timeline-card-wrapper.left,
  .timeline-card-wrapper.right {
    align-self: flex-start;
  }

  .timeline-dot {
    left: 13px !important;
    right: auto !important;
    top: 22px;
  }
}
</style>
