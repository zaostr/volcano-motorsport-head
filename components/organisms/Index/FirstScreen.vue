<template>
  <div class="first-screen">
    <Video
      v-if="showVideo"
      :content="settings.index_video"
      :is-index="true"
      :aspect-ratio="aspectRatio"
      video-link-options="?showinfo=0&controls=0&rel=0&mute=1&autoplay=1&loop=1"
    />
    <Picture
      v-else
      :picture="indexImage"
      :lqip="settings.index_image.lqip"
      :aspect-ratio="aspectRatio"
    />

    <div class="grid-container">
      <div class="info-container">
        <Heading
          :text="companyData.slogan"
          size="superior"
          family="oswald"
          seo="h1"
        />

        <ControlButton
          :route-name="routeNamesList.team"
          :text="$t('index.readMore')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import Heading from '@/components/atoms/Heading'
import Video from '@/components/atoms/Video'
import Picture from '@/components/atoms/Picture'
import ControlButton from '@/components/atoms/ControlButton'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'FirstScreen',

  components: { Picture, ControlButton, Video, Heading },

  data() {
    return {
      routeNamesList
    }
  },

  computed: {
    aspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '1:1'
      } else if (this.deviceWidth === 'md') {
        return '2:3'
      } else {
        return '5:12'
      }
    },

    showVideo() {
      return !['xs', 'sm'].includes(this.deviceWidth)
    },

    indexImage() {
      if (!this.settings.index_image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.settings.index_image)) {
        // flat picture fallback
        return this.settings.index_image
      } else if (typeof this.settings.index_image === 'object') {
        const picture = []
        const separator = this.settings.index_image?.url?.includes('?')
          ? '&'
          : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.settings.index_image.url + separator + 'w=480'
              },
              {
                density: '2x',
                src: this.settings.index_image.url + separator + 'w=960'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.settings.index_image.url + separator + 'w=768'
              },
              {
                density: '2x',
                src: this.settings.index_image.url + separator + 'w=1536'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    ...mapState(['deviceWidth', 'settings', 'companyData'])
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.first-screen {
  position: relative;
  max-height: calc(100vh - 80px);
}

.video-container,
.image-container {
  pointer-events: none;
  position: relative;
  max-height: calc(100vh - 80px);

  &:before {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}

.grid-container {
  position: absolute;
  height: 100%;
  // width: 100%;
  top: 0;
  z-index: 10;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;

  > * + * {
    margin-top: 32px;
  }
}

@media (max-width: $md-breakpoint) {
  .info-container {
    position: absolute;
    padding: 0 18px;
  }
}

@media (min-width: $md-breakpoint) {
  $grid-width: 720px;

  .grid-container {
    left: calc((100% - #{$grid-width}) / 2);
  }
}

@media (min-width: $lg-breakpoint) {
  $grid-width: 960px;

  .grid-container {
    left: calc((100% - #{$grid-width}) / 2);
  }
}

@media (min-width: $xl-breakpoint) {
  $grid-width: 1140px;

  .grid-container {
    left: calc((100% - #{$grid-width}) / 2);
  }

  .info-container {
    grid-column: 3/11;
  }
}

@media (min-width: $xxl-breakpoint) {
  $grid-width: 1320px;

  .grid-container {
    left: calc((100% - #{$grid-width}) / 2);
  }
}
</style>
