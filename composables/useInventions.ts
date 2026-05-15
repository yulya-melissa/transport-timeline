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
  era: string
  inventor: string
  type: string
  status: string
  image_main: string
  image_hero: string
  interactive_image: InteractiveImage
  fact: string
  history: string
  significance: string
  fate: string
  specs: Spec[]
  related_persons: string[]
  previous: string | null
  next: string | null
  sources: string[]
}

export const useInventions = () => {
  const modules = import.meta.glob('~/content/inventions/*.json', {
    import: 'default',
    eager: true
  })

  const all: Invention[] = Object.values(modules)
    .map((m: any) => ({ ...m }))
    .sort((a, b) => a.year - b.year)

  const getBySlug = (slug: string): Invention | null => {
    return all.find((i) => i.slug === slug) || null
  }

  const getRandom = (): Invention | null => {
    if (all.length === 0) return null
    return all[Math.floor(Math.random() * all.length)]
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
    return all.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.inventor.toLowerCase().includes(q) ||
        i.fact.toLowerCase().includes(q)
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