<template>
  <div class="interactive-image">
    <div class="image-wrapper" ref="imageWrapper">
      <a
        :href="image.src"
        target="_blank"
        rel="noopener"
        class="main-image-link"
        :aria-label="`Открыть изображение: ${image.alt}`"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="main-image"
          loading="lazy"
          @load="onImageLoad"
        />
      </a>

      <button
        v-for="spot in image.hotspots"
        :key="spot.id"
        class="hotspot-marker"
        :class="{ active: activeSpot === spot.id }"
        :style="getMarkerPosition(spot)"
        @mouseenter="activeSpot = spot.id"
        @mouseleave="activeSpot = null"
        @click="toggleSpot(spot.id)"
        :aria-label="spot.title"
        type="button"
      >
        <span class="marker-dot"></span>
        <span class="marker-pulse"></span>
      </button>

      <Transition name="tooltip">
        <div
          v-if="activeSpot && currentSpot"
          class="hotspot-tooltip"
          :class="{ below: currentSpot && currentSpot.y < 18 }"
          :style="getTooltipPosition(currentSpot)"
          @mouseenter="activeSpot = currentSpot.id"
          @mouseleave="activeSpot = null"
        >
          <h4>{{ currentSpot.title }}</h4>
          <p>{{ currentSpot.description }}</p>
        </div>
      </Transition>
    </div>
    <p class="image-hint">Кликните маркер или изображение, чтобы посмотреть деталь или открыть фото.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const activeSpot = ref(null)
const imageWrapper = ref(null)

const currentSpot = computed(() => {
  return props.image.hotspots.find(s => s.id === activeSpot.value)
})

const getMarkerPosition = (spot) => {
  return {
    left: spot.x + '%',
    top: spot.y + '%'
  }
}

const getTooltipPosition = (spot) => {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
  const x = clamp(spot.x, 10, 90)
  const y = clamp(spot.y, 12, 96)
  return {
    left: x + '%',
    top: spot.y < 18 ? (y + 10) + '%' : (y - 14) + '%'
  }
}

const toggleSpot = (id) => {
  activeSpot.value = activeSpot.value === id ? null : id
}

const onImageLoad = () => {
  // Изображение загружено
}
</script>

<style scoped>
.interactive-image {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: visible;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  overflow: visible;
  cursor: default;
}

.main-image-link {
  display: block;
  position: relative;
  z-index: 1;
}

.main-image {
  display: block;
  width: 100%;
  height: auto;
}

.hotspot-marker {
  position: absolute;
  width: 28px;
  height: 28px;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 15;
  padding: 0;
}

.hotspot-marker.active {
  z-index: 20;
}

.marker-dot {
  display: block;
  width: 12px;
  height: 12px;
  margin: 8px auto;
  background: var(--accent);
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--accent);
  transition: transform var(--transition);
}

.hotspot-marker:hover .marker-dot,
.hotspot-marker.active .marker-dot {
  transform: scale(1.3);
}

.marker-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 28px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
  opacity: 0;
}

.hotspot-marker:hover .marker-pulse,
.hotspot-marker.active .marker-pulse {
  opacity: 1;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

.hotspot-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid var(--gold);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  box-sizing: border-box;
  min-width: 220px;
  max-width: min(320px, calc(100% - 24px));
  overflow-wrap: break-word;
  word-break: break-word;
  box-shadow: var(--shadow-lg);
  z-index: 30;
  pointer-events: auto;
  margin-top: -12px;
}

.hotspot-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: var(--gold);
}

.hotspot-tooltip.below {
  transform: translate(-50%, 0);
}

.hotspot-tooltip.below::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: var(--gold);
}

.hotspot-tooltip h4 {
  font-size: 0.95rem;
  color: var(--accent);
  margin-bottom: 4px;
}

.hotspot-tooltip p {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text);
}

.tooltip-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from {
  opacity: 0;
  transform: translate(-50%, -90%);
}

.tooltip-leave-to {
  opacity: 0;
}

.image-hint {
  text-align: center;
  padding: 12px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: var(--bg);
}

@media (max-width: 768px) {
  .hotspot-marker {
    width: 36px;
    height: 36px;
  }

  .marker-dot {
    width: 16px;
    height: 16px;
    margin: 10px auto;
  }

  .hotspot-tooltip {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
    transform: none;
    max-width: none;
    margin-top: 0;
  }

  .hotspot-tooltip::after {
    display: none;
  }
}
</style>
