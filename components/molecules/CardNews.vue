<template>
  <div class="card-wrap">
    <NLink v-bind="linkProps" class="card-link">
      <div class="card-picture-wrap">
        <Picture
          v-if="data.type === 'post' && cardPicture"
          :picture="cardPicture"
          :lqip="data.picture ? data.picture.lqip : null"
          aspect-ratio="2:3"
          class="card-picture"
        />

        <div v-else class="gallery-picture-list">
          <Picture
            v-for="item in data.gallery"
            :key="item.id"
            :picture="getGalleryPicture(item)"
            :lqip="item ? item.lqip : null"
            :aspect-ratio="galleryItemAspectRatio"
            class="card-gallery-picture"
          />
        </div>
      </div>

      <!--<darwin-date :date="data.date" class="card-date" />-->
      <div class="details-wrap">
        <DarwinHeading :text="data.title" size="h5" />

        <Badge :text="badgeText" />

        <DarwinText :text="moreText" size="tiny" class="more" />
      </div>
    </NLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import Picture from '@/components/atoms/Picture'
// import DarwinDate from '@/components/atoms/Date'
import DarwinHeading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import Badge from '@/components/atoms/Badge'

/**
 * This is a reusable news card component.
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardNews',

  components: {
    Badge,
    DarwinText,
    Picture,
    // DarwinDate,
    DarwinHeading
  },

  props: {
    /**
     * All the card data
     */
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    linkProps() {
      return {
        to: this.localePath({
          name:
            this.data.type === 'gallery'
              ? routeNamesList.galleryPost
              : routeNamesList.newsPost,
          params: {
            slug: this.data.slug,
            year: new Date(this.data.date).getFullYear()
          }
        })
      }
    },

    cardPicture() {
      if (!this.data || !this.data.picture) {
        return false
      }

      if (['string', 'undefined'].includes(typeof this.data.picture)) {
        // flat picture fallback
        return this.data.picture
      } else if (typeof this.data.picture === 'object') {
        const picture = []
        const separator = this.data.picture?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=466'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=932'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=374'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=748'
              }
            ]
          },
          {
            min_width: 768,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=510'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=1020'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=320'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=640'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=382'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=764'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.data.picture.url + separator + 'w=446'
              },
              {
                density: '2x',
                src: this.data.picture.url + separator + 'w=892'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    galleryItemAspectRatio() {
      // used to defile aspect-ratio
      // return this.data.gallery && this.data.gallery.length
      return ['xs', 'sm'].includes(this.deviceWidth) ? '2.16:1' : '2.1:1' //
    },

    badgeText() {
      if (this.data.type === 'gallery') {
        return this.$t('cardNews.galleryBadge')
      } else {
        return this.$t('cardNews.postBadge')
      }
    },

    moreText() {
      if (this.data.type === 'gallery') {
        return this.$t('cardNews.galleryMoreText')
      } else {
        return this.$t('cardNews.postMoreText')
      }
    },

    routeName() {
      if (this.data.type === 'gallery') {
        return this.$t('cardNews.galleryMoreText')
      } else {
        return this.$t('cardNews.postMoreText')
      }
    },

    ...mapState(['deviceWidth'])
  },

  methods: {
    getGalleryPicture(item) {
      if (['string', 'undefined'].includes(typeof item)) {
        // flat picture fallback
        return item
      } else if (typeof item === 'object') {
        const picture = []
        const separator = item.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              { density: '1x', src: item.url + separator + 'h=232' },
              { density: '2x', src: item.url + separator + 'h=464' }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              { density: '1x', src: item.url + separator + 'h=202' },
              { density: '2x', src: item.url + separator + 'h=404' }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              { density: '1x', src: item.url + separator + 'h=242' },
              { density: '2x', src: item.url + separator + 'h=484' }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              { density: '1x', src: item.url + separator + 'h=282' },
              { density: '2x', src: item.url + separator + 'h=564' }
            ]
          }
        )

        return picture
      }

      return null
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.card-wrap {
  @include shadow;

  transition: all 150ms ease-out;
  background: $gray-880;
}

.card-link {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-decoration: none;
  position: relative;

  &:hover {
    .card-picture-wrap {
      .card-picture {
        transform: scale(1.05);
      }
    }

    .more {
      color: $orange-500;

      &:after {
        transform-origin: left;
        transform: scaleX(1);
      }
    }
  }
}

.card-picture-wrap {
  overflow: hidden;
  height: 0;
  padding-bottom: 66.666%;

  .card-picture {
    transition: all 600ms ease-out;
  }
}

.details-wrap {
  padding: 16px 24px 24px;
}

.badge {
  margin-top: 16px;
  margin-bottom: 40px; // to position .more button absolutely
}

.more {
  // margin-top: 16px;
  // position: relative;
  position: absolute;
  bottom: 24px;
  padding-bottom: 2px;
  border-bottom: 2px solid $white;
  width: fit-content;
  transition: all 150ms linear;

  &:after {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: $orange-500;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-out;
  }
}

.gallery-picture-list {
  display: flex;
  justify-content: space-between;
  width: 100%;

  > * {
    width: calc(33.333%);
  }

  > * + * {
    margin-left: 8px;
  }
}

@media (min-width: $md-breakpoint) {
  .card-picture-wrap {
    max-height: 232px;
  }
}

@media (min-width: $lg-breakpoint) {
  .card-picture-wrap {
    max-height: 202px;
  }
}

@media (min-width: $xl-breakpoint) {
  .card-picture-wrap {
    max-height: 242px;
  }
}

@media (min-width: $xxl-breakpoint) {
  .card-picture-wrap {
    max-height: 282px;
  }
}
</style>
