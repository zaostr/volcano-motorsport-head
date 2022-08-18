import cloneDeep from 'lodash/cloneDeep'
/// import cssVariables from '~/assets/styles/_variables.scss'
import ApiService from '~/services/ApiService'
import {
  preparePicture,
  reformatBlocks,
  prepareNameBlockContentPairs,
  prepareNameValuePairs
} from '~/utils/store'
import isCurrenRace from '~/utils/isCurrentRace'

export const strict = false

export const state = () => ({
  // error: {},
  cssVariables: {
    'sm-breakpoint': '480px',
    'md-breakpoint': '768px',
    'lg-breakpoint': '1024px',
    'xl-breakpoint': '1280px',
    'xxl-breakpoint': '1480px'
  },
  isMenuShown: false,
  deviceWidth: 'xs',
  locale: 'en',
  notification: '',
  companyData: {},
  baseInfo: {},
  featuredRace: {},
  settings: {},
  cookiePolicy: [],
  newsList: [],
  newsPost: {},
  galleryPost: {},
  season: {},
  race: {},
  pilotsList: [],
  pilot: {},
  carBannersList: [],
  wallpapersList: [],
  wallpaperResolutionsList: [],
  searchQuery: '',
  searchResultList: [],
  allNewsList: []
})

export const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },

  SET_MENU_SHOWN(state, isMenuShown) {
    state.isMenuShown = isMenuShown
  },

  SET_DEVICE_WIDTH(state, deviceWidth) {
    state.deviceWidth = deviceWidth
  },

  SET_LOCALE(state, locale) {
    state.locale = locale
  },

  SET_NOTIFICATION(state, notification) {
    state.notification = notification
  },

  SET_COMPANY_DATA(state, companyData) {
    state.companyData = companyData
  },

  SET_BASE_INFO(state, baseInfo) {
    state.baseInfo = baseInfo
  },

  SET_FEATURED_RACE(state, featuredRace) {
    state.featuredRace = featuredRace
  },

  SET_SETTINGS(state, settings) {
    state.settings = settings
  },

  SET_COOKIE_POLICY(state, cookiePolicy) {
    state.cookiePolicy = cookiePolicy
  },

  SET_NEWS_LIST(state, newsList) {
    state.newsList = newsList
  },

  SET_NEWS_POST(state, newsPost) {
    state.newsPost = newsPost
  },

  SET_GALLERY_POST(state, galleryPost) {
    state.galleryPost = galleryPost
  },

  SET_PILOTS_LIST(state, pilotsList) {
    state.pilotsList = pilotsList
  },

  SET_PILOT(state, pilot) {
    state.pilot = pilot
  },

  SET_SEASON(state, season) {
    state.season = season
  },

  SET_RACE(state, race) {
    state.race = race
  },

  SET_CAR_BANNERS_LIST(state, carBannersList) {
    state.carBannersList = carBannersList
  },

  SET_WALLPAPERS_LIST(state, wallpapersList) {
    state.wallpapersList = wallpapersList
  },

  SET_WALLPAPER_RESOLUTIONS_LIST(state, wallpaperResolutionsList) {
    state.wallpaperResolutionsList = wallpaperResolutionsList
  },

  SET_SEARCH_QUERY(state, searchQuery) {
    state.searchQuery = searchQuery
  },

  SET_SEARCH_RESULT_LIST(state, searchResultList) {
    state.searchResultList = searchResultList
  },

  SET_ALL_NEWS_LIST(state, allNewsList) {
    state.allNewsList = allNewsList
  }
}

export const actions = {
  setError({ commit }, error) {
    commit('SET_ERROR', error)
  },

  setMenuShown({ commit }, isMenuShown) {
    commit('SET_MENU_SHOWN', isMenuShown)
  },

  setDeviceWidth({ commit }, deviceWidth) {
    commit('SET_DEVICE_WIDTH', deviceWidth)
  },

  setLocale({ commit }, locale) {
    commit('SET_LOCALE', locale)
  },

  setNotification({ commit }, notification) {
    commit('SET_NOTIFICATION', notification)
  },

  fetchCommonData({ state, commit }) {
    if (
      Object.keys(state.settings).length &&
      Object.keys(state.companyData).length
    ) {
      // fetch only once
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale

      return ApiService.getCommonData(locale).then(({ data }) => {
        // Clone to reformat data
        const settings = cloneDeep(data.SiteSettings)
        if (settings) {
          settings.meta_title = settings.meta_title
            ? settings.meta_title[locale]
            : ''
          settings.meta_description = settings.meta_description
            ? settings.meta_description[locale]
            : ''
          settings.meta_image = settings.meta_image
            ? preparePicture(settings.meta_image)
            : null
          settings.maintenance_message = settings.maintenance_message
            ? settings.maintenance_message[locale]
            : ''
        }

        // prevent asking for url of null image
        const defaultSettings = { meta_image: {} }
        commit('SET_SETTINGS', settings || defaultSettings)

        const teamInfo = cloneDeep(data.TeamInfo)
        if (teamInfo) {
          teamInfo.slogan = teamInfo.slogan ? teamInfo.slogan[locale] : ''
        }

        commit('SET_COMPANY_DATA', teamInfo || {})
      })
    }
  },

  fetchCookiePolicyData({ state, commit }) {
    if (Object.keys(state.cookiePolicy).length) {
      // fetch only once
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getCookiePolicyPageData(locale).then(({ data }) => {
        const cookiePolicyBlockList = reformatBlocks(
          data?.SiteSettings?.[`cookie_policy_${locale}Raw`]
          // TODO: imagesIds
        )

        commit('SET_COOKIE_POLICY', {
          blockList: cookiePolicyBlockList,
          updatedAt: data?.SiteSettings?.cookie_policy_updatedAt
        })
      })
    }
  },

  fetchIndexPageData({ state, commit }) {
    const locale = state.locale || this.i18n.defaultLocale

    return ApiService.getIndexPageData(locale).then(({ data }) => {
      if (data && data.SiteSettings) {
        const SiteSettings = cloneDeep(data.SiteSettings)
        // prepare locale strings, images
        SiteSettings.index_image = SiteSettings.index_image
          ? preparePicture(SiteSettings.index_image)
          : null
        SiteSettings.index_banner = SiteSettings.index_banner
          ? {
              image: preparePicture(SiteSettings.index_banner.image),
              name: SiteSettings.index_banner.name[locale],
              text: SiteSettings.index_banner.text[locale]
            }
          : null

        Object.assign(SiteSettings, state.settings, SiteSettings)
        commit('SET_SETTINGS', SiteSettings)
      }

      const pastOrCurrentRace = cloneDeep(data?.pastOrCurrentRaces[0])
      const isTheRaceIsCurrent = isCurrenRace(pastOrCurrentRace)
      const hasFutureRace = Boolean(data?.futureRaces[0])

      if (!isTheRaceIsCurrent && hasFutureRace) {
        const futureRace = cloneDeep(data?.futureRaces[0])
        // There is no current race and there is future race
        futureRace.mode = 'future'
        futureRace.slug = futureRace.slug ? futureRace.slug.current : null

        commit('SET_FEATURED_RACE', futureRace)
      } else {
        // There is current race or there is no future race
        pastOrCurrentRace.mode = isCurrenRace(pastOrCurrentRace)
          ? 'current'
          : 'past'

        pastOrCurrentRace.slug = pastOrCurrentRace.slug
          ? pastOrCurrentRace.slug.current
          : null

        if (pastOrCurrentRace.schedule && pastOrCurrentRace.schedule.length) {
          pastOrCurrentRace.schedule.forEach(function(eventSchedule, index) {
            this[index] = {
              id: eventSchedule._key,
              name: eventSchedule.event,
              datetime: eventSchedule.datetime,
              isQualification: eventSchedule.isQualification,
              pilotList: eventSchedule.pilots.map((p) => ({
                id: p._id ?? null,
                name: p.name ?? null,
                slug: p.slug.current ?? null,
                image: preparePicture(p && p.image)
              }))
            }
          }, pastOrCurrentRace.schedule)
        }

        commit('SET_FEATURED_RACE', pastOrCurrentRace)
      }

      if (data && data.TeamInfo) {
        const teamInfo = cloneDeep(data.TeamInfo)
        // prepare locale strings, images
        if (teamInfo.partners && teamInfo.partners.length) {
          teamInfo.partners.forEach(function(partner, index) {
            this[index] = {
              name: partner.name,
              image: partner.image ? preparePicture(partner.image) : null
            }
          }, teamInfo.partners)
        }

        Object.assign(teamInfo, state.companyData, teamInfo)
        commit('SET_COMPANY_DATA', teamInfo)
      }
    })
    /* } */
  },

  fetchNewsList({ state, commit }, params) {
    const locale = state.locale || this.i18n.defaultLocale
    // relay on apollo query caching to not to duplicate queries
    return ApiService.getNewsList(locale, params).then(({ data }) => {
      // TODO: move to utils/store ???
      const newsList = data.allPost.map((post) => {
        return {
          id: post._id,
          type: 'post',
          title: post.title ? post.title[locale] : '',
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null
        }
      })

      const galleriesList = data.allGallery.map((post) => {
        return {
          id: post._id,
          type: 'gallery',
          title: post.title ? post.title[locale] : '',
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null,
          gallery:
            post.items && post.items.length
              ? post.items.slice(0, 3).map((it) => preparePicture(it.image))
              : null
        }
      })

      commit(
        'SET_NEWS_LIST',
        [...newsList, ...galleriesList].sort((a, b) =>
          a.date > b.date ? -1 : a.date < b.date ? 1 : 0
        )
      )
    })
  },

  fetchSeasonsList({ state, commit }) {
    if (state.settings.seasonsList && state.settings.seasonsList.length) {
      // fetch only once
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      return ApiService.getSeasonsList().then(({ data }) => {
        if (data.allSeason && data.allSeason.length) {
          const settingsWithSeasons = { seasonsList: [] }
          const seasonsList = cloneDeep(data.allSeason)

          seasonsList.forEach(function(season, index) {
            this[index] = {
              year: season.year,
              image: preparePicture(season.image)
            }
          }, seasonsList)

          Object.assign(settingsWithSeasons, state.settings, {
            seasonsList
          })
          commit('SET_SETTINGS', settingsWithSeasons)
        }
      })
    }
  },

  fetchNewsPost({ state, commit }, slug) {
    // TODO: check if current newsPost contains the same by postId
    const locale = state.locale || this.i18n.defaultLocale
    let newsPost = {}
    const imagesIds = []

    // TODO: move to utils/store ???
    return ApiService.getNewsPost(locale, slug)
      .then((data) => {
        if (data.data && data.data.allPost && data.data.allPost[0]) {
          newsPost = cloneDeep(data.data.allPost[0])
          // Reformat Data which need to and cleanup it
          newsPost.title = newsPost.title ? newsPost.title[locale] : ''
          newsPost.slug = newsPost.slug ? newsPost.slug.current : ''
          newsPost.meta_title = newsPost.meta_title
            ? newsPost.meta_title[locale]
            : newsPost.title
          newsPost.meta_description = newsPost.meta_description
            ? newsPost.meta_description[locale]
            : ''

          newsPost.picture = newsPost.mainImage
            ? preparePicture(
                newsPost.mainImage,
                newsPost.mainImage.author,
                newsPost.mainImage[`alt_${locale}`]
              )
            : null
          delete newsPost.mainImage

          newsPost.meta_image = newsPost.picture

          newsPost.date = newsPost.publishedAt
          delete newsPost.publishedAt

          newsPost.blocksList = reformatBlocks(
            newsPost[`body_${locale}Raw`],
            imagesIds
          )

          delete newsPost[`body_${locale}Raw`]
        }
      })
      .then(
        // Due to Sanity.io GraphQL limitations we need to get blockImages data at a separate query
        () => ApiService.getImagesList(imagesIds)
      )
      .then((data) => {
        // Add images data to appropriate blocks
        if (
          data &&
          data.data &&
          data.data.allSanityImageAsset &&
          data.data.allSanityImageAsset.length
        ) {
          data.data.allSanityImageAsset.forEach((image) => {
            const imageBlock = newsPost.blocksList.find(
              (block) => block.imageId === image._id
            )
            imageBlock.content = {
              url: image.url,
              lqip: image.metadata.lqip
            }
          })
        }
        commit('SET_NEWS_POST', newsPost)
      })
  },

  fetchGalleryPost({ state, commit }, slug) {
    // TODO: check if current newsPost contains the same by postId
    const locale = state.locale || this.i18n.defaultLocale
    // TODO: move to utils/store ???
    return ApiService.getGalleryPost(locale, slug).then((data) => {
      if (data.data && data.data.allGallery && data.data.allGallery[0]) {
        const galleryPost = cloneDeep(data.data.allGallery[0])
        // Reformat Data which need to and cleanup it
        galleryPost.title = galleryPost.title ? galleryPost.title[locale] : ''
        galleryPost.slug = galleryPost.slug ? galleryPost.slug.current : ''
        galleryPost.meta_title = galleryPost.meta_title
          ? galleryPost.meta_title[locale]
          : galleryPost.title
        galleryPost.meta_description = galleryPost.meta_description
          ? galleryPost.meta_description[locale]
          : ''

        galleryPost.picture = galleryPost.mainImage
          ? preparePicture(
              galleryPost.mainImage,
              galleryPost.mainImage.author,
              galleryPost.mainImage[`alt_${locale}`]
            )
          : null
        delete galleryPost.mainImage

        galleryPost.meta_image = galleryPost.picture

        galleryPost.date = galleryPost.publishedAt
        delete galleryPost.publishedAt

        if (galleryPost.items && galleryPost.items.length) {
          galleryPost.itemsList = galleryPost.items.map(
            ({ image, pilot, annotation }) => {
              return {
                image: image
                  ? preparePicture(image, image.author, image[`alt_${locale}`])
                  : null,
                pilot: pilot
                  ? {
                      name: pilot.name,
                      slug: pilot.slug ? pilot.slug.current : null
                    }
                  : null,
                annotation: annotation ? annotation[locale] : null
              }
            }
          )
        }
        delete galleryPost.images

        commit('SET_GALLERY_POST', galleryPost)
      }
    })
  },

  fetchSeasonData({ state, commit }, year) {
    // relay on apollo query caching to not to duplicate queries
    return ApiService.getSeason(year).then(({ data }) => {
      const currentYear = new Date().getFullYear()
      const season = { archiveYears: [] }

      if (data.allSeason && data.allSeason[0]) {
        season.start_month = data.allSeason[0].start_month
        season.end_month = data.allSeason[0].end_month
        season.standings_url = data.allSeason[0].standings_url
      }

      if (data.allRace && data.allRace.length) {
        season.raceList = data.allRace.map((race) => {
          const preparedResults = []

          if (race.results && race.results.length) {
            race.results.forEach((result) => {
              if (result.pilotResults && result.pilotResults.length) {
                result.pilotResults.forEach((pr) => {
                  preparedResults.push({
                    id: pr._key,
                    position: pr.position,
                    time: pr.time,
                    points: pr.points
                  })
                })
              }
            })
          }

          return {
            id: race._id,
            name: race.name,
            slug: race.slug ? race.slug.current : null,
            image: preparePicture(race.mainImage),
            serie: race.serie ? race.serie.name : null,
            serie_filter_priority: race.serie
              ? race.serie.filter_priority
              : null,
            datetime: race.datetime,
            isCurrent: isCurrenRace(race),
            results: preparedResults
          }
        })
      }

      if (data.allSerie && data.allSerie.length) {
        season.seriesList = data.allSerie.map((serie) => {
          return {
            id: serie._id,
            name: serie.name,
            results: serie.results,
            standings_url: serie.standings_url,
            priority: serie.filter_priority
          }
        })
      }

      if (data.archiveYears && data.archiveYears.length) {
        data.archiveYears.forEach(({ year }) => {
          if (year !== currentYear && !season.archiveYears.includes(year)) {
            season.archiveYears.push(year)
          }
        })
      }

      commit('SET_SEASON', season)
    })
  },

  fetchRaceData({ state, commit }, slug) {
    const locale = state.locale || this.i18n.defaultLocale
    // relay on apollo query caching to not to duplicate queries
    return ApiService.getRace(locale, slug).then(({ data }) => {
      if (data.allRace && data.allRace[0]) {
        const raceData = cloneDeep(data.allRace[0])

        raceData.meta_title = raceData.meta_title
          ? raceData.meta_title[locale]
          : ''
        raceData.meta_description = raceData.meta_description
          ? raceData.meta_description[locale]
          : ''
        raceData.mainImage = raceData.mainImage
          ? preparePicture(raceData.mainImage)
          : null

        raceData.serie = raceData.serie ? raceData.serie.name : null
        raceData.description = reformatBlocks(
          raceData[`description_${locale}Raw`]
        )
        delete raceData[`description_${locale}Raw`]

        if (raceData.schedule && raceData.schedule.length) {
          raceData.schedule.forEach(function(eventSchedule, index) {
            this[index] = {
              id: eventSchedule._key,
              name: eventSchedule.event,
              datetime: eventSchedule.datetime,
              isQualification: eventSchedule.isQualification,
              pilotList: eventSchedule.pilots.map((p) => ({
                id: p._id ?? null,
                name: p.name ?? null,
                slug: p.slug.current ?? null,
                image: preparePicture(p && p.image)
              }))
            }
          }, raceData.schedule)
        }

        if (raceData.results && raceData.results.length) {
          raceData.results.forEach(function(eventResult, index) {
            this[index] = {
              id: eventResult._key,
              name: eventResult.event,
              isQualification: eventResult.isQualification,
              pilotResultsList: eventResult.pilotResults?.map((pr) => ({
                id: pr._key,
                pilot: {
                  name: pr.pilot ? pr.pilot.name : null,
                  slug: pr.pilot ? pr.pilot.slug.current : null,
                  image: preparePicture(pr.pilot && pr.pilot.image)
                },
                position: pr.position,
                time: pr.time,
                points: pr.points
              }))
            }
          }, raceData.results)
        }

        if (raceData.news && raceData.news.length) {
          const newsList = raceData.news.map((postOrGallery, index) => {
            if (postOrGallery._type === 'gallery') {
              return {
                id: postOrGallery._id,
                type: 'gallery',
                title: postOrGallery.title ? postOrGallery.title[locale] : '',
                slug: postOrGallery.slug ? postOrGallery.slug.current : '',
                date: postOrGallery.publishedAt,
                picture: postOrGallery.mainImage
                  ? preparePicture(postOrGallery.mainImage)
                  : null,
                gallery:
                  postOrGallery.items && postOrGallery.items.length
                    ? postOrGallery.items
                        .slice(0, 3)
                        .map((it) => preparePicture(it.image))
                    : null
              }
            } else if (postOrGallery._type === 'post') {
              return {
                id: postOrGallery._id,
                type: 'post',
                title: postOrGallery.title ? postOrGallery.title[locale] : '',
                slug: postOrGallery.slug ? postOrGallery.slug.current : '',
                date: postOrGallery.publishedAt,
                picture: postOrGallery.mainImage
                  ? preparePicture(postOrGallery.mainImage)
                  : null
              }
            } else {
              return { id: `unknown_${index}` }
            }
          })
          raceData.news = newsList
        }

        raceData.publications = raceData[`publications_${locale}`]
        delete raceData[`publications_${locale}`]

        raceData.isCurrent = isCurrenRace(raceData)

        commit('SET_RACE', raceData)
      }
    })
  },

  fetchTeamPageData({ state, commit }) {
    if (state.companyData.image) {
      // use companyData.image as indicator that team page data has yet been uploaded
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getTeamPageData(locale).then(({ data }) => {
        if (data && data.TeamInfo) {
          const teamInfo = cloneDeep(data.TeamInfo)

          teamInfo.image = teamInfo.image
            ? preparePicture(teamInfo.image)
            : null

          if (teamInfo.achievements && teamInfo.achievements.length) {
            teamInfo.achievements.forEach(function(achievement, index) {
              this[index] = {
                name: achievement.name ? achievement.name[locale] : null,
                value: achievement.value ? achievement.value[locale] : null
              }
            }, teamInfo.achievements)
          }

          if (teamInfo.crew && teamInfo.crew.length) {
            teamInfo.crew.forEach(function(crewMember, index) {
              const qualities = crewMember.qualities
                ? crewMember.qualities.map((quality) => {
                    return { name: quality.name[locale], value: quality.value }
                  })
                : null

              this[index] = {
                name: crewMember.name,
                image: crewMember.image
                  ? preparePicture(crewMember.image)
                  : null,
                position: crewMember.position
                  ? crewMember.position[locale]
                  : null,
                joining_date: crewMember.joining_date,
                qualities
              }
            }, teamInfo.crew)
          }

          Object.assign(teamInfo, state.companyData, teamInfo)
          commit('SET_COMPANY_DATA', teamInfo)
        }

        if (data && data.allPilot && data.allPilot.length) {
          const pilotsList = cloneDeep(data.allPilot)

          pilotsList.forEach(function(pilot, index) {
            this[index] = {
              name: pilot.name,
              slug: pilot.slug ? pilot.slug.current : null,
              image: pilot.image ? preparePicture(pilot.image) : null
            }
          }, pilotsList)

          commit('SET_PILOTS_LIST', pilotsList)
        }

        if (data && data.BaseInfo) {
          const baseInfo = cloneDeep(data.BaseInfo)

          if (baseInfo.images && baseInfo.images.length) {
            baseInfo.images.forEach(function(image, index) {
              this[index] = image ? preparePicture(image) : null
            }, baseInfo.images)
          }

          if (baseInfo.features && baseInfo.features.length) {
            baseInfo.features.forEach(function(feature, index) {
              this[index] = {
                name: feature.name ? feature.name[locale] : null,
                value: feature.value ? feature.value[locale] : null
              }
            }, baseInfo.features)
          }

          baseInfo.blocksList = reformatBlocks(
            baseInfo[`description_${locale}Raw`]
          )
          delete baseInfo[`description_${locale}Raw`]

          Object.assign(baseInfo, state.baseInfo, baseInfo)
          commit('SET_BASE_INFO', baseInfo)
        }
      })
    }
  },

  fetchPilotData({ state, commit }, slug) {
    const locale = state.locale || this.i18n.defaultLocale
    // TODO: move to utils/store ???
    return ApiService.getPilotData(locale, slug).then((data) => {
      if (data.data && data.data.allPilot && data.data.allPilot[0]) {
        const pilotData = cloneDeep(data.data.allPilot[0])

        pilotData.meta_title = pilotData.meta_title
          ? pilotData.meta_title[locale]
          : ''
        pilotData.meta_description = pilotData.meta_description
          ? pilotData.meta_description[locale]
          : ''
        pilotData.image = pilotData.image
          ? preparePicture(pilotData.image)
          : null

        pilotData.description = pilotData[`description_${locale}Raw`]
          ? reformatBlocks(pilotData[`description_${locale}Raw`])
          : null
        delete pilotData[`description_${locale}Raw`]

        pilotData.career_table = prepareNameBlockContentPairs(
          pilotData.career_table,
          locale
        )

        pilotData.characteristics = prepareNameValuePairs(
          pilotData.characteristics,
          locale
        )

        commit('SET_PILOT', pilotData)
      }
    })
  },

  fetchCarsPageData({ state, commit }) {
    if (state.carBannersList && state.carBannersList.length) {
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getCarsPageData(locale).then(({ data }) => {
        if (data && data.allCarBanner && data.allCarBanner.length) {
          data.allCarBanner.forEach(function(item, index) {
            const {
              banner,
              car,
              quote,
              specification,
              fullSpecificationLink
            } = item

            this[index] = {
              id: item._id,
              name: banner.name[locale],
              text: banner.text[locale],
              image: preparePicture(banner.image),
              car: {
                id: car._id,
                name: car.name,
                signature: car.signature,
                isForSale: car.isForSale,
                price: car.price
              },
              quote:
                quote && quote.text
                  ? {
                      text: quote.text[locale],
                      author: quote.author
                    }
                  : null,
              specification:
                specification && specification.length
                  ? prepareNameBlockContentPairs(specification, locale)
                  : prepareNameBlockContentPairs(car.specification, locale),
              fullSpecificationLink:
                fullSpecificationLink || car.fullSpecificationLink
            }
          }, data.allCarBanner)

          commit('SET_CAR_BANNERS_LIST', data.allCarBanner)
        }
      })
    }
  },

  fetchWallpapers({ state, commit }) {
    if (state.wallpapersList && state.wallpapersList.length) {
      // use companyData.image as indicator that team page data has yet been uploaded
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getWallpapers(locale).then(({ data }) => {
        if (data && data.allWallpaper && data.allWallpaper.length) {
          data.allWallpaper.forEach(function(wallpaper, index) {
            this[index] = {
              id: wallpaper._id,
              name: wallpaper.name ? wallpaper.name[locale] : null,
              pilot: wallpaper.pilot ? wallpaper.pilot.name : null,
              image: preparePicture(wallpaper.image),
              sanityImage: wallpaper.image
            }
          }, data.allWallpaper)

          commit('SET_WALLPAPERS_LIST', data.allWallpaper)
        }

        if (data.SiteSettings?.wallpaper_resolutions?.length) {
          const resolutions = data.SiteSettings?.wallpaper_resolutions.map(
            (resolution) => ({
              id: resolution._key,
              title: resolution.title ? resolution.title[locale] : null,
              width: resolution.width,
              height: resolution.height
            })
          )

          commit('SET_WALLPAPER_RESOLUTIONS_LIST', resolutions)
        }
      })
    }
  },

  fetchCareersPageData({ state, commit }) {
    if (state.companyData.vacancies && state.companyData.vacancies.length) {
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getCareersPageData(locale).then(({ data }) => {
        if (data && data.SiteSettings) {
          const SiteSettings = cloneDeep(data.SiteSettings)
          // prepare locale strings, images
          SiteSettings.careers_image = preparePicture(
            SiteSettings.careers_image
          )
          SiteSettings.careers_description = reformatBlocks(
            SiteSettings[`careers_description_${locale}Raw`]
          )

          Object.assign(SiteSettings, state.settings, SiteSettings)
          commit('SET_SETTINGS', SiteSettings)
        }

        if (data && data.TeamInfo) {
          const TeamInfo = cloneDeep(data.TeamInfo)

          const currentDatetime = new Date().toISOString()

          TeamInfo.vacancies = TeamInfo.vacancies
            .filter(
              (vacancy) =>
                vacancy.expire_on === null ||
                vacancy.expire_on > currentDatetime
            )
            .map((vacancy) => {
              return {
                name: vacancy.name ? vacancy.name[locale] : null,
                expireOn: vacancy.expire_on ? vacancy.expire_on : null,
                image: vacancy.image ? preparePicture(vacancy.image) : null,
                blocksList: reformatBlocks(vacancy[`description_${locale}Raw`])
              }
            })

          Object.assign(TeamInfo, state.companyData, TeamInfo)
          commit('SET_COMPANY_DATA', TeamInfo)
        }
      })
    }
  },

  fetchContactsPageData({ state, commit }) {
    if (state.baseInfo.address) {
      // use baseInfo.address as indicator thar contact page data has been uploaded before
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      const locale = state.locale || this.i18n.defaultLocale
      return ApiService.getContactsPageData(locale).then(({ data }) => {
        if (data && data.BaseInfo) {
          const baseInfo = cloneDeep(data.BaseInfo)
          baseInfo.address = baseInfo.address ? baseInfo.address[locale] : null

          Object.assign(baseInfo, state.baseInfo, baseInfo)
          commit('SET_BASE_INFO', baseInfo)
        }

        if (data && data.TeamInfo) {
          const teamInfo = cloneDeep(data.TeamInfo)

          Object.assign(teamInfo, state.companyData, teamInfo)
          commit('SET_COMPANY_DATA', teamInfo)
        }
      })
    }
  },

  setSearchQuery({ state, commit }, searchQuery) {
    commit('SET_SEARCH_QUERY', searchQuery)
  },

  fetchSearchResults({ state, commit }, params) {
    const locale = state.locale || this.i18n.defaultLocale

    // relay on apollo query caching to not to duplicate queries
    return ApiService.getSearchResultList(locale, {
      ...params,
      searchQuery: state.searchQuery
    }).then(({ data }) => {
      // TODO: move to utils/store ???
      const newsList = data.allPost.map((post) => {
        return {
          id: post._id,
          type: 'post',
          title: post.title ? post.title[locale] : '',
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null
        }
      })

      const galleriesList = data.allGallery.map((post) => {
        return {
          id: post._id,
          type: 'gallery',
          title: post.title ? post.title[locale] : '',
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null,
          gallery:
            post.items && post.items.length
              ? post.items.slice(0, 3).map((it) => preparePicture(it.image))
              : null
        }
      })

      commit(
        'SET_SEARCH_RESULT_LIST',
        [...newsList, ...galleriesList].sort((a, b) =>
          a.date > b.date ? -1 : a.date < b.date ? 1 : 0
        )
      )
    })
  },

  fetchAllNews({ state, commit }) {
    if (state.allNewsList && state.allNewsList.length) {
      // fetch list only once
      return new Promise((resolve) => {
        resolve()
      })
    }

    const locale = state.locale || this.i18n.defaultLocale

    // relay on apollo query caching to not to duplicate queries
    return ApiService.getAllNewsList(locale).then(({ data }) => {
      // TODO: move to utils/store ???

      const newsList = data.allPost.map((post) => {
        const title = post.title ? post.title[locale] : ''

        const imagesIds = []
        const blockListPlainText = reformatBlocks(
          post[`body_${locale}Raw`],
          imagesIds // TODO: add search by post body images annotation
        ).reduce((acc, block) => {
          if (['html', 'header'].includes(block.type)) {
            acc += block.content
          }
          return acc
        }, '')

        return {
          id: post._id,
          type: 'post',
          title,
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null,
          // to filter by in search page
          searchableString: title + blockListPlainText
        }
      })

      const galleriesList = data.allGallery.map((post) => {
        const title = post.title ? post.title[locale] : ''
        const plainImagesAnnotation = post.items.reduce((acc, it) => {
          acc += it.annotation ? it.annotation[locale] : ''
          return acc
        }, '')

        return {
          id: post._id,
          type: 'gallery',
          title,
          slug: post.slug ? post.slug.current : '',
          date: post.publishedAt,
          picture: post.mainImage ? preparePicture(post.mainImage) : null,
          // to filter by in search page
          searchableString: title + plainImagesAnnotation
        }
      })

      commit(
        'SET_ALL_NEWS_LIST',
        [...newsList, ...galleriesList].sort((a, b) =>
          a.date > b.date ? -1 : a.date < b.date ? 1 : 0
        )
      )
    })
  }
}
