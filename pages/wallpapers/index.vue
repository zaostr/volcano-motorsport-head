<template>
  <main class="grid-container page-container">
    <Heading :text="$t('pages.wallpapers')" :size="headingSize" seo="h1" />

    <div id="active_wallpaper_container" class="active-wallpaper-container">
      <Picture
        :picture="activeWallpaperPreview"
        :lqip="activeWallpaper.image ? activeWallpaper.image.lqip : null"
        :height="
          deviceWidth !== 'xs' ? wallpaperPreviewDimensions.height + 'px' : null
        "
        :title="activeWallpaper.name"
        object-fit="contain"
        class="active-wallpaper-wrap"
      />

      <div class="wallpaper-actions-wrap">
        <div class="wallpaper-name-wrap">
          <DarwinText :text="activeWallpaper.name" />

          <div v-if="activeWallpaper.pilot" class="pilot-wrap">
            <IconHelmet />

            <DarwinText :text="activeWallpaper.pilot" size="tiny" />
          </div>
        </div>

        <div class="resolution-select-wrap">
          <select class="resolution-select" @change="changeSelectedResolution">
            <option
              v-for="resolution in wallpaperResolutionsList"
              :key="resolution.id"
              :value="resolution.id"
              :selected="resolution.id === selectedResolutionId"
            >
              {{
                `${resolution.title} (${resolution.width}x${resolution.height})`
              }}
            </option>
          </select>

          <DarwinText :text="$t('wallpapers.change')" size="tiny" />
          <IconCaret />
        </div>

        <ControlButton
          :text="$t('wallpapers.download')"
          class="download-button"
          @click="downloadActiveWallpaperHandler"
        />
      </div>
    </div>

    <transition-group name="list" tag="ul" class="wallpaper-list">
      <li
        v-for="wallpaper in filteredWallpaperList"
        :key="wallpaper.id"
        class="wallpaper-list-item"
      >
        <div class="overlay">
          <ControlButton
            :text="$t('wallpapers.choose')"
            type="secondary"
            @click="changeActiveWallpaper(wallpaper.id)"
          />
        </div>

        <Picture
          :picture="getWallpaperPicture(wallpaper)"
          :lqip="getWallpaperLqip(wallpaper)"
          :title="$t('wallpapers.chooseWallpaper')"
          aspect-ratio="2:3"
        />
      </li>
    </transition-group>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'

/** mixins **/
import downloadFile from '@/mixins/downloadFile'
import head from '@/mixins/head'

/** components **/
import IconHelmet from '@/components/icons/Helmet'
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import DarwinText from '@/components/atoms/Text'
import ControlButton from '@/components/atoms/ControlButton'
import IconCaret from '@/components/icons/Caret'
import { preparePicture } from '@/utils/store'
// import ControlSelect from '@/components/atoms/ControlSelect'

export default {
  name: 'WallpapersPage',

  components: {
    IconCaret,
    ControlButton,
    /* ControlSelect, */ IconHelmet,
    DarwinText,
    Picture,
    Heading
  },

  mixins: [downloadFile, head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchWallpapers')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      activeWallpaper: {},
      selectedResolutionId: null
    }
  },

  computed: {
    selectedResolution() {
      return (
        this.wallpaperResolutionsList?.find(
          (resolution) => resolution.id === this.selectedResolutionId
        ) || {}
      )
    },

    wallpaperPreviewDimensions() {
      let height

      switch (this.deviceWidth) {
        case 'xs':
          height = (
            this.selectedResolution.height *
            (420 / this.selectedResolution.width)
          ).toFixed(0)
          break
        case 'sm':
          height = 420
          break
        case 'md':
          height = 480
          break
        case 'lg':
          height = 420
          break
        case 'xl':
          height = 500
          break
        case 'xxl':
        default:
          height = 580
      }

      const width =
        height === 'auto'
          ? 420
          : (
              this.selectedResolution.width *
              (height / this.selectedResolution.height)
            ).toFixed(0)

      return { width, height }
    },

    activeWallpaperPreview() {
      if (!this.activeWallpaper || !this.activeWallpaper.image) {
        return null
      }

      const resizedImage = preparePicture(
        this.activeWallpaper?.sanityImage,
        '',
        '',
        this.wallpaperPreviewDimensions.width,
        this.wallpaperPreviewDimensions.height
      )

      return resizedImage.url
    },

    filteredWallpaperList() {
      // hide active
      return this.activeWallpaper
        ? this.wallpapersList.filter(
            (wallpaper) => wallpaper.id !== this.activeWallpaper.id
          )
        : this.wallpapersList
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    metaData() {
      return {
        title: this.$t('pages.wallpapers'),
        description: this.$t('pageDescriptions.wallpapers'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState([
      'deviceWidth',
      'wallpapersList',
      'wallpaperResolutionsList',
      'settings'
    ])
  },

  mounted() {
    // TODO: use optional chaining
    this.activeWallpaper =
      this.wallpapersList &&
      this.wallpapersList.length &&
      this.wallpapersList[0]

    // TODO: select depend on screen resolution
    // TODO: use optional chaining
    this.selectedResolutionId =
      this.wallpaperResolutionsList?.length &&
      this.wallpaperResolutionsList[0].id
  },

  methods: {
    changeSelectedResolution(event) {
      this.selectedResolutionId = event.target.value
    },

    changeActiveWallpaper(wallpaperId) {
      this.activeWallpaper = {}

      this.$nextTick(() => {
        this.activeWallpaper = this.wallpapersList.find(
          (wallpaper) => wallpaper.id === wallpaperId
        )

        if (this.deviceWidth !== 'xs') {
          // VueScrollTo.scrollTo('body')
        } else {
          const activeWallpaperContainer = document?.getElementById(
            'active_wallpaper_container'
          )

          if (activeWallpaperContainer) {
            VueScrollTo.scrollTo(activeWallpaperContainer)
          }
        }
      })
    },

    getWallpaperPicture(wallpaper) {
      if (!wallpaper || !wallpaper.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof wallpaper.image)) {
        // flat picture fallback
        return wallpaper.image
      } else if (typeof wallpaper.image === 'object') {
        const picture = []
        const separator = wallpaper.image.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: wallpaper.image.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: wallpaper.image.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: wallpaper.image.url + separator + 'w=356'
              },
              {
                density: '2x',
                src: wallpaper.image.url + separator + 'w=712'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: wallpaper.image.url + separator + 'w=468'
              },
              {
                density: '2x',
                src: wallpaper.image.url + separator + 'w=936'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: wallpaper.image.url + separator + 'w=558'
              },
              {
                density: '2x',
                src: wallpaper.image.url + separator + 'w=1116'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: wallpaper.image.url + separator + 'w=648'
              },
              {
                density: '2x',
                src: wallpaper.image.url + separator + 'w=1296'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    getWallpaperLqip(wallpaper) {
      if (!wallpaper || !wallpaper.image) {
        return null
      }

      return wallpaper.image.lqip
    },

    async downloadActiveWallpaperHandler() {
      if (this.selectedResolution) {
        // eslint-disable-next-line no-unused-expressions
        this.$nuxt?.$loading?.start()

        // TODO: use main image to identify extension
        const fileExtension = this.activeWallpaper?.image?.url
          ?.split('.')
          .slice(-1)

        const resizedImage = preparePicture(
          this.activeWallpaper?.sanityImage,
          '',
          '',
          this.selectedResolution?.width,
          this.selectedResolution?.height
        )

        await this.downloadFile({
          name:
            this.activeWallpaper.name +
            ' ' +
            this.selectedResolution.title +
            '.' +
            fileExtension,
          link: resizedImage.url
        })

        // eslint-disable-next-line no-unused-expressions
        this.$nuxt?.$loading?.finish()
      } else {
        console.warn("resolution wasn't selected")
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';
@import './assets/styles/shadows.scss';

.active-wallpaper-container {
  @include shadow;

  position: relative;
  background: $gray-880;
}

.active-wallpaper-wrap {
  background: url('./wallpaper-background.svg');
}

.wallpaper-actions-wrap {
  padding: 24px 24px 24px 0;
}

.pilot-wrap {
  margin-top: 4px;
  color: $gray-300;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 8px;
    height: 20px;
    width: 20px;
  }
}

.resolution-select-wrap {
  display: flex;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    pointer-events: none;
    right: 12px;
  }

  .text {
    position: absolute;
    pointer-events: none;
    right: 40px;
  }
}

.resolution-select {
  width: 100%;
  height: 48px;
  background: transparent;
  cursor: pointer;
  color: $white;
  border: 1px solid $white015;
  padding: 0 96px 0 16px;
  text-overflow: ellipsis;
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;

  option {
    color: $gray-900;
  }
}

.wallpaper-list-item {
  @include shadow;

  position: relative;
  overflow: hidden;

  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    transition: all 150ms linear;

    &:before {
      position: absolute;
      content: '';
      background: $gray-900;
      opacity: 0.6;
      height: 100%;
      width: 100%;
    }
  }

  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  /* > * {
    transition: all 600ms ease-out;
  }

  &:hover {
    > * {
      transform: scale(1.05);
    }
  } */
}

.download-button {
  margin-top: 24px;
  width: 100%;
}

.wallpaper-list {
  margin-top: 56px;
}

.wallpaper-list {
  margin-bottom: -18px;
}

.wallpaper-list-item {
  margin-bottom: 18px;
}

@media (max-width: $sm-breakpoint) {
  .resolution-select-wrap {
    margin-top: 32px;
  }
}

@media (min-width: $sm-breakpoint) {
  .wallpaper-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  .wallpaper-name-wrap {
    grid-column: 1/2;
  }

  .wallpaper-list-item {
    grid-column: span 6;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .wallpaper-actions-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 18px;
  }

  .resolution-select-wrap,
  .download-button {
    grid-row: 2;
    margin-top: 32px;
    width: 100%;
  }
}

@media (max-width: $md-breakpoint) {
  .active-wallpaper-container {
    margin-top: 32px;
  }

  .wallpaper-actions-wrap {
    padding: 12px 24px 24px;
  }

  .wallpaper-list {
    grid-column-gap: 18px;
  }
}

@media (min-width: $md-breakpoint) {
  .active-wallpaper-container {
    margin-top: 56px;
  }

  .wallpaper-list {
    margin-top: 56px;
    grid-column-gap: 24px;
  }

  .download-button {
    margin-top: 24px;
    width: 100%;
  }

  .wallpaper-list {
    margin-bottom: -24px;
  }

  .wallpaper-list-item {
    // grid-column: span 6;
    margin-bottom: 24px;
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .wallpaper-actions-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
    padding-left: 24px;
  }

  .download-button {
    grid-column: 2/3;
  }
}

@media (min-width: $lg-breakpoint) {
  .active-wallpaper-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 24px;
  }

  .active-wallpaper-wrap {
    grid-column: 1/9;
  }

  .resolution-select-wrap {
    margin-top: 78px;
  }

  .wallpaper-actions-wrap {
    grid-column: 9/13;
    margin-left: 0;
  }
}

@media (min-width: $xl-breakpoint) {
  .resolution-select-wrap {
    margin-top: 118px;
  }
}

@media (min-width: $xxl-breakpoint) {
  .resolution-select-wrap {
    margin-top: 158px;
  }
}
</style>
