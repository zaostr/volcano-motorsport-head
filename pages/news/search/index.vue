<template>
  <div class="grid-container page-container">
    <div class="page-content">
      <div class="back-link-wrap">
        <LinkBack
          :text="$t('search.backLinkText')"
          :route-name="newsListRouteName"
          :route-params="{ year: new Date().getFullYear() }"
        />

        <DarwinText text="/" size="tiny" />

        <DarwinText :text="$t('search.heading')" size="tiny" />
      </div>

      <div class="search-form-wrap">
        <div class="search-input-wrap">
          <input
            ref="search-input"
            :value="inputSearchQuery"
            :placeholder="$t('search.searchInputPlaceholder')"
            class="search-input"
            @change="changeSearchQuery"
            @input="changeSearchQuery"
            @blur="doSearchHandler"
            @keydown.enter="doSearchHandler"
          />

          <transition name="opacity">
            <IconClose
              v-if="inputSearchQuery"
              class="icon-close"
              @click.native="clearSearchInputHandler"
            />
          </transition>
        </div>

        <ControlButton
          v-if="!['xs', 'sm'].includes(deviceWidth)"
          :text="$t('search.searchBtnText')"
          @click="doSearchHandler"
        />
        <ControlButton v-else :icon-only="true" @click="doSearchHandler">
          <IconSearch />
        </ControlButton>
      </div>

      <transition-group
        :css="false"
        tag="section"
        class="results-wrap"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <CardNewsLine
          v-for="(item, index) in paginatedSearchResultList"
          :key="item.id"
          :data="item"
          :data-index="index"
        />

        <DarwinText
          v-if="!searchResultList || !searchResultList.length"
          key="empty-results"
          :text="$t('search.emptyResults')"
          class="empty-results"
        />
      </transition-group>

      <ControlButton
        v-if="showMoreButton"
        :text="$t('search.showMore')"
        class="show-more-button"
        @click="showMoreHandler"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** mixins **/
import head from '@/mixins/head'
import cardAppearanceAnimation from '@/mixins/cardAppearanceAnimation'

/** components **/
import DarwinText from '@/components/atoms/Text'
import ControlButton from '@/components/atoms/ControlButton'
import LinkBack from '@/components/atoms/LinkBack'
import IconClose from '@/components/icons/Close'
import CardNewsLine from '@/components/molecules/CardNewsLine'
import IconSearch from '@/components/icons/Search'

export default {
  name: 'SearchResultsPage',

  components: {
    IconSearch,
    CardNewsLine,
    IconClose,
    LinkBack,
    ControlButton,
    DarwinText
  },

  mixins: [head, cardAppearanceAnimation],

  data() {
    return {
      inputSearchQuery: this.$route && this.$route.query.q,
      newsListRouteName: routeNamesList.newsList,
      searchRouteName: routeNamesList.search,
      shownPage: 1
    }
  },

  computed: {
    searchResultList() {
      // strict case insensitive match
      const re = new RegExp(this.stateSearchQuery, 'i')
      return this.allNewsList.filter((item) => {
        return re.test(item.searchableString)
      })
    },

    paginatedSearchResultList() {
      return this.searchResultList.slice(0, this.perPage * this.shownPage)
    },

    showMoreButton() {
      return this.searchResultList.length > this.perPage * this.shownPage
    },

    metaData() {
      return {
        title: this.$t('pages.search'),
        description: this.$t('pageDescriptions.search'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState({
      settings: (state) => state.settings,
      deviceWidth: (state) => state.deviceWidth,
      allNewsList: (state) => state.allNewsList,
      stateSearchQuery: (state) => state.searchQuery
    })
  },

  async mounted() {
    try {
      await this.$store.dispatch('fetchAllNews')
    } catch (e) {
      // TODO: redirect to 503
      console.log(e)
    }
  },

  methods: {
    clearSearchInputHandler() {
      this.inputSearchQuery = ''
      this.$refs['search-input'].focus()
    },

    changeSearchQuery(e) {
      this.inputSearchQuery = e.target.value
    },

    doSearchHandler() {
      this.$store.dispatch('setSearchQuery', this.inputSearchQuery)
      this.shownPage = 1
    },

    showMoreHandler() {
      this.shownPage++
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.back-link-wrap {
  display: flex;
  align-items: center;

  * {
    color: $gray-300;
  }

  > * + * {
    margin-left: 8px;
  }
}

.search-form-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;

  .search-input-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    border-left: 3px solid $orange-500;
  }

  .search-input {
    width: 100%;
    height: 100%;
    border: 1px solid $white015;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding: 12px 52px 12px 13px;
    font-size: 15px;
    line-height: 24px;
    background: transparent;
    color: $white;
  }

  .icon {
    height: 24px;
    width: 24px;
  }

  .icon-close {
    position: absolute;
    right: 12px;
    color: $gray-700;
    cursor: pointer;
    transition: color 150ms linear;

    &:hover {
      color: $white;
    }
  }
}

.empty-results {
  margin: 0 auto;
}

.show-more-button {
  margin: 56px auto 0;
}

@media (max-width: $md-breakpoint) {
  .search-form-wrap {
    margin-top: 44px;
  }

  .results-wrap {
    margin-top: 56px;
  }
}

@media (min-width: $md-breakpoint) {
  .search-form-wrap {
    margin-top: 24px;
  }

  .results-wrap {
    margin-top: 64px;
  }

  .show-more-button {
    margin: 64px auto 0;
  }
}

@media (min-width: $lg-breakpoint) {
  .page-content {
    grid-column: 3/11;
  }
}
</style>
