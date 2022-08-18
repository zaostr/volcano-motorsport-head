<template>
  <div class="card-wrap">
    <div v-if="data.isCurrent" class="now-mark">
      <Heading size="h5" :text="$t('cardUpcomingRace.now')" />
    </div>

    <NLink :to="linkProps" class="card-link">
      <div class="card-picture-wrap">
        <Picture
          v-if="cardPicture"
          :picture="cardPicture"
          :lqip="data.image ? data.image.lqip : null"
          aspect-ratio="2:3"
          class="card-picture"
        />
      </div>

      <div class="details-wrap">
        <SerieDateBadge :serie="data.serie" :date="data.datetime" />

        <Heading :text="data.name" size="h4" />

        <DarwinText
          :text="$t('cardUpcomingRace.readMore')"
          size="tiny"
          class="more"
        />
      </div>
    </NLink>
  </div>
</template>

<script>
/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import Picture from '@/components/atoms/Picture'
import DarwinText from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'
import SerieDateBadge from '@/components/molecules/SerieDateBadge'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardUpcomingRace',

  components: {
    SerieDateBadge,
    Heading,
    DarwinText,
    Picture
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      raceRouteName: routeNamesList.race
    }
  },

  computed: {
    linkProps() {
      return this.localePath({
        name: this.raceRouteName,
        params: {
          year: new Date(this.data.datetime).getFullYear(),
          slug: this.data.slug
        }
      })
    },

    cardPicture() {
      if (!this.data || !this.data.image) {
        return false
      }

      if (['string', 'undefined'].includes(typeof this.data.image)) {
        // flat picture fallback
        return this.data.image
      } else if (typeof this.data.image === 'object') {
        const picture = []
        const separator = this.data?.image?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=416' },
              { density: '2x', src: this.data.image.url + separator + 'w=832' }
            ]
          },
          {
            min_width: 480,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=326' },
              { density: '2x', src: this.data.image.url + separator + 'w=652' }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=440' },
              { density: '2x', src: this.data.image.url + separator + 'w=880' }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=536' },
              { density: '2x', src: this.data.image.url + separator + 'w=1072' }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=630' },
              { density: '2x', src: this.data.image.url + separator + 'w=1260' }
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
  // @include shadow;

  // background: $gray-880;
  border: 1px solid $white015;
  padding: 0 24px;
  position: relative;
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

  .card-picture {
    transition: all 600ms ease-out;
  }
}

.details-wrap {
  padding: 20px 0 24px;
}

.heading {
  margin-top: 12px;
  margin-bottom: 40px; // to position .more link absolutely
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

.now-mark {
  position: absolute;
  top: 28px;
  right: 0;
  background: $orange-500;
  color: $white;
  z-index: 10;
  padding: 7px 20px;
  pointer-events: none;

  .heading {
    margin: 0;
  }
}
</style>
