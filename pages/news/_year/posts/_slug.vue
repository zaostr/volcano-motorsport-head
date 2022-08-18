<template>
  <div class="grid-container page-container">
    <div class="main-picture-container">
      <Picture
        :picture="mainPicture"
        :lqip="newsPost.picture ? newsPost.picture.lqip : null"
        :author="newsPost.picture.author"
        :aspect-ratio="aspectRatio"
        class="main-picture"
      />
    </div>

    <LinkBack
      :text="$t('newsPost.news')"
      :route-name="newsListRouteName"
      :route-params="newsListRouteParams"
    />

    <Heading
      :text="newsPost.title"
      :size="headingSize"
      seo="h1"
      class="main-heading"
    />

    <DateBadge :date="newsPost.date" />

    <RichText :block-list="newsPost.blocksList" text-size="augmented" />

    <SocialsShare />

    <template v-if="newsList && newsList.length">
      <Heading
        :text="$t('newsPost.latestNews')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <NewsList :list="newsList" :show-limit="6" />

      <ControlButton
        :text="$t('newsPost.showAll')"
        :route-name="newsListRouteName"
        :route-params="latestNewsListRouteParams"
        class="show-all-button"
      />
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
import SocialsShare from '@/components/molecules/SocialsShare'
import Picture from '@/components/atoms/Picture'
import LinkBack from '@/components/atoms/LinkBack'
import DateBadge from '@/components/atoms/DateBadge'
import RichText from '@/components/organisms/RichText'
import NewsList from '@/components/organisms/NewsList'
import ControlButton from '@/components/atoms/ControlButton'

export default {
  name: 'NewsPostPage',

  components: {
    ControlButton,
    NewsList,
    RichText,
    DateBadge,
    LinkBack,
    Picture,
    Heading,
    SocialsShare
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await Promise.all([
        store.dispatch('fetchNewsPost', params.slug),
        store.dispatch('fetchNewsList', { limit: 6 }) // latest, current
      ])
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      newsListRouteName: routeNamesList.newsList
      // newsPostRouteName: routeNamesList.newsPost,
      // newsGalleryRouteName: routeNamesList.galleryPost
    }
  },

  computed: {
    mainPicture() {
      if (!this.newsPost || !this.newsPost.picture) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.newsPost.picture)) {
        // flat picture fallback
        return this.newsPost.picture
      } else if (typeof this.newsPost.picture === 'object') {
        const picture = []
        const separator = this.newsPost.picture?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.newsPost.picture.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.newsPost.picture.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.newsPost.picture.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.newsPost.picture.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.newsPost.picture.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: this.newsPost.picture.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.newsPost.picture.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: this.newsPost.picture.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.newsPost.picture.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: this.newsPost.picture.url + separator + 'w=2640'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    aspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '2:3'
      } else if (['sm', 'md'].includes(this.deviceWidth)) {
        return '9:16'
      } else {
        return '5:12'
      }
    },

    newsListRouteParams() {
      return {
        year:
          this.newsPost && this.newsPost.date
            ? new Date(this.newsPost.date).getFullYear()
            : new Date().getFullYear()
      }
    },

    latestNewsListRouteParams() {
      return {
        year: new Date().getFullYear()
      }
    },

    newsPostShortDescription() {
      const firstHtmlBlock =
        this.newsPost &&
        this.newsPost.blocksList &&
        this.newsPost.blocksList.length &&
        this.newsPost.blocksList.find((block) => block.type === 'html')

      if (firstHtmlBlock) {
        return firstHtmlBlock.content.substr(0, 280)
      } else {
        return ''
      }
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    metaData() {
      return {
        title: this.newsPost.meta_title || this.newsPost.name,
        description: this.prepareMetaDescription(
          this.newsPost.meta_description || this.newsPostShortDescription
        ),
        image: this.prepareMetaImagePath(this.mainPicture)
      }
    },

    ...mapState(['deviceWidth', 'newsPost', 'newsList'])
  },

  mounted() {
    // VueScrollTo.scrollTo('body')
    // TODO: what is this ???
    // this.$nuxt.$store.dispatch('setNotification', '')
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.page-container {
  padding-top: 0;
}

.link-back {
  margin-top: 32px;
}

.main-heading {
  margin-top: 8px;
}

.date-badge,
.rich-text {
  margin-top: 24px;
}

.socials-share {
  margin-top: 32px;
}

.news-list {
  margin-top: 24px;
}

.show-all-button {
  margin: 56px auto 0;
}

@media (max-width: $md-breakpoint) {
  .subheading {
    margin-top: 96px;
  }

  .news-list {
    padding: 0;
  }
}

@media (min-width: $md-breakpoint) {
  .link-back {
    margin-top: 44px;
  }

  .date-badge,
  .rich-text {
    margin-top: 32px;
  }

  .rich-text {
    grid-column: 1/8;
  }

  .socials-share {
    grid-column: 9/13;
  }

  .subheading {
    margin-top: 128px;
  }

  .show-all-button {
    margin: 64px auto 0;
  }
}
</style>
