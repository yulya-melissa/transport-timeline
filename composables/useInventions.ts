import timeline from '~/content/inventions/timeline.json'

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description: string
}

interface Spec {
  key: string
  value: string
}

interface InteractiveImage {
  src: string
  alt: string
  hotspots: Hotspot[]
}

interface Invention {
  slug: string
  title: string
  year: number
  yearLabel: string
  era: string
  inventor: string
  type: string
  branch: 'mainline' | 'adjacent'
  status: 'key' | 'important' | 'contested' | 'indirect' | 'project'
  statusLabel: string
  image_main: string
  image_hero: string
  hover_points: string[]
  interactive_image: InteractiveImage
  fact: string
  history: string
  significance: string
  fate: string
  specs: Spec[]
  related_persons: string[]
  sources: string[]
}

const getImageUrl = (path: string): string => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  if (path.startsWith('/')) {
    return baseURL.replace(/\/$/, '') + path
  }
  return path
}

export const useInventions = () => {
  const all: Invention[] = [...(timeline as Invention[])]
    .sort((a, b) => a.year - b.year)
    .map(item => ({
      ...item,
      image_main: getImageUrl(item.image_main),
      image_hero: getImageUrl(item.image_hero),
      interactive_image: {
        ...item.interactive_image,
        src: getImageUrl(item.interactive_image.src)
      }
    }))

  const getBySlug = (slug: string): Invention | null => {
    return all.find((i) => i.slug === slug) || null
  }

  const getRandom = (collection?: Invention[]): Invention | null => {
    const pool = collection && collection.length ? collection : all
    if (pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const getNeighbors = (slug: string) => {
    const index = all.findIndex((i) => i.slug === slug)
    return {
      previous: index > 0 ? all[index - 1] : null,
      next: index < all.length - 1 ? all[index + 1] : null
    }
  }

  const searchInventions = (query: string): Invention[] => {
    const q = query.toLowerCase()
    return all.filter((i) =>
      i.title.toLowerCase().includes(q) ||
      i.inventor.toLowerCase().includes(q) ||
      i.fact.toLowerCase().includes(q) ||
      i.hover_points.some((point) => point.toLowerCase().includes(q))
    )
  }

  return {
    all,
    getBySlug,
    getRandom,
    getNeighbors,
    searchInventions
  }
}
