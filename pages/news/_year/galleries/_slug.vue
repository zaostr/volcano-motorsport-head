<template>
  <div class="grid-container page-container">
    <LinkBack
      :text="$t('newsGallery.news')"
      :route-name="newsListRouteName"
      :route-params="newsListRouteParams"
    />

    <Heading
      :text="galleryPost.title"
      :size="headingSize"
      seo="h1"
      class="main-heading"
    />

    <DateBadge :date="galleryPost.date" />

    <masonry
      :cols="masonryCols"
      :gutter="masonryGutter"
      class="gallery-container"
    >
      <Picture
        v-for="(item, index) in galleryPost.itemsList"
        :key="item.id"
        :picture="prepareGalleryPostPicture(item.image)"
        :alt="item.image ? item.image.alt : ''"
        :lqip="item.image ? item.image.lqip : ''"
        :author="item.image ? item.image.author : ''"
        :caption="item.annotation"
        class="gallery-item"
        @click.native="showZoomInHandler(index)"
      />
    </masonry>

    <SocialsShare />

    <template v-if="newsList && newsList.length">
      <Heading
        :text="$t('newsGallery.latestNews')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <NewsList :list="newsList" :show-limit="6" />

      <ControlButton
        :text="$t('newsGallery.showAll')"
        :route-name="newsListRouteName"
        :route-params="latestNewsListRouteParams"
        class="show-all-button"
      />
    </template>

    <!--Swiper-->
    <transition name="opacity">
      <div v-if="zoomIn" class="zoom-in-container">
        <div class="zoom-in-close-btn" @click="zoomIn = false">
          <IconClose />
        </div>

        <div class="zoom-in-body">
          <SlideSwiper
            :zoom-in="true"
            :slide-index="slideIndex"
            :vertical-centered="true"
            :options="{ loop: true }"
          >
            <div
              v-for="item in galleryPost.itemsList"
              :key="item.id"
              class="swiper-slide"
            >
              <Picture
                :picture="prepareZoomInGalleryPostPicture(item.image)"
                :alt="item.image ? item.image.alt : ''"
                :author="item.image ? item.image.author : ''"
                :caption="item.annotation"
                :maintain-aspect-ratio="true"
                :loaded-initially="true"
              />
            </div>
          </SlideSwiper>
        </div>
      </div>
    </transition>
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
import IconClose from '@/components/icons/Close'
import Heading from '@/components/atoms/Heading'
import LinkBack from '@/components/atoms/LinkBack'
import DateBadge from '@/components/atoms/DateBadge'
import Picture from '@/components/atoms/Picture'
import ControlButton from '@/components/atoms/ControlButton'
import SocialsShare from '@/components/molecules/SocialsShare'
import NewsList from '@/components/organisms/NewsList'
import SlideSwiper from '@/components/molecules/SlideSwiper'

export default {
  name: 'NewsGalleryPage',

  components: {
    SlideSwiper,
    IconClose,
    ControlButton,
    NewsList,
    Picture,
    DateBadge,
    LinkBack,
    Heading,
    SocialsShare
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await Promise.all([
        store.dispatch('fetchGalleryPost', params.slug),
        // get last 6 news of current year
        // TODO: check if cached in apollo
        store.dispatch('fetchNewsList', { limit: 6 })
      ])
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      newsListRouteName: routeNamesList.newsList,
      zoomIn: false,
      escapeListener: null,
      slideIndex: 0
    }
  },

  computed: {
    newsListRouteParams() {
      return {
        year:
          this.galleryPost && this.galleryPost.date
            ? new Date(this.galleryPost.date).getFullYear()
            : new Date().getFullYear()
      }
    },

    masonryCols() {
      return this.deviceWidth === 'xs' ? 1 : 2
    },

    masonryGutter() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? '18' : '24'
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    latestNewsListRouteParams() {
      return {
        year: new Date().getFullYear()
      }
    },

    newsGalleryShortDescription() {
      const firstHtmlBlock =
        this.galleryPost &&
        this.galleryPost.description &&
        this.galleryPost.description.length &&
        this.galleryPost.description.find((block) => block.type === 'html')

      if (firstHtmlBlock) {
        return firstHtmlBlock.content.substr(0, 280)
      } else {
        return ''
      }
    },

    metaData() {
      return {
        title: this.galleryPost.meta_title || this.galleryPost.name,
        description: this.prepareMetaDescription(
          this.galleryPost.meta_description || this.newsGalleryShortDescription
        ),
        image: this.prepareMetaImagePath(this.mainPicture)
      }
    },

    ...mapState(['deviceWidth', 'galleryPost', 'newsList'])
  },

  watch: {
    zoomIn(value) {
      const body = document.getElementsByTagName('body')[0]
      if (value) {
        body.classList.add('__blocked-scroll')
      } else {
        body.classList.remove('__blocked-scroll')
      }
    }
  },

  mounted() {
    // VueScrollTo.scrollTo('body')
    // this.$nuxt.$store.dispatch('setNotification', '')
    this.escapeListener = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.zoomIn = false
      }
    }

    window.addEventListener('keydown', this.escapeListener)
  },

  beforeDestroy() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('__blocked-scroll')

    if (this.escapeListener) {
      window.removeEventListener('keydown', this.escapeListener)
    }
  },

  methods: {
    prepareGalleryPostPicture(image) {
      if (['string', 'undefined'].includes(typeof image)) {
        // flat picture fallback
        return image
      } else if (typeof image === 'object') {
        // Prepare Responsive image
        const picture = []
        const separator = image?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              { density: '1x', src: image.url + separator + 'w=444' },
              { density: '2x', src: image.url + separator + 'w=888' }
            ]
          },
          {
            min_width: 480,
            srcset: [
              { density: '1x', src: image.url + separator + 'w=356' },
              { density: '2x', src: image.url + separator + 'w=712' }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              { density: '1x', src: image.url + separator + 'w=468' },
              { density: '2x', src: image.url + separator + 'w=936' }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              { density: '1x', src: image.url + separator + 'w=558' },
              { density: '2x', src: image.url + separator + 'w=1116' }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              { density: '1x', src: image.url + separator + 'w=648' },
              { density: '2x', src: image.url + separator + 'w=1296' }
            ]
          }
        )

        return picture
      }

      return null
    },

    prepareZoomInGalleryPostPicture(image) {
      if (['string', 'undefined'].includes(typeof image)) {
        // flat picture fallback
        return image
      } else if (typeof image === 'object') {
        // Prepare Responsive image
        const picture = []
        // TODO: maybe we should restrict size here ???
        // const separator = image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          src: image.url
        })

        return picture
      }

      return null
    },

    showZoomInHandler(index) {
      this.slideIndex = index + 1
      this.zoomIn = true
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.main-heading {
  margin-top: 8px;
}

.date-badge,
.gallery-container {
  margin-top: 24px;
}

.socials-share {
  margin-top: 32px;
}

.gallery-container {
  margin-bottom: -18px;
}

.gallery-item {
  margin-bottom: 18px;
  cursor: zoom-in;
}

.subheading {
  margin-top: 96px;
}

.news-list {
  margin-top: 24px;
  padding: 0;
}

.show-all-button {
  margin: 56px auto 0;
}

.zoom-in-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: $gray-900;
  z-index: 1000;
}

.zoom-in-close-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  z-index: 1010;
}

.zoom-in-body {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  padding: 32px 0;
}

.swiper-container {
  max-height: 100%;
}

.swiper-slide {
  display: flex;

  .picture-container {
    max-height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 0 auto;
  }
}

@media (min-width: $sm-breakpoint) {
  .zoom-in-body {
    padding: 10vh 10vw;
  }
}

@media (min-width: $md-breakpoint) {
  .page-container {
    padding-top: 44px;
  }

  .date-badge,
  .gallery-container {
    margin-top: 32px;
  }

  .gallery-container {
    margin-bottom: -24px;
  }

  .gallery-item {
    margin-bottom: 24px;
  }

  .subheading {
    margin-top: 128px;
  }

  .show-all-button {
    margin: 64px auto 0;
  }
}
</style>

<style lang="scss">
.__blocked-scroll {
  overflow: hidden;
}
</style>
