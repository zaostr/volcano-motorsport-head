<template>
  <div class="card-crew-member">
    <div class="picture-name-position">
      <Picture
        :picture="picture"
        :lqip="data.image ? data.image.lqip : null"
        aspect-ratio="1:1"
      />

      <div class="name-position">
        <Heading :text="data.name" weight="bold" size="h5" />

        <DarwinText :text="data.position" size="tiny" class="position" />
      </div>
    </div>

    <div class="details-wrap">
      <ul class="quality-list">
        <li
          v-for="(quality, index) in data.qualities"
          :key="index"
          class="quality-item"
        >
          <Rating :value="parseInt(quality.value)" />
          <DarwinText :text="quality.name" />
        </li>
      </ul>

      <DarwinText :text="crewMemberDurationString" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

import Picture from '@/components/atoms/Picture'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import Rating from '@/components/atoms/Rating'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'CardCrewMember',

  components: { Rating, DarwinText, Heading, Picture },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    picture() {
      if (!this.data || !this.data.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.data.image)) {
        // flat picture fallback
        return this.data.image
      } else if (typeof this.data.image === 'object') {
        const picture = []
        const separator = this.data.image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            {
              density: '1x',
              src: this.data.image.url + separator + 'w=104'
            },
            {
              density: '2x',
              src: this.data.image.url + separator + 'w=208'
            }
          ]
        })

        return picture
      }

      return null
    },

    crewMemberDurationString() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      const now = dayjs()
      // const joinDate = dayjs(this.data.joining_date)
      const years = now.diff(this.data.joining_date, 'year')
      let months = now.diff(this.data.joining_date, 'month')
      let days = now.diff(this.data.joining_date, 'day')

      let joiningMonths = this.data.joining_date
      if (years) {
        // months without years
        joiningMonths = dayjs(this.data.joining_date).add(years, 'year')
        months = now.diff(joiningMonths, 'month')
      }

      if (years || months) {
        // days without years and months
        const joiningDays = dayjs(joiningMonths).add(months, 'month')
        days = now.diff(joiningDays, 'day')
      }

      const stringChunks = []

      if (years > 1) {
        stringChunks.push(`${years}&nbsp;${this.$t('cardCrewMember.years')}`)
      } else if (years === 1) {
        stringChunks.push(`${years}&nbsp;${this.$t('cardCrewMember.year')}`)
      }

      if (months > 1) {
        stringChunks.push(`${months}&nbsp;${this.$t('cardCrewMember.months')}`)
      } else if (months === 1) {
        stringChunks.push(`${months}&nbsp;${this.$t('cardCrewMember.month')}`)
      }

      if (days > 1) {
        stringChunks.push(`${days}&nbsp;${this.$t('cardCrewMember.days')}`)
      } else if (days === 1) {
        stringChunks.push(`${days}&nbsp;${this.$t('cardCrewMember.day')}`)
      }

      return (
        this.$t('cardCrewMember.crewMemberDuration') +
        ': ' +
        stringChunks.join('; ')
      )
    },

    ...mapState(['locale'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
@import './assets/styles/shadows';

.card-crew-member {
  @include shadow;

  border: 1px solid $white015;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.picture-container {
  height: 104px;
  width: 104px;
  min-height: 104px;
  min-width: 104px;
  border-radius: 50%;
  overflow: hidden;
}

.position {
  margin-top: 4px;
}

.details-wrap {
  // margin-top: auto;
}

.quality-list {
  margin: 16px 0;
}

.quality-item {
  display: flex;
  align-items: flex-start;

  .rating {
    margin-top: 6px;
  }

  .text {
    margin-left: 12px;
  }
}

@media (max-width: $md-breakpoint) {
  .picture-name-position {
    display: flex;
  }

  .name-position {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .quality-list {
    margin-top: 24px;
  }
}

@media (min-width: $md-breakpoint) {
  .heading {
    margin-top: 24px;
  }

  .picture-container {
    margin: 0 auto;
  }
}
</style>
