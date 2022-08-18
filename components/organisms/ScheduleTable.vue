<template>
  <div class="schedule-table">
    <div class="row __heading">
      <div class="col">
        <DarwinText
          :text="$t('scheduleTable.event')"
          family="oswald"
          size="tiny"
        />
      </div>
      <div class="col">
        <DarwinText
          :text="$t('scheduleTable.day')"
          family="oswald"
          size="tiny"
        />
      </div>
      <div class="col">
        <DarwinText
          :text="$t('scheduleTable.localTime')"
          family="oswald"
          size="tiny"
        />
      </div>
      <div class="col">
        <DarwinText
          :text="$t('scheduleTable.pilot')"
          family="oswald"
          size="tiny"
        />
      </div>
    </div>

    <div v-for="(row, index) in itemList" :key="row.id || index" class="row">
      <div class="col">
        <DarwinText :text="row.name" weight="bold" />
      </div>
      <div class="col">
        <DarwinText :text="getFormattedDay(row.datetime)" />

        <DarwinText
          :text="`${getFormattedTime(row.datetime)}${index === 0 ? '*' : ''}`"
          class="time"
        />
      </div>
      <div class="col">
        <DarwinText :text="getFormattedTime(row.datetime)" />
      </div>
      <div class="col pilot-col">
        <NLink
          v-for="pilot in row.pilotList"
          :key="pilot.id"
          :to="
            localePath({
              name: pilotRouteName,
              params: { slug: pilot && pilot.slug }
            })
          "
        >
          <Avatar :image="pilot.image" />
          <DarwinText :text="pilot && pilot.name" />
        </NLink>
      </div>
    </div>

    <DarwinText
      :text="`* ${$t('scheduleTable.localTime')}`"
      size="tiny"
      class="local-time"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import DarwinText from '@/components/atoms/Text'
import Avatar from '@/components/atoms/Avatar'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'ScheduleTable',

  components: { Avatar, DarwinText },

  props: {
    itemList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pilotRouteName: routeNamesList.pilot
    }
  },

  computed: {
    ...mapState(['locale'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  },

  methods: {
    getFormattedDay(datetime) {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }

      return dayjs(datetime).format('dddd, DD\xA0MMM')
    },

    getFormattedTime(datetime) {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }

      return dayjs(datetime).format('hh:mm A')
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.row {
  display: flex;
  align-items: center;

  .col {
    height: 100%;

    > * {
      display: flex;
      align-items: center;
    }

    * + .time {
      margin-left: 25px;
      position: relative;
      display: flex;
      align-items: center;

      &:before {
        position: absolute;
        content: '';
        left: -13px;
        height: 24px;
        width: 1px;
        background: $white015;
      }
    }
  }

  &.__heading {
    padding-bottom: 12px;

    .col {
      text-transform: uppercase;
      text-align: center;
      align-items: flex-start;
    }
  }

  &:not(.__heading) {
    min-height: 72px;
    border: 1px solid $white015;

    .col:nth-child(1) {
      background: $gray-050;
      margin: -1px 0 -1px;
      color: $gray-900;
    }

    & + & {
      margin-top: 8px;
    }
  }

  .pilot-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 12px;
    padding: 10px 12px 10px 0;

    a div + div {
      margin-left: 16px;
    }
  }
}

.local-time {
  display: none;
}

@media (max-width: $sm-breakpoint) {
  .row {
    display: flex;
    flex-direction: column;

    .col {
      width: 100%;

      &:nth-child(2) {
        padding: 12px 16px;
        display: flex;
        background: $gray-880;
      }

      &:nth-child(4) {
        padding: 16px;
      }
    }
  }
}

@media (min-width: $sm-breakpoint) {
  .row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;

    &:not(.__heading) {
      .col:nth-child(4) {
        justify-content: flex-start;
        padding-left: 0;
      }
    }
  }

  .col {
    display: flex;
    align-items: center;

    &:nth-child(1) {
      grid-column: 1/13;
    }

    &:nth-child(2) {
      grid-column: 1/7;
      background: $gray-880;
    }

    &:nth-child(4) {
      grid-column: 7/13;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .row {
    &.__heading {
      display: none;
    }
  }

  .col {
    &:nth-child(1) {
      padding: 12px 16px;
    }

    &:nth-child(2) {
      padding: 24px 16px;
    }

    &:nth-child(3) {
      display: none;
    }
  }

  .local-time {
    display: block;
    margin-top: 8px;
    text-transform: lowercase;
  }
}

@media (min-width: $md-breakpoint) {
  .row {
    grid-column-gap: 24px;

    &.__heading {
      display: grid;

      .col {
        background: none;
      }
    }
  }

  .col {
    justify-content: center;

    &:nth-child(1) {
      grid-column: 1/4;
    }

    &:nth-child(2) {
      grid-column: 4/6;
      background: $gray-880;
    }

    &:nth-child(3) {
      grid-column: 6/8;
      background: $gray-880;
    }

    &:nth-child(4) {
      grid-column: 8/13;
    }

    .time {
      display: none !important;
    }
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .row:not(.__heading) {
    .col {
      &:nth-child(2) {
        padding: 8px;
        text-align: center;
      }
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .row {
    grid-template-columns: repeat(8, 1fr);
  }

  .col {
    &:nth-child(1) {
      grid-column: 1/3;
    }

    &:nth-child(2) {
      grid-column: 3/5;
    }

    &:nth-child(3) {
      grid-column: 5/7;
    }

    &:nth-child(4) {
      grid-column: 7/11;
    }
  }
}
</style>
