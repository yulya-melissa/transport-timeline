import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export const useScrollReveal = () => {
  const observeElements = () => {
    if (import.meta.server) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    document.querySelectorAll('.fade-up').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    observeElements()

    const route = useRoute()
    watch(
      () => route.fullPath,
      () => {
        nextTick(() => observeElements())
      }
    )
  })
}