<template>
  <div class="grid-container page-container">
    <Heading
      v-if="isCurrentYear"
      :text="$t('pages.news')"
      :size="headingSize"
      seo="h1"
    />
    <BreadcrumbsArchive
      v-else
      :back-route-name="newsListRouteName"
      :back-route-params="{ year: currentYear }"
      :back-text="$t('news.news')"
      :year="year"
    />

    <div class="filter-search-container">
      <NewsFilter :type-filter="typeFilter" @change="changeFilterHandler" />

      <SearchInput v-if="showSearchInput" />
    </div>

    <NewsList
      v-if="filteredNewsList && filteredNewsList.length"
      :list="filteredNewsList"
      :show-limit="shownNewsItemsLimit"
    />

    <ControlButton
      v-if="showMoreButton"
      :text="$t('news.showMore')"
      class="show-more-button"
      @click="showMoreHandler"
    />

    <template v-if="archiveSeasonsList && archiveSeasonsList.length">
      <Heading
        :text="$t('season.archive')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <section class="news-archive-list">
        <CardSeasonArchive
          v-for="season in archiveSeasonsList"
          :key="season.year"
          :data="season"
          type="news"
        />
      </section>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import VueScrollTo from 'vue-scrollto'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import Heading from '@/components/atoms/Heading'
import ControlButton from '@/components/atoms/ControlButton'
import SearchInput from '@/components/molecules/SearchInput'
import NewsFilter from '@/components/molecules/NewsFilter'
import CardSeasonArchive from '@/components/molecules/CardSeasonArchive'
import NewsList from '@/components/organisms/NewsList'
import BreadcrumbsArchive from '@/components/molecules/BreadcrumbsArchive'

export default {
  name: 'NewsPage',

  components: {
    BreadcrumbsArchive,
    NewsList,
    CardSeasonArchive,
    ControlButton,
    NewsFilter,
    SearchInput,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await Promise.all([
        store.dispatch('fetchNewsList', { year: params.year }),
        store.dispatch('fetchSeasonsList')
      ])
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      newsListRouteName: routeNamesList.newsList,
      newsGalleryRoute: routeNamesList.galleryPost,
      newsPostRoute: routeNamesList.newsPost,
      typeFilter: 'all',
      shownNewsItemsLimit: 12,
      year: this.$route.params.year
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },

    isCurrentYear() {
      // season of this year
      return parseInt(this.year) === this.currentYear
    },

    showSearchInput() {
      return parseInt(this.$route.params.year) === new Date().getFullYear()
    },

    archiveSeasonsList() {
      if (!this.settings.seasonsList || !this.settings.seasonsList.length) {
        return []
      }
      // exclude current season year and active season year (this page)
      const currentYear = new Date().getFullYear()
      const activeSeasonYear = parseInt(this.year)

      return this.settings.seasonsList.filter(
        (season) => ![currentYear, activeSeasonYear].includes(season.year)
      )
    },

    filteredNewsList() {
      if (!this.typeFilter || this.typeFilter === 'all') {
        return this.newsList
      } else {
        return this.newsList.filter((it) => it.type === this.typeFilter)
      }
    },

    showMoreButton() {
      if (this.filteredNewsList && this.filteredNewsList.length) {
        return this.filteredNewsList.length > this.shownNewsItemsLimit
      } else {
        return false
      }
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    metaData() {
      return {
        title: this.$t('pages.news'),
        description: this.$t('pageDescriptions.news'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState(['deviceWidth', 'companyData', 'settings', 'newsList'])
  },

  methods: {
    changeFilterHandler(filter) {
      this.shownNewsItemsLimit = 12
      this.typeFilter = filter
    },

    showMoreHandler() {
      this.shownNewsItemsLimit = 999
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.filter-search-container {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $white015;
}

.search-wrap {
  margin-bottom: 16px;
}

.show-more-button {
  margin: 56px auto 0;
}

.news-list {
  margin-top: 56px;
  padding: 0;
}

.subheading {
  margin-top: 96px;
}

.news-archive-list {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid $white015;

  .card-wrap {
    width: 100%;
    border: 1px solid $white015;
    border-left: none;
  }
}

@media (max-width: $sm-breakpoint) {
  .news-archive-list {
    .card-wrap {
      &:nth-child(n + 2) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .news-archive-list {
    .card-wrap {
      width: 50%;

      &:nth-child(n + 3) {
        border-top: none;
      }
    }
  }
}

@media (max-width: $md-breakpoint) {
  .search-wrap {
    margin-bottom: 16px;
    margin-top: -8px;
  }
}

@media (min-width: $md-breakpoint) {
  .filter-search-container {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 24px;
  }

  .search-wrap {
    margin-bottom: 18px;
  }

  .filter-wrap {
    grid-column: 1/7;
  }

  .search-wrap {
    grid-column: 7/13;
  }

  .news-list {
    margin-top: 56px;
  }

  .show-more-button {
    margin: 64px auto 0;
  }

  .subheading {
    margin-top: 128px;
  }

  .news-archive-list {
    .card-wrap {
      width: 33.333%;
    }
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .news-archive-list {
    .card-wrap {
      &:nth-child(n + 4) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .page-container {
    display: block !important;
  }

  .news-archive-list {
    .card-wrap {
      width: 25%;

      &:nth-child(n + 5) {
        border-top: none;
      }
    }
  }
}
</style>
