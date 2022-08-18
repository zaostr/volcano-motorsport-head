<template>
  <div class="card-wrap">
    <NLink :to="linkProps" class="card-link">
      <div class="card-picture-wrap">
        <Picture
          v-if="cardPicture"
          :picture="cardPicture"
          :lqip="data.image ? data.image.lqip : null"
          aspect-ratio="1:1"
          class="card-picture"
        />

        <div class="separator" />
      </div>

      <div class="details-wrap">
        <DarwinText :text="data.name" size="superior" class="race-name" />

        <SerieDateBadge :serie="data.serie" :date="data.datetime" />
      </div>

      <div class="results-wrap">
        <DarwinText :text="resultsString" size="tiny" />
      </div>

      <div class="details-btn">
        <DarwinText
          :text="$t('cardPastRace.details')"
          family="oswald"
          size="micro"
        />
        <IconArrow />
      </div>

      <div class="details-link">
        <DarwinText
          :text="$t('cardPastRace.details')"
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
import IconArrow from '@/components/icons/Arrow'
import Picture from '@/components/atoms/Picture'
import DarwinText from '@/components/atoms/Text'
import SerieDateBadge from '@/components/molecules/SerieDateBadge'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardPastRace',

  components: {
    SerieDateBadge,
    IconArrow,
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
        picture.push({
          min_width: 320,
          srcset: [
            { density: '1x', src: this.data.image.url + separator + 'h=108' },
            { density: '2x', src: this.data.image.url + separator + 'h=216' }
          ]
        })

        return picture
      }

      return null
    },

    resultsString() {
      const resultList =
        (this.data &&
          this.data.results &&
          this.data.results
            .filter((r) => !r.isQualification)
            .map((r) => {
              let positionSuffix = ''
              switch (parseInt(r.position)) {
                case 1:
                  positionSuffix = this.$t('cardPastRace.numeralSuffix')[0]
                  break
                case 2:
                  positionSuffix = this.$t('cardPastRace.numeralSuffix')[1]
                  break
                case 3:
                  positionSuffix = this.$t('cardPastRace.numeralSuffix')[2]
                  break
                default:
                  positionSuffix = this.$t('cardPastRace.numeralSuffix')[2]
                  break
              }

              const pointsString = r.points
                ? ` (${r.points} ${
                    parseInt(r.points) > 1
                      ? this.$t('cardPastRace.points')
                      : this.$t('cardPastRace.point')
                  })`
                : ''

              return (
                `${r.position}${positionSuffix} ` +
                `${this.$t('cardPastRace.position')}` +
                pointsString
              )
            })) ||
        []

      return `${this.$t('cardPastRace.results')}:<br>` + resultList.join('<br>')
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.card-wrap {
  @include shadow;

  background: $gray-880;
}

.card-link {
  display: grid;
  width: 100%;
  text-decoration: none;

  &:hover {
    .details-btn {
      background: $orange-550;
    }
  }
}

.card-picture-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .separator {
    height: calc(100% - 48px);
    width: 1px;
    background: $white015;
  }
}

.card-picture {
  height: 108px;
  width: 108px;
}

.details-btn {
  background: $orange-500;
  transition: all 150ms linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    text-transform: uppercase;
  }

  .icon {
    margin-top: 8px;
  }
}

@media (max-width: $sm-breakpoint) {
  .results-wrap {
    grid-column: 1/13;
    padding-left: 24px;
    margin: 12px 0;
  }

  .details-wrap {
    grid-column: 1/13 !important;
    padding-right: 24px;

    &:after {
      display: none;
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .results-wrap {
    margin: 24px 0;
    grid-column: 9/13;
  }
}

@media (max-width: $md-breakpoint) {
  .card-link {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;

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

  .details-wrap {
    margin-top: 24px;
    grid-column: 1/9;
    position: relative;

    .serie-date-badge {
      margin-top: 12px;
    }

    &:after {
      position: absolute;
      content: '';
      height: 100%;
      width: 1px;
      background: $white015;
      right: 0;
      top: 0;
    }
  }

  .details-btn {
    display: none;
  }

  .details-link {
    margin: 12px 0 24px 24px;
    grid-column: 1/13;
  }

  .more {
    position: relative;
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
}

@media (min-width: $md-breakpoint) {
  .card-link {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 24px;
  }

  .details-wrap {
    margin: 24px 0;
    grid-column: 1/8;
    position: relative;

    .serie-date-badge {
      margin-top: 12px;
    }

    &:after {
      position: absolute;
      content: '';
      height: 100%;
      width: 1px;
      background: $white015;
      right: 0;
      top: 0;
    }
  }

  .results-wrap {
    margin: 24px 0;
    grid-column: 8/11;
  }

  .details-btn {
    grid-column: 11/13;
  }

  .details-link {
    display: none;
  }
}

@media (max-width: $lg-breakpoint) {
  .card-picture-wrap {
    display: none;
  }

  .details-wrap {
    padding-left: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  .card-picture-wrap {
    grid-column: 1/3;
  }

  .details-wrap {
    grid-column: 3/9;
  }

  .results-wrap {
    grid-column: 9/12;
  }

  .details-btn {
    grid-column: 12/13;
  }
}
</style>
