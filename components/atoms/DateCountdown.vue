<template>
  <client-only>
    <countdown
      ref="countdown"
      :time="time"
      :transform="transform"
      :auto-start="false"
      tag="div"
      class="date-countdown"
    >
      <template slot-scope="{ days, hours, minutes, seconds }">
        <div :class="{ __dark: dark }" class="item-wrap">
          <component
            :is="itemComponent"
            :size="itemSize"
            :weight="itemWeight"
            :text="days"
            class="number"
          />
          <DarwinText :text="daysLabel" class="label" />
        </div>

        <div :class="{ __dark: dark }" class="item-wrap">
          <component
            :is="itemComponent"
            :size="itemSize"
            :weight="itemWeight"
            :text="hours"
            class="number"
          />
          <DarwinText :text="hoursLabel" class="label" />
        </div>

        <div class="separator-wrap">
          <IconTimeSeparator @AnimControl="animControllerHandler" />
        </div>

        <div :class="{ __dark: dark }" class="item-wrap">
          <component
            :is="itemComponent"
            :size="itemSize"
            :weight="itemWeight"
            :text="minutes"
            class="number"
          />
          <DarwinText :text="minutesLabel" class="label" />
        </div>

        <div class="separator-wrap">
          <IconTimeSeparator @AnimControl="animControllerHandler" />
        </div>

        <div :class="{ __dark: dark }" class="item-wrap">
          <component
            :is="itemComponent"
            :size="itemSize"
            :weight="itemWeight"
            :text="seconds"
            class="number"
          />
          <DarwinText :text="secondsLabel" class="label" />
        </div>
      </template>
    </countdown>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import Countdown from '@chenfengyuan/vue-countdown'

import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import IconTimeSeparator from '@/components/icons/TimeSeparator'

export default {
  name: 'DateCountdown',

  components: {
    Countdown,
    Heading,
    DarwinText,
    IconTimeSeparator
  },

  props: {
    deadline: {
      type: String,
      default: '03-19-2120'
    },

    dark: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const nowDate = new Date()
    const deadlineDate = new Date(this.deadline)

    return {
      time: deadlineDate - nowDate > 0 ? deadlineDate - nowDate : 0,
      daysLabel: this.$t('countdown.days'),
      hoursLabel: this.$t('countdown.hours'),
      minutesLabel: this.$t('countdown.minutes'),
      secondsLabel: this.$t('countdown.seconds'),
      animControllerList: []
    }
  },

  computed: {
    itemComponent() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'DarwinText' : 'Heading'
    },

    itemSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'general' : 'h2'
    },

    itemWeight() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'bold' : 'bold'
    },

    ...mapState(['deviceWidth'])
  },

  methods: {
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        props[key] = value < 10 ? `0${value}` : value
      })

      return props
    },

    animControllerHandler(animController) {
      // when both animations loaded, then start both
      // console.log(performance.now(), animController)
      this.animControllerList.push(animController)
      if (this.animControllerList.length === 2) {
        this.$nextTick(() => {
          this.$refs.countdown.start()
          this.animControllerList.forEach((ac) => ac.play())
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.date-countdown {
  display: flex;
  flex-wrap: wrap;
  color: $gray-900;
}

@media (max-width: $md-breakpoint) {
  .separator-wrap {
    display: none;
  }

  .item-wrap {
    display: inline;
    padding: 4px 12px;
    background: $gray-050;

    > * {
      display: inline;
    }

    &.__dark {
      background: $gray-100;
    }
  }

  .date-countdown {
    margin-bottom: -4px;
  }

  .item-wrap {
    margin: 0 4px 4px 0;
  }
}

@media (min-width: $md-breakpoint) {
  .item-wrap {
    min-width: 88px; // To avoid width frictions
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-wrap + .item-wrap {
    margin-left: 24px;
  }

  .number {
    margin-bottom: 16px;
  }

  .label {
    position: relative;
  }

  .label:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 1px;
    background: $gray-900;
    top: -16px;
    left: 50%;
  }

  .separator-wrap {
    margin: 20px 0;
    height: 24px;
    width: 24px;
  }
}
</style>
