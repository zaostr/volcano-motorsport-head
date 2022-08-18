// Contains all Headless CMS API calls.
// Query implementations are stored at ./queries folder

import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

import { HEADLESS_CMS_ENDPOINT } from '../config'
import getCommonDataQuery from './queries/commonData'
import getCookiePolicyPageQuery from './queries/cookiePolicy'
import getIndexDataQuery from './queries/indexPage'
import getNewsListQuery from './queries/newsList'
import getSeasonsListQuery from './queries/seasonsList'
import getNewsPostQuery from './queries/newsPost'
import getImagesListQuery from './queries/imagesList'
import getGalleryPostQuery from './queries/galleryPost'
import getSeasonQuery from './queries/season'
import getRaceQuery from './queries/race'
import getTeamPageQuery from './queries/team'
import getPilotQuery from './queries/pilot'
import getCarsPageQuery from './queries/cars'
import getWallpapersQuery from './queries/wallpapers'
import getCareersPageQuery from './queries/careers'
import getContactsPageQuery from './queries/contacts'

import getSearchNewsListQuery from './queries/searchNewsList'
import getAllNewsListQuery from './queries/allNewsList'

import getDynamicSourcesQuery from './queries/dynamicSources'

const httpLink = createHttpLink({ uri: HEADLESS_CMS_ENDPOINT, fetch })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default {
  getCommonData(locale) {
    // Query for data needed for entire application
    return client.query(getCommonDataQuery(locale))
  },

  getCookiePolicyPageData(locale) {
    // Query for data needed for entire application
    return client.query(getCookiePolicyPageQuery(locale))
  },

  getIndexPageData(locale) {
    return client.query(getIndexDataQuery(locale))
  },

  getNewsList(locale, params) {
    return client.query(getNewsListQuery(locale, params))
  },

  getSeasonsList() {
    return client.query(getSeasonsListQuery())
  },

  getNewsPost(locale, slug) {
    return client.query(getNewsPostQuery(locale, slug))
  },

  getImagesList(imagesIds) {
    // Needed to collect images URLs inside block data type
    let imagesIdsString = ''
    if (typeof imagesIds === 'string') {
      imagesIdsString = imagesIds
    } else if (imagesIds.length) {
      imagesIdsString = imagesIds.join('","')
    } else {
      return new Promise((resolve) => {
        resolve()
      })
    }

    return client.query(getImagesListQuery(imagesIdsString))
  },

  getGalleryPost(locale, slug) {
    return client.query(getGalleryPostQuery(locale, slug))
  },

  getSeason(year) {
    return client.query(getSeasonQuery(year))
  },

  getRace(locale, slug) {
    return client.query(getRaceQuery(locale, slug))
  },

  getTeamPageData(locale) {
    return client.query(getTeamPageQuery(locale))
  },

  getPilotData(locale, slug) {
    return client.query(getPilotQuery(locale, slug))
  },

  getCarsPageData(locale) {
    return client.query(getCarsPageQuery(locale))
  },

  getWallpapers(locale) {
    return client.query(getWallpapersQuery(locale))
  },

  getCareersPageData(locale) {
    return client.query(getCareersPageQuery(locale))
  },

  getContactsPageData(locale) {
    return client.query(getContactsPageQuery(locale))
  },

  getDynamicSources() {
    return client.query(getDynamicSourcesQuery())
  },

  getSearchResultList(locale, params) {
    return client.query(getSearchNewsListQuery(locale, params))
  },

  getAllNewsList(locale) {
    return client.query(getAllNewsListQuery(locale))
  }
}
