import ApiService from '../services/ApiService'

const routeNamesList = {
  index: 'index',
  cookiePolicy: 'cookie-policy',
  newsList: 'news-year',
  newsPost: 'news-year-posts-slug',
  galleryPost: 'news-year-galleries-slug',
  search: 'news-search',
  season: 'season-year',
  race: 'season-year-races-slug',
  team: 'team',
  pilot: 'team-pilots-slug',
  cars: 'cars',
  wallpapers: 'wallpapers',
  careers: 'careers',
  contacts: 'contacts'
}

const i18nPages = {
  'cookie-policy': {
    en: '/cookie-policy',
    es: '/politica-de-cookies'
  },
  'contacts/index': {
    en: '/contacts',
    es: '/contactos'
  },
  'careers/index': {
    en: '/careers',
    es: '/carrera'
  },
  'cars/index': {
    en: '/cars',
    es: '/coches'
  },
  'news/_year/index': {
    en: '/news/:year',
    es: '/noticias/:year'
  },
  'news/_year/posts/_slug': {
    en: '/news/:year/posts/:slug',
    es: '/noticias/:year/postes/:slug'
  },
  'news/_year/galleries/_slug': {
    en: '/news/:year/galleries/:slug',
    es: '/noticias/:year/galerias/:slug'
  },
  'search/index': {
    en: '/search',
    es: '/busqueda'
  },
  'season/_year/index': {
    en: '/season/:year',
    es: '/temporada/:year'
  },
  'season/_year/races/_slug': {
    en: '/season/:year/races/:slug',
    es: '/temporada/:year/carreras/:slug'
  },
  'team/index': {
    en: '/team',
    es: '/equipo'
  },
  'team/pilots/_slug': {
    en: '/team/pilots/:slug',
    es: '/equipo/pilotos/:slug'
  },
  'wallpapers/index': {
    en: '/wallpapers',
    es: '/fondo-de-pantalla'
  }
}

async function getDynamicRoutes() {
  // Get all dynamic resources from the API
  const newsYearsRoutes = []
  const seasonYearsRoutes = []
  const newsPostsRoutes = []
  const newsGalleriesRoutes = []
  const racesRoutes = []
  const pilotsRoutes = []

  const dynamicSources = await ApiService.getDynamicSources()

  if (dynamicSources.data) {
    const {
      allSeason,
      allPost,
      allGallery,
      allRace,
      allPilot
    } = dynamicSources.data

    if (allSeason && allSeason.length) {
      allSeason.forEach((season) => {
        // TODO: make helper to construct routes from i18nPages ???
        newsYearsRoutes.push(`/news/${season.year}`)
        newsYearsRoutes.push(`/es/noticias/${season.year}`)
        seasonYearsRoutes.push(`/season/${season.year}`)
        seasonYearsRoutes.push(`/es/temporada/${season.year}`)
      })
    }

    if (allPost && allPost.length) {
      allPost.forEach((post) => {
        const postYear = new Date(post.publishedAt).getFullYear()
        newsPostsRoutes.push(`/news/${postYear}/posts/${post.slug.current}`)
        newsPostsRoutes.push(
          `/es/noticias/${postYear}/postes/${post.slug.current}`
        )
      })
    }

    if (allGallery && allGallery.length) {
      allGallery.forEach((gallery) => {
        const postYear = new Date(gallery.publishedAt).getFullYear()
        newsPostsRoutes.push(
          `/news/${postYear}/galleries/${gallery.slug.current}`
        )
        newsPostsRoutes.push(
          `/es/noticias/${postYear}/galerias/${gallery.slug.current}`
        )
      })
    }

    if (allRace && allRace.length) {
      allRace.forEach((race) => {
        const raceYear = new Date(race.datetime).getFullYear()
        racesRoutes.push(`/season/${raceYear}/races/${race.slug.current}`)
        racesRoutes.push(
          `/es/temporada/${raceYear}/carreras/${race.slug.current}`
        )
      })
    }

    if (allPilot && allPilot.length) {
      allPilot.forEach((pilot) => {
        pilotsRoutes.push(`/team/pilots/${pilot.slug.current}`)
        pilotsRoutes.push(`/es/equipo/pilotos/${pilot.slug.current}`)
      })
    }
  }

  // TODO: add en -> es

  return [
    ...newsYearsRoutes,
    ...seasonYearsRoutes,
    ...newsPostsRoutes,
    ...newsGalleriesRoutes,
    ...racesRoutes,
    ...pilotsRoutes
  ]
}

// const indexEn = '/'
// const indexEs = '/es'
const excludeRoutes = [
  /* indexEn, indexEs */
]

export { i18nPages, getDynamicRoutes, routeNamesList, excludeRoutes }
