<template>
  <NLink
    :to="
      localePath({
        name: raceRouteName,
        params: {
          year: new Date(featuredRace.datetime).getFullYear(),
          slug: featuredRace.slug
        }
      })
    "
    class="link"
  >
    <div v-if="featuredRace.mode === 'future'" class="grid-container">
      <div class="title-wrap">
        <DarwinText
          :text="$t('featuredWeekend.upNext').toUpperCase()"
          family="oswald"
          size="tiny"
          class="race-mode"
        />

        <div class="name-details-wrap">
          <Heading :text="featuredRace.name" size="h4" />
        </div>
      </div>

      <div class="schedule-wrap">
        <DateCountdown :deadline="deadline" :dark="true" />
      </div>

      <div class="details-wrap">
        <div class="details-item">
          <IconMapPin />
          <DarwinText :text="featuredRace.place" size="tiny" />
        </div>

        <div class="details-item">
          <IconCalendar />
          <DarwinText :text="raceDate" size="tiny" />
        </div>

        <div class="details-item">
          <IconClock />
          <DarwinText :text="raceTimeString" size="tiny" />
        </div>
      </div>
    </div>

    <div v-else class="grid-container">
      <div class="title-wrap current-title-wrap">
        <DarwinText
          v-if="featuredRace.mode === 'current'"
          :text="$t('featuredWeekend.now').toUpperCase()"
          family="oswald"
          size="tiny"
          class="race-mode"
        />

        <div class="name-details-wrap">
          <Heading :text="featuredRace.name" size="h4" />

          <div class="details-link">
            <DarwinText
              :text="$t('featuredWeekend.details').toUpperCase()"
              size="small"
            />
            <IconArrow />
          </div>
        </div>
      </div>

      <div class="schedule-wrap detailed-schedule-wrap">
        <DarwinText
          :text="$t('featuredWeekend.weekendSchedule').toUpperCase()"
          family="oswald"
          size="tiny"
        />
        <ul class="schedule-list">
          <li
            v-for="(scheduleItem, index) in featuredRace.schedule"
            :key="scheduleItem.id"
            class="schedule-item"
          >
            <DarwinText :text="scheduleItem.name" weight="bold" />

            <DarwinText
              :text="
                `${formatDatetime(scheduleItem.datetime)}${
                  index === 0 ? '*' : ''
                }`
              "
            />
          </li>
        </ul>

        <DarwinText :text="yourLocalTime" size="tiny" class="local-time" />
      </div>

      <div class="details-wrap pilot-list-wrap">
        <DarwinText
          :text="$t('featuredWeekend.pilots').toUpperCase()"
          family="oswald"
          size="tiny"
        />

        <ul class="pilot-list">
          <li
            v-for="pilot in cumulativePilotList"
            :key="pilot.id"
            class="pilot-item"
          >
            <Avatar :image="pilot.image" />
            <DarwinText :text="pilot && pilot.name" />
          </li>
        </ul>
      </div>
    </div>
  </NLink>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

import { routeNamesList } from '@/utils/routes'

import DateCountdown from '@/components/atoms/DateCountdown'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import IconMapPin from '@/components/icons/MapPin'
import IconCalendar from '@/components/icons/Calendar'
import IconClock from '@/components/icons/Clock'
import IconArrow from '@/components/icons/Arrow'
import Avatar from '@/components/atoms/Avatar'

/**
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'FeaturedWeekend',

  components: {
    Avatar,
    IconArrow,
    IconClock,
    IconCalendar,
    IconMapPin,
    DarwinText,
    Heading,
    DateCountdown
  },

  data() {
    return {
      raceRouteName: routeNamesList.race
    }
  },

  computed: {
    deadline() {
      const dateTime = this.featuredRace
        ? this.featuredRace.datetime.split('T')
        : []

      return dateTime[0]
    },

    raceDate() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      return dayjs(this.featuredRace.datetime).format('DD MMM YYYY')
    },

    raceTime() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      return dayjs(this.featuredRace.datetime).format('hh:mm A')
    },

    raceTimeString() {
      return `${this.raceTime} (${this.$t('featuredWeekend.localTime')})`
    },

    yourLocalTime() {
      return `* ${this.$t('featuredWeekend.localTime')}`
    },

    cumulativePilotList() {
      const pilotList = []

      // eslint-disable-next-line no-unused-expressions
      this.featuredRace.schedule?.forEach((race) => {
        // eslint-disable-next-line no-unused-expressions
        race.pilotList?.forEach((pilot) => {
          const exists = pilotList.find((p) => p.id === pilot.id)
          if (!exists) {
            pilotList.push(pilot)
          }
        })
      })

      return pilotList
    },

    ...mapState(['locale', 'deviceWidth', 'featuredRace'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  },

  methods: {
    formatDatetime(datetime) {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      const date = dayjs(datetime).format('dddd, DD MMM')
      const time = dayjs(datetime).format('hh:mm A')
      return `${date}, ${time}`
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.link:hover {
  text-decoration: none;
}

.grid-container {
  position: relative;
  color: $gray-900;
}

.details-item {
  display: flex;
  align-items: center;

  .text {
    margin-left: 8px;
  }

  & + & {
    margin-top: 16px;
  }
}

.title-wrap {
  display: flex;
  flex-direction: column;

  .text {
    white-space: nowrap;
  }
}

.race-mode {
  margin-bottom: 4px;
}

.details-link {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  color: $orange-500;
}

.schedule-list,
.local-time {
  width: 100%;
  margin-top: 8px;
}

.schedule-item {
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pilot-list {
  margin-top: 12px;
}

.pilot-item {
  display: flex;
  align-items: center;
  gap: 16px;

  + .pilot-item {
    margin-top: 12px;
  }
}

@media (max-width: $sm-breakpoint) {
  .schedule-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .pilot-item {
    width: 100%;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .pilot-item {
    width: calc(50% - 9px);
  }
}

@media (max-width: $md-breakpoint) {
  .grid-container {
    margin-top: 18px;
  }

  .title-wrap {
    background: $gray-050;
    padding: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .schedule-wrap {
    background: $gray-050;
    padding: 0 16px 16px;

    &.detailed-schedule-wrap {
      padding: 16px;
    }
  }

  .details-link {
    margin-top: 8px;
  }

  .details-wrap {
    background: $gray-100;
    padding: 16px 16px 17px;
    border-bottom: 3px solid $orange-500;
  }

  .pilot-list {
    display: flex;
    column-gap: 18px;
    flex-wrap: wrap;
  }
}

@media (min-width: $md-breakpoint) {
  .grid-container {
    margin-top: -16px;
    background: $gray-050;
    border-bottom: 3px solid $orange-500;
    z-index: 20;
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .grid-container {
    // height: 210px;
  }

  .title-wrap {
    position: relative;
    grid-column: 1/13;
    display: flex;
    flex-direction: row;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .race-mode {
      margin-top: 6px;
    }

    .name-details-wrap {
      padding-left: 16px;
    }

    .details-link {
      margin-top: 8px;
    }
  }

  .schedule-wrap {
    grid-column: 1/9;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    &.detailed-schedule-wrap {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin: 0;
      padding: 20px 24px 21px;
    }
  }

  .details-wrap {
    position: relative;
    grid-column: 9/13;
    background: $gray-100;
    padding: 23px 24px;
    margin-left: -24px;

    &.pilot-list-wrap {
      padding: 20px 24px 21px;
    }

    &:before {
      position: absolute;
      content: '';
      width: 1px;
      height: calc(100% - 24px - 24px + 3px);
      background: rgba(0, 0, 0, 0.1);
      top: 24px;
      left: -1px;
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .grid-container {
    min-height: 142px;
  }

  .title-wrap {
    position: relative;
    grid-column: 1/4;
    padding: 20px 24px 21px;
    margin-right: -24px;

    * + .heading {
      margin-top: 4px;
    }

    .heading {
      max-height: 72px;
      margin-bottom: 24px;
      overflow: hidden;
    }

    &:after {
      position: absolute;
      content: '';
      width: 1px;
      height: calc(100% - 24px - 24px + 3px);
      background: rgba(0, 0, 0, 0.1);
      top: 24px;
      right: -1px;
    }
  }

  .name-details-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .schedule-wrap {
    grid-column: 4/10;
    display: flex;
    justify-content: center;
    margin-top: 16px;

    &.detailed-schedule-wrap {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin: 0;
      padding: 20px 24px 21px;
    }
  }

  .schedule-list,
  .local-time {
    width: 100%;
    margin-top: 8px;
  }

  .schedule-item {
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .details-wrap {
    padding: 24px 24px 21px;
    position: relative;
    grid-column: 10/13;
    background: $gray-100;
    margin-left: -24px;

    &.pilot-list-wrap {
      padding: 20px 24px 21px;
    }

    &:before {
      position: absolute;
      content: '';
      width: 1px;
      height: calc(100% - 24px - 24px + 3px);
      background: rgba(0, 0, 0, 0.1);
      top: 24px;
      left: -1px;
    }
  }

  .pilot-list {
    margin-top: 12px;
  }

  .pilot-item {
    display: flex;
    align-items: center;
    gap: 16px;

    + .pilot-item {
      margin-top: 12px;
    }
  }
}
</style>
