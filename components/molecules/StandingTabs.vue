<template>
  <div class="standings-tabs">
    <ul class="tab-list">
      <li
        v-for="standing in itemList"
        :key="standing.id"
        :class="{ __active: activeStandingId === standing.id }"
        class="tab"
        @click="changeActiveStanding(standing.id)"
      >
        <DarwinText :text="standing.name" />
      </li>
    </ul>

    <transition-group
      name="opacity"
      tag="ul"
      mode="out-in"
      class="tab-body-list"
    >
      <li
        v-for="standing in itemList"
        v-show="activeStandingId === standing.id"
        :key="standing.id"
        class="tab-body"
      >
        <div class="results-row __heading">
          <div class="results-col">
            <DarwinText
              :text="$t('standingTabs.position')"
              family="oswald"
              size="tiny"
            />
          </div>
          <div class="results-col">
            <DarwinText
              :text="$t('standingTabs.number')"
              family="oswald"
              size="tiny"
            />
          </div>
          <div class="results-col">
            <DarwinText
              :text="$t('standingTabs.team')"
              family="oswald"
              size="tiny"
            />
          </div>
          <div class="results-col">
            <DarwinText
              :text="$t('standingTabs.points')"
              family="oswald"
              size="tiny"
            />
          </div>
        </div>

        <div
          v-for="resultsRow in preparedResults"
          :key="resultsRow._key"
          :class="{ __empty: resultsRow.empty }"
          class="results-row"
        >
          <template v-if="!resultsRow.empty">
            <div class="results-col">
              <DarwinText :text="resultsRow.position" weight="bold" />
            </div>
            <div class="results-col">
              <DarwinText :text="resultsRow.number" />
            </div>
            <div class="results-col">
              <DarwinText
                :text="resultsRow.team"
                :class="{ __highlight: resultsRow.highlight }"
              />
            </div>
            <div class="results-col">
              <DarwinText :text="resultsRow.points" weight="bold" />
            </div>
          </template>

          <div v-else class="results-col">
            <IconDots />
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

/** components **/
import DarwinText from '@/components/atoms/Text'
import IconDots from '@/components/icons/Dots'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'StandingTabs',

  components: { IconDots, DarwinText },

  props: {
    itemList: {
      type: Array,
      default: () => {}
    }
  },

  data() {
    return {
      activeStandingId:
        (this.itemList && this.itemList.length && this.itemList[0].id) || 0
    }
  },

  computed: {
    preparedResults() {
      const currentStanding = this.itemList.find(
        (it) => it.id === this.activeStandingId
      )

      if (!currentStanding || !currentStanding.results) {
        return []
      }

      const results = cloneDeep(currentStanding.results)

      // 1. sort
      results.sort(function(a, b) {
        return b.position > a.position ? -1 : 1
      })

      // 2. insert empty rows and
      // 3. highlight own team
      const resultsWithEmptyRows = []
      let prevPosition = 0
      const ownTeamName = this.getSimplifiedName(this.companyData.name)

      results.forEach((it) => {
        if (it.position - prevPosition > 1) {
          resultsWithEmptyRows.push({ empty: true, __key: Math.random() })
        }

        const teamName = this.getSimplifiedName(it.team)

        resultsWithEmptyRows.push({
          ...it,
          highlight: ownTeamName === teamName
        })

        prevPosition = it.position
      })
      return resultsWithEmptyRows
    },

    ...mapState(['companyData'])
  },

  methods: {
    changeActiveStanding(standingId) {
      this.activeStandingId = standingId
    },

    getSimplifiedName(name) {
      if (name && typeof name === 'string') {
        return name.toLowerCase()
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.tab-list {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $white015;
}

.tab {
  transition: all 150ms linear;
  padding-bottom: 16px;
  position: relative;

  &:hover,
  &.__active {
    color: $orange-500;
  }

  &:after {
    position: absolute;
    content: '';
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background: $orange-500;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-out;
  }

  &.__active {
    &:after {
      transform-origin: left;
      transform: scaleX(1);
    }
  }

  &:not(.__active) {
    cursor: pointer;
  }

  & + & {
    margin-left: 24px;
  }
}

.tab-body-list {
  width: 100%;
  position: relative;
}

.tab-body {
  width: 100%;
}

.results-row {
  .results-col {
    display: flex;
    justify-content: center;
    align-items: center;

    .__highlight {
      color: $orange-500;
    }
  }

  &.__heading {
    padding-bottom: 12px;

    .text {
      text-transform: uppercase;
    }
  }

  &:not(.__heading) {
    border: 1px solid $white015;
    height: 48px;

    .results-col {
      &:nth-child(1) {
        background: $gray-050;
        margin: -1px 0 -1px;
        color: $gray-900;
      }

      &:nth-child(3) {
        justify-content: flex-start;
      }

      &:nth-child(2),
      &:nth-child(4) {
        background: $gray-880;
      }
    }
  }

  &.__heading + & {
    margin-top: 0;
  }

  & + & {
    margin-top: 8px;
  }

  &.__empty {
    border: none;
    height: auto;

    .results-col {
      background: none !important;
      padding: 8px 0;

      .icon {
        color: white;
      }
    }
  }
}

@media (max-width: $sm-breakpoint) {
  .standings-tabs {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 18px;
  }

  .tab-list {
    grid-column: 1/7;
  }

  .tab-body-list {
    padding-top: 40px;
    grid-column: 1/7;
  }

  .results-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 18px;

    .results-col {
      &:nth-child(1) {
        grid-column: 1/2;
      }

      &:nth-child(2) {
        display: none;
      }

      &:nth-child(3) {
        grid-column: 2/6;
      }

      &:nth-child(4) {
        grid-column: 6/7;
      }
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .standings-tabs {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;
  }

  .tab-list {
    grid-column: 1/13;
  }

  .tab-body-list {
    padding-top: 40px;
    grid-column: 1/13;
  }

  .results-row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;
  }

  .results-col {
    &:nth-child(1) {
      grid-column: 1/3;
    }

    &:nth-child(2) {
      grid-column: 3/5;
    }

    &:nth-child(3) {
      grid-column: 5/11;
    }

    &:nth-child(4) {
      grid-column: 11/13;
    }
  }
}

@media (min-width: $md-breakpoint) {
  .standings-tabs {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 24px;
  }

  .tab-list {
    grid-column: 1/13;
  }

  .tab-body-list {
    padding-top: 40px;
    grid-column: 1/10;
  }

  .results-row {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-column-gap: 24px;

    &:not(.__heading) {
      .results-col {
        &:nth-child(1) {
          background: $gray-050;
          margin: -1px 0 -1px;
          color: $gray-900;
        }

        &:nth-child(3) {
          justify-content: flex-start;
        }
      }
    }
  }

  .results-col {
    &:nth-child(1) {
      grid-column: 1/2;
    }

    &:nth-child(2) {
      grid-column: 2/3;
    }

    &:nth-child(3) {
      grid-column: 3/9;
    }

    &:nth-child(4) {
      grid-column: 9/10;
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .tab-body-list {
    grid-column: 1/8;
  }

  .results-row {
    grid-template-columns: repeat(7, 1fr);
  }

  .results-col {
    &:nth-child(3) {
      grid-column: 3/7;
    }

    &:nth-child(4) {
      grid-column: 7/8;
    }
  }
}
</style>
