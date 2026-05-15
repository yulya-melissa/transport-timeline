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
  mass_adoption: boolean
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

export const useInventions = () => {
  const config = useRuntimeConfig()
  const baseFromConfig = config.public?.basePath || config.app?.baseURL || import.meta.env.BASE_URL || '/'
  const baseRaw = typeof baseFromConfig === 'string' ? baseFromConfig : '/'
  const normalizedBase =
    baseRaw.replace(/\/$/, '') === '/' ? '' : baseRaw.replace(/\/$/, '')

  const resolveAssetPath = (value: string) => {
    if (!value) return value
    if (/^(https?:\/\/|\/\/)/.test(value)) return value
    if (!normalizedBase) return value
    if (value.startsWith(normalizedBase)) return value

    return `${normalizedBase}${value.startsWith('/') ? value : `/${value}`}`
  }

  const all: Invention[] = [...(timeline as Invention[])]
    .map((item) => ({
      ...item,
      image_main: resolveAssetPath(item.image_main),
      image_hero: resolveAssetPath(item.image_hero),
      interactive_image: {
        ...item.interactive_image,
        src: resolveAssetPath(item.interactive_image.src)
      }
    }))
    .sort((a, b) => a.year - b.year)

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
