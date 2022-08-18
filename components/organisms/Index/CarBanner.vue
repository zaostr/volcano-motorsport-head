<template>
  <div class="grid-container">
    <div class="banner-wrap">
      <Picture :picture="bannerPicture" :lqip="bannerLqip" aspect-ratio="2:3" />
    </div>

    <div v-if="bannerData" class="details-wrap">
      <Heading :text="bannerData.name" size="h3" seo="h4" />

      <DarwinText :text="bannerData.text" />

      <ControlButton
        :route-name="routeNamesList.cars"
        :text="$t('index.readMore')"
      />

      <Link
        :text="$t('index.downloadWallpaper')"
        :route-name="routeNamesList.wallpapers"
        type="secondary"
        size="tiny"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import Picture from '@/components/atoms/Picture'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import ControlButton from '@/components/atoms/ControlButton'
import Link from '@/components/atoms/Link'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CarBanner',

  components: { Link, ControlButton, DarwinText, Heading, Picture },

  data() {
    return {
      routeNamesList
    }
  },

  computed: {
    bannerData() {
      return this.settings && this.settings.index_banner
    },

    bannerPicture() {
      if (['string', 'undefined'].includes(this.bannerData?.image)) {
        // flat picture fallback
        return this.bannerData?.image
      } else if (typeof this.bannerData?.image === 'object') {
        const picture = []
        const separator = this.bannerData?.image?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.bannerData.image.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.bannerData.image.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.bannerData.image.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.bannerData.image.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.bannerData.image.url + separator + 'w=632'
              },
              {
                density: '2x',
                src: this.bannerData.image.url + separator + 'w=1264'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.bannerData.image.url + separator + 'w=752'
              },
              {
                density: '2x',
                src: this.bannerData.image.url + separator + 'w=1504'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.bannerData.image.url + separator + 'w=872'
              },
              {
                density: '2x',
                src: this.bannerData.image.url + separator + 'w=1744'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    bannerLqip() {
      return this.bannerData?.image?.lqip
    },

    ...mapState(['settings'])
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.grid-container {
  // @include shadow;

  // background: $gray-880;
}

.details-wrap {
  padding: 24px;

  .text {
    margin-top: 24px;
  }

  .control-group {
    margin-top: 24px;
    width: 100%;
  }

  .link {
    display: block;
    margin: 24px auto 0;
    width: fit-content;
    z-index: 10;
  }
}

@media (max-width: $sm-breakpoint) {
  .details-wrap {
    .control-group {
      margin-top: 32px;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .grid-container {
    margin-top: 96px;
  }

  .details-wrap {
    @include shadow;

    background: $gray-880;
  }

  .details-wrap {
    .link {
      margin-top: 24px;
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .details-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 18px;

    .heading {
      grid-column: 1/3;
    }

    .text {
      grid-column: 1/2;
      grid-row: 2/4;
    }

    .control-group,
    .link {
      grid-column: 2/3;
      grid-row: 2/3;
    }

    .link {
      margin-top: calc(24px + 48px + 24px);
    }
  }
}

@media (min-width: $md-breakpoint) {
  .grid-container {
    @include shadow;

    background: $gray-880;
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .grid-container {
    margin-top: 128px;
  }

  .details-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;

    .heading {
      grid-column: 1/3;
    }

    .text {
      grid-column: 1/2;
      grid-row: 2/4;
    }

    .control-group,
    .link {
      grid-column: 2/3;
      grid-row: 2/3;
    }

    .link {
      margin-top: calc(24px + 48px + 24px);
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .grid-container {
    margin-top: 128px;
  }

  .banner-wrap {
    grid-column: 1/9;
  }

  .details-wrap {
    grid-column: 9/13;
    padding-left: 0;

    .control-group {
      margin-top: 32px;
    }
  }
}
</style>
