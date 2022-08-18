<template>
  <div class="results-table">
    <template v-if="qualificationRowList && qualificationRowList.length">
      <div class="row __heading">
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.event')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.pilot')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.position')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.time')"
            family="oswald"
            size="tiny"
          />
        </div>
      </div>

      <div
        v-for="(row, index) in qualificationRowList"
        :key="row.id || index"
        class="row"
      >
        <div class="col">
          <DarwinText :text="row.name" weight="bold" />
        </div>

        <template v-if="deviceWidth !== 'xs'">
          <div class="col pilot-col">
            <NLink
              v-for="pr in row.pilotResultsList"
              :key="pr.id"
              :to="
                localePath({
                  name: pilotRouteName,
                  params: { slug: pr.pilot && pr.pilot.slug }
                })
              "
            >
              <Avatar :image="pr.pilot.image" />
              <DarwinText :text="pr.pilot && pr.pilot.name" />
            </NLink>
          </div>

          <template v-if="deviceWidth !== 'sm'">
            <div class="col result-col">
              <DarwinText
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                :text="pr.position"
              />
            </div>
            <div class="col result-col">
              <DarwinText
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                :text="pr.time"
              />
            </div>
          </template>
          <template v-else>
            <div class="col result-col">
              <div
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                class="pilot-result-cell"
              >
                <DarwinText
                  :text="`${$t('resultsTable.positionLong')}: ${pr.position}`"
                />

                <DarwinText :text="`${$t('resultsTable.time')}: ${pr.time}`" />
              </div>
            </div>
          </template>
        </template>
        <template v-for="pr in row.pilotResultsList" v-else>
          <div :key="`pilot_${pr.id}`" class="col pilot-col">
            <NLink
              :to="
                localePath({
                  name: pilotRouteName,
                  params: { slug: pr.pilot && pr.pilot.slug }
                })
              "
            >
              <Avatar :image="pr.pilot.image" />
              <DarwinText :text="pr.pilot && pr.pilot.name" />
            </NLink>
          </div>
          <div :key="`result_${pr.id}`" class="col result-col">
            <div class="pilot-result-cell">
              <DarwinText
                :text="`${$t('resultsTable.positionLong')}: ${pr.position}`"
              />

              <DarwinText :text="`${$t('resultsTable.time')}: ${pr.time}`" />
            </div>
          </div>
        </template>
      </div>
    </template>

    <template v-if="raceRowList && raceRowList.length">
      <div class="row __heading">
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.event')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.pilot')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.position')"
            family="oswald"
            size="tiny"
          />
        </div>
        <div class="col">
          <DarwinText
            :text="$t('resultsTable.points')"
            family="oswald"
            size="tiny"
          />
        </div>
      </div>

      <div
        v-for="(row, index) in raceRowList"
        :key="row.id || index"
        class="row"
      >
        <div class="col">
          <DarwinText :text="row.name" weight="bold" />
        </div>

        <template v-if="deviceWidth !== 'xs'">
          <div class="col pilot-col">
            <NLink
              v-for="pr in row.pilotResultsList"
              :key="pr.id"
              :to="
                localePath({
                  name: pilotRouteName,
                  params: { slug: pr.pilot && pr.pilot.slug }
                })
              "
            >
              <Avatar :image="pr.pilot.image" />
              <DarwinText :text="pr.pilot && pr.pilot.name" />
            </NLink>
          </div>

          <template v-if="deviceWidth !== 'sm'">
            <div class="col result-col">
              <DarwinText
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                :text="pr.position"
              />
            </div>
            <div class="col result-col">
              <DarwinText
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                :text="pr.points"
              />
            </div>
          </template>
          <template v-else>
            <div class="col result-col">
              <div
                v-for="pr in row.pilotResultsList"
                :key="pr.id"
                class="pilot-result-cell"
              >
                <DarwinText
                  :text="`${$t('resultsTable.positionLong')}: ${pr.position}`"
                />

                <DarwinText
                  :text="`${$t('resultsTable.pointsLong')}: ${pr.points}`"
                />
              </div>
            </div>
          </template>
        </template>
        <template v-for="pr in row.pilotResultsList" v-else>
          <div :key="`pilot_${pr.id}`" class="col pilot-col">
            <NLink
              :to="
                localePath({
                  name: pilotRouteName,
                  params: { slug: pr.pilot && pr.pilot.slug }
                })
              "
            >
              <Avatar :image="pr.pilot.image" />
              <DarwinText :text="pr.pilot && pr.pilot.name" />
            </NLink>
          </div>
          <div :key="`result_${pr.id}`" class="col result-col">
            <div class="pilot-result-cell">
              <DarwinText
                :text="`${$t('resultsTable.positionLong')}: ${pr.position}`"
              />

              <DarwinText
                :text="`${$t('resultsTable.pointsLong')}: ${pr.points}`"
              />
            </div>
          </div>
        </template>
      </div>
    </template>
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
  name: 'ResultsTable',

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
    qualificationRowList() {
      return this.itemList.filter((it) => it.isQualification)
    },

    raceRowList() {
      return this.itemList.filter((it) => !it.isQualification)
    },

    ...mapState(['locale', 'deviceWidth'])
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

      return dayjs(datetime).format('hh A')
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

    &:nth-child(1) {
      text-align: center;
      padding: 10px 4px;
    }
  }

  &.__heading {
    padding-bottom: 12px;

    .col {
      text-transform: uppercase;
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

  .result-col {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    // padding: 10px 12px 10px 0;
  }
}

@media (max-width: $sm-breakpoint) {
  .row {
    display: flex;
    flex-direction: column;

    .col {
      width: 100%;

      &:nth-child(2) {
        margin: 6px 0;
      }

      &:nth-child(2n + 3) {
        display: flex;
        background: $gray-880;
        padding: 12px 16px;
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
      .col:nth-child(2) {
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
    }

    &:nth-child(3) {
      grid-column: 7/13;
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .result-col {
    background: $gray-880;
  }
}

@media (max-width: $md-breakpoint) {
  .row {
    &.__heading {
      visibility: hidden;
      height: 0;
      padding: 0;
    }
  }

  .row + .__heading {
    margin-top: 8px;
  }

  .row {
    .col {
      padding-left: 16px !important; // yes, this is not ideal, but i have no time...

      &:nth-child(2) {
        padding: 10px 16px !important; // yes, this is not ideal, but i have no time...
      }

      &:nth-child(2n + 3) {
        .pilot-result-cell > * + * {
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
    }

    .result-col {
      align-items: flex-start;
      padding: 24px 16px;
    }
  }
}

@media (min-width: $md-breakpoint) {
  .row {
    grid-column-gap: 24px;

    &.__heading {
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
      grid-column: 4/9;
    }

    &:nth-child(3) {
      grid-column: 9/10;
      background: $gray-880;
    }

    &:nth-child(4) {
      grid-column: 10/13;
      background: $gray-880;
    }
  }

  .row + .__heading {
    margin-top: 40px;
  }
}

@media (min-width: $lg-breakpoint) {
  .row {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
  }

  .col {
    &:nth-child(1) {
      grid-column: 1/3;
    }

    &:nth-child(2) {
      grid-column: 3/7;
    }

    &:nth-child(3) {
      grid-column: 7/8;
    }

    &:nth-child(4) {
      grid-column: 8/10;
    }
  }
}
</style>
