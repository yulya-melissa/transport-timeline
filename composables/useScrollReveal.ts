import { onBeforeUnmount, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export const useScrollReveal = () => {
  let observer: IntersectionObserver | null = null

  const createObserver = () => {
    if (observer) return observer

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    return observer
  }

  const observeElements = () => {
    if (import.meta.server) return

    const current = createObserver()

    document.querySelectorAll('.fade-up').forEach((el) => {
      if (!el.classList.contains('visible')) {
        current.observe(el)
      }
    })
  }

  const refresh = async () => {
    if (import.meta.server) return
    await nextTick()
    observeElements()
  }

  onMounted(() => {
    refresh()

    const route = useRoute()
    watch(
      () => route.fullPath,
      () => nextTick(() => observeElements()),
      { deep: true }
    )
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    refresh
  }
}
