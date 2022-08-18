<template>
  <div class="card-pilot">
    <NLink v-bind="linkProps" class="card-link">
      <div class="card-picture-wrap">
        <Picture
          :picture="picture"
          :lqip="data.image ? data.image.lqip : null"
          aspect-ratio="2:3"
          class="card-picture"
        />
      </div>

      <div class="details-wrap">
        <IconHelmet />

        <div class="name-wrap">
          <Heading :text="data.name" size="h4" />
          <DarwinText
            :text="$t('cardPilot.viewProfile')"
            size="tiny"
            class="more"
          />
        </div>
      </div>
    </NLink>
  </div>
</template>

<script>
/** utils **/
import { routeNamesList } from '@/utils/routes'
import Picture from '@/components/atoms/Picture'
import IconHelmet from '@/components/icons/Helmet'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'

/** components **/

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardPilot',

  components: { DarwinText, Heading, IconHelmet, Picture },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      pilotRouteName: routeNamesList.pilot
    }
  },

  computed: {
    linkProps() {
      return {
        to: this.localePath({
          name: this.pilotRouteName,
          params: {
            slug: this.data.slug
          }
        })
      }
    },

    picture() {
      if (!this.data || !this.data.image) {
        return null
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
              {
                density: '1x',
                src: this.data.image.url + separator + 'w=466'
              },
              {
                density: '2x',
                src: this.data.image.url + separator + 'w=932'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.data.image.url + separator + 'w=376'
              },
              {
                density: '2x',
                src: this.data.image.url + separator + 'w=752'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.data.image.url + separator + 'w=492'
              },
              {
                density: '2x',
                src: this.data.image.url + separator + 'w=984'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.data.image.url + separator + 'w=586'
              },
              {
                density: '2x',
                src: this.data.image.url + separator + 'w=1172'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.data.image.url + separator + 'w=680'
              },
              {
                density: '2x',
                src: this.data.image.url + separator + 'w=1360'
              }
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

.card-pilot {
  @include shadow;

  background: $gray-880;
  padding-bottom: 32px; // to position .more button absolutely
  position: relative;
}

.card-link {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-decoration: none;

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

.details-wrap {
  display: flex;
  padding: 16px 24px 24px;

  .icon {
    margin: 1px 16px 0 0;
    height: 32px;
    width: 32px;
  }
}

.name-wrap {
  > * + * {
    margin-top: 8px;
  }
}
</style>
