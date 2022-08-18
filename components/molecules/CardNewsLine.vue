<template>
  <div class="card-wrap">
    <NLink v-bind="linkProps" class="card-link">
      <div class="card-picture-wrap">
        <Picture
          :picture="cardPicture"
          :lqip="data.picture ? data.picture.lqip : null"
          aspect-ratio="1:1"
          class="card-picture"
        />
      </div>

      <div class="details-wrap">
        <DarwinHeading :text="data.title" size="h5" />

        <Badge :text="badgeText" />

        <DarwinText :text="moreText" size="tiny" class="more" />
      </div>
    </NLink>
  </div>
</template>

<script>
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
  name: 'CardNewsLine',

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
        picture.push({
          min_width: 320,
          srcset: [
            { density: '1x', src: this.data.picture.url + separator + 'h=104' },
            { density: '2x', src: this.data.picture.url + separator + 'h=208' }
          ]
        })

        return picture
      }

      return null
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
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.card-wrap {
  transition: all 150ms ease-out;

  & + & {
    margin-top: 24px;
  }
}

.card-link {
  width: 100%;
  display: flex;
  text-decoration: none;
  padding-bottom: 24px;
  border-bottom: 1px solid $white015;
  position: relative;

  &:hover {
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
  height: 104px;
  width: 104px;
}

.badge {
  margin-top: 16px;
}

.more {
  margin-top: 16px;
  padding-bottom: 2px;
  border-bottom: 2px solid $white;
  width: fit-content;
  transition: all 150ms linear;
  position: relative;

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

@media (max-width: $md-breakpoint) {
  .card-picture-wrap {
    display: none;
  }

  .more {
    position: absolute;
    bottom: 24px;
    right: 0;
  }
}

@media (min-width: $md-breakpoint) {
  .details-wrap {
    margin-left: 24px;
  }
}
</style>
