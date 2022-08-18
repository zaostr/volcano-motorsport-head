<template>
  <div
    v-show="isValidaData"
    ref="season-progress-map"
    :class="{ __loaded: isLoaded }"
    class="season-progress-map"
  >
    <ul class="serie-filter">
      <li v-for="serie in seriesFilterList" :key="serie.name">
        <ControlButton
          size="small"
          :text="serie.name"
          :type="
            serie.name === selectedSerieFilter.name
              ? 'alternative'
              : 'secondary'
          "
          :disabled="serie.name === selectedSerieFilter.name"
          @click="setSerieFilter(serie)"
        />
      </li>
    </ul>

    <ul class="month-list">
      <li
        v-for="monthSegment in monthSegmentList"
        :key="monthSegment.name"
        class="month-item"
      >
        <DarwinText :text="monthSegment.name" family="oswald" size="tiny" />
      </li>
    </ul>
    <div
      v-if="monthSegmentList && monthSegmentList.length"
      class="day-list-wrap"
    >
      <div class="start-mark" />

      <ul class="day-list">
        <template v-for="monthSegment in monthSegmentList">
          <li
            v-for="(day, dayIndex) in monthSegment.dayList"
            :key="`${monthSegment.name}-${dayIndex}`"
            class="day-item"
          >
            <ul
              v-if="day.raceList && day.raceList.length"
              class="race-list-container"
            >
              <li
                v-for="(race, raceIndex) in day.raceList"
                ref="race-item-container-list"
                :key="
                  `${race}-${dayIndex}-${raceIndex}-${selectedSerieFilter.name}`
                "
                class="race-item-container"
              >
                <DarwinText :text="race.formattedDate" size="tiny" />
                <DarwinText :text="race.name" weight="bold" />
              </li>
            </ul>

            <IconPoint
              v-if="day && day.today"
              :title="$t('seasonProgressMap.today')"
            />
          </li>
        </template>
      </ul>

      <IconFinish class="icon-finish" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** components **/
import IconPoint from '@/components/icons/Point'
import DarwinText from '@/components/atoms/Text'
import IconFinish from '@/components/icons/Finish'
import ControlButton from '@/components/atoms/ControlButton'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'SeasonProgressMap',

  components: { IconFinish, DarwinText, IconPoint, ControlButton },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      currentYear: this.$route
        ? this.$route.params.year
        : new Date().getFullYear(),
      totalSeasonDays: 0,
      isLoaded: false,
      selectedSerieFilter: { name: 'All' }
    }
  },

  computed: {
    isValidaData() {
      if (this.data.start_month >= this.data.end_month) {
        console.warn('Start month is gt End month, skip progress map rendering')
        return false
      } else {
        return true
      }
    },

    monthSegmentList() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }

      const mothsSegmentList = []
      if (!this.isValidaData) {
        return []
      }

      let totalSeasonDays = 0
      for (
        let monthIndex = this.data.start_month;
        monthIndex <= this.data.end_month;
        monthIndex++
      ) {
        const firstMonthDay = dayjs(
          `${this.currentYear}-${
            monthIndex < 10 ? '0' + monthIndex : monthIndex
          }-01`
        )
        // days in this month
        const daysInMonth = firstMonthDay.daysInMonth()

        totalSeasonDays += daysInMonth

        const today = dayjs().format('YYYY-MM-DD')

        // prepare days array: { raceList: [ {name: '', year: '', slug:''} ], today }
        // TODO: move to separate function
        const dayList = []
        for (let dayIndex = 1; dayIndex <= daysInMonth; dayIndex++) {
          // if thisDay is today
          const thisDay = `${this.currentYear}-${
            monthIndex < 10 ? '0' + monthIndex : monthIndex
          }-${dayIndex < 10 ? '0' + dayIndex : dayIndex}`

          const dayObj = {}
          if (thisDay === today) {
            dayObj.today = true
          }

          // thisDay race list
          const raceList = this.dayRaceListMap[thisDay]
          if (raceList && raceList.length) {
            dayObj.raceList = raceList
          }

          dayList.push(dayObj)
        }

        mothsSegmentList.push({
          name: firstMonthDay.format('MMM'),
          dayList
        })
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalSeasonDays = totalSeasonDays

      return mothsSegmentList
    },

    dayRaceListMap() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }

      if (
        !this.data ||
        !this.filteredRaceList ||
        !this.filteredRaceList.length
      ) {
        return {}
      }

      const dayRaceListMap = {}

      this.filteredRaceList.forEach((race) => {
        const date = dayjs(race.datetime)
        const yearMonthDate = date.format('YYYY-MM-DD')

        if (!dayRaceListMap[yearMonthDate]) {
          // make day race array
          dayRaceListMap[yearMonthDate] = []
        }

        if (
          this.selectedSerieFilter.name === 'All' ||
          this.selectedSerieFilter.name === race?.serie
        ) {
          dayRaceListMap[yearMonthDate].push({
            formattedDate: date.format('DD MMM YYYY'),
            name: race.name,
            year: date.format('YYYY'),
            slug: race.slug
          })
        }
      })

      return dayRaceListMap
    },

    filteredRaceList() {
      if (this.selectedSerieFilter.name === 'All') {
        return this.data.racesList
      }

      return this.data.racesList.filter(
        (race) => this.selectedSerieFilter.name === race.serie
      )
    },

    seriesFilterList() {
      const seriesCollection = {}

      this.data.racesList.forEach((race) => {
        seriesCollection[race.serie] = {
          name: race.serie,
          priority: race.serie_filter_priority
        }
      })

      const result = Object.keys(seriesCollection).map(
        (serie) => seriesCollection[serie]
      )

      result.sort((a, b) => {
        return a.priority - b.priority
      })

      result.push({ name: 'All' })

      return result
    },

    ...mapState(['locale'])
  },

  watch: {
    deviceWidth(value) {
      if (!['xs', 'sm'].includes(value)) {
        // redraw map on device width change
        this.updateMapElementPositions()
      }
    },

    seriesFilterList(value) {
      this.selectedSerieFilter = value[0]
    }
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  },

  mounted() {
    this.setSerieFilter(this.seriesFilterList[0])
  },

  methods: {
    updateMapElementPositions() {
      this.isLoaded = false
      let raceElementList = this.$refs['race-item-container-list']

      if (raceElementList && raceElementList.length) {
        raceElementList = [...raceElementList].reverse()

        // used to correct component height
        let componentExtraHeight = 0

        const rectMinGap = 32
        let prevRaceEl = null

        raceElementList.forEach((currentRaceEl) => {
          const currentRaceDomRect = currentRaceEl.getBoundingClientRect()
          const prevRaceDomRect = prevRaceEl
            ? prevRaceEl.getBoundingClientRect()
            : null

          let newPaddingTopProp = 0
          if (prevRaceDomRect) {
            // check if rect overlapped
            if (this.isDomRectOverlapped(prevRaceDomRect, currentRaceDomRect)) {
              // 1. get height of prev one
              newPaddingTopProp = prevRaceDomRect.height + rectMinGap

              // 2. move thisRect bottom: prevHeight + 32px
              currentRaceEl.style.paddingTop = newPaddingTopProp + 'px'
            }
          }

          // 3. add height to the component if needed
          const elementExtraHeight =
            newPaddingTopProp + currentRaceDomRect.height
          if (componentExtraHeight < elementExtraHeight) {
            componentExtraHeight = elementExtraHeight
          }

          prevRaceEl = currentRaceEl
        })

        if (componentExtraHeight) {
          this.$refs['season-progress-map'].style.height =
            componentExtraHeight + 72 + 36 + 72 + 'px'
        }
      }

      this.isLoaded = true
    },

    isDomRectOverlapped(rect1, rect2) {
      const rectMinHorizontalGap = 32
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right + rectMinHorizontalGap ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      )
    },

    setSerieFilter(serie) {
      this.selectedSerieFilter = serie
      this.$nextTick(() => {
        this.updateMapElementPositions()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.season-progress-map {
  opacity: 0;
  transition: opacity 300ms linear;

  &.__loaded {
    opacity: 1;
  }
}

.serie-filter {
  display: flex;
  column-gap: 16px;
  justify-content: center;
  margin-bottom: 72px;
}

.month-list {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.month-item {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    text-transform: uppercase;
  }
}

.day-list-wrap {
  position: relative;

  .start-mark {
    position: absolute;
    width: 3px;
    height: 11px;
    background: $white;
    left: 0;
    top: -4px;
  }

  .icon-finish {
    position: absolute;
    right: 0;
    top: -7px;
  }
}

.day-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3px;
  background: $white;
}

.day-item {
  height: 1px;
  width: 1px;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    height: 45px;
    width: 45px;
    min-height: 45px;
    min-width: 45px;
  }
}

.race-list-container {
  position: absolute;
  height: 11px;
  width: 11px;
  background: $white;
}

.race-item-container {
  position: absolute;
  border: 1px solid $white015;
  border-top: none;
  border-right: none;
  padding: 0 0 16px 16px;
  width: 114px;
  margin-left: 5px;
  margin-top: 27px;
}
</style>
