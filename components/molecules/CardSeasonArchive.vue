<template>
  <div class="card-wrap">
    <NLink :to="linkProps" class="card-link">
      <Heading :text="data.year" size="h5" />

      <div class="card-picture-wrap">
        <Picture
          v-if="cardPicture"
          :picture="cardPicture"
          :lqip="data.image ? data.image.lqip : null"
          aspect-ratio="2:3"
          class="card-picture"
        />
      </div>

      <DarwinText
        :text="$t('cardSeasonArchive.show')"
        size="tiny"
        class="more"
      />
    </NLink>
  </div>
</template>

<script>
/** utils **/
import { routeNamesList } from '@/utils/routes'
import Picture from '@/components/atoms/Picture'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardSeasonArchive',

  components: { DarwinText, Heading, Picture },

  props: {
    data: {
      type: Object,
      default: () => {}
    },

    type: {
      type: String,
      default: 'season',
      validator: (val) => ['season', 'news'].includes(val)
    }
  },

  data() {
    return {
      seasonRouteName: routeNamesList.season,
      newsRouteName: routeNamesList.newsList
    }
  },

  computed: {
    routeName() {
      switch (this.type) {
        case 'season':
          return this.seasonRouteName
        case 'news':
          return this.newsRouteName
      }
      return this.seasonRouteName
    },

    linkProps() {
      return this.localePath({
        name: this.routeName,
        params: {
          year: this.data.year,
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
              { density: '1x', src: this.data.image.url + separator + 'w=382' },
              { density: '2x', src: this.data.image.url + separator + 'w=764' }
            ]
          },
          {
            min_width: 480,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=262' },
              { density: '2x', src: this.data.image.url + separator + 'w=524' }
            ]
          },
          {
            min_width: 768,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=168' },
              { density: '2x', src: this.data.image.url + separator + 'w=336' }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=214' },
              { density: '2x', src: this.data.image.url + separator + 'w=428' }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              { density: '1x', src: this.data.image.url + separator + 'w=262' },
              { density: '2x', src: this.data.image.url + separator + 'w=524' }
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

.card-link {
  width: 100%;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  padding: 23px 40px;

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
  margin-top: 24px;

  .card-picture {
    transition: all 600ms ease-out;
  }
}

.more {
  margin: 24px auto 0;
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
</style>
