<template>
  <main class="page-container">
    <FirstScreen />

    <NextRaceCountdown />

    <BlockHeading
      :sup-heading="$t('index.newsListSupHeading')"
      :heading="$t('index.newsListHeading')"
    />
    <NewsList :list="newsList" :show-limit="6" />
    <ControlButton
      v-bind="showAllNewsProps"
      :text="$t('index.showAll')"
      class="show-all-button"
    />

    <CarBanner />

    <BlockHeading
      :sup-heading="$t('index.partnersSupHeading')"
      :heading="$t('index.partnersHeading')"
    />
    <PartnerList />

    <BlockHeading
      :sup-heading="$t('index.socialsSupHeading')"
      :heading="$t('index.socialsHeading')"
      :instagram-icon="true"
    />
    <InstagramFeed />
    <ControlButton
      :prevent-default="false"
      :href="settings.instagram_link"
      :text="$t('index.followUs')"
      class="show-all-button"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import InstagramFeed from '@/components/organisms/Index/InstagramFeed'
import FirstScreen from '@/components/organisms/Index/FirstScreen'
import NextRaceCountdown from '@/components/organisms/Index/FeaturedWeekend'
import BlockHeading from '@/components/organisms/Index/BlockHeading'
import NewsList from '@/components/organisms/NewsList'
import ControlButton from '@/components/atoms/ControlButton'
import CarBanner from '@/components/organisms/Index/CarBanner'
import PartnerList from '@/components/organisms/Index/PartnerList'

export default {
  name: 'IndexPage',

  components: {
    PartnerList,
    CarBanner,
    ControlButton,
    NewsList,
    BlockHeading,
    NextRaceCountdown,
    FirstScreen,
    InstagramFeed
  },

  mixins: [head],

  async asyncData({ store, error }) {
    try {
      await Promise.all([
        store.dispatch('fetchIndexPageData'),
        store.dispatch('fetchNewsList', { limit: 6 })
      ])
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  computed: {
    showAllNewsProps() {
      return {
        routeName: routeNamesList.newsList,
        routeParams: { year: new Date().getFullYear() }
      }
    },

    metaData() {
      return {
        title: this.settings.meta_title,
        description: this.settings.meta_description,
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState([
      'locale',
      'deviceWidth',
      'settings',
      'companyData',
      'nextRace',
      'newsList'
    ])
  },

  async mounted() {
    try {
      await this.$store.dispatch('fetchIndexPageData')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.page-container {
  padding-top: 0;
}

.news-list {
  margin-top: 40px;
}

@media (max-width: $md-breakpoint) {
  .show-all-button {
    margin: 56px auto 0;
  }
}

@media (min-width: $md-breakpoint) {
  .show-all-button {
    margin: 64px auto 0;
  }
}
</style>
