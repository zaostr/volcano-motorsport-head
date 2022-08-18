<template>
  <main class="grid-container page-container">
    <div class="heading-wrap">
      <Heading
        v-if="isCurrentSeason"
        :text="$t('pages.season')"
        :size="headingSize"
        seo="h1"
      />
      <BreadcrumbsArchive
        v-else
        :back-route-name="seasonRouteName"
        :back-route-params="{ year: currentYear }"
        :back-text="$t('season.season')"
        :year="year"
      />

      <ControlButton
        type="inverse"
        size="tiny"
        class="standings-button"
        @click="standingsButtonClickHandler"
      >
        <IconTable />
        <DarwinText :text="$t('season.standings')" size="small" />
      </ControlButton>
    </div>

    <template v-if="showProgressMap">
      <GraphicsProgressMap />

      <SeasonProgressMap :data="progressMapData" />
    </template>

    <template v-if="isCurrentSeason && upcomingAndCurrentRacesList.length">
      <Heading
        :text="$t('season.upcomingRaces')"
        family="oswald"
        size="h4"
        seo="h4"
        class="upcoming-races-subheading"
      />

      <section class="upcoming-race-list">
        <CardUpcomingRace
          v-for="race in upcomingAndCurrentRacesList"
          :key="race.id"
          :data="race"
          class="upcoming-race-item"
        />
      </section>
    </template>

    <template v-if="pastRacesList && pastRacesList.length">
      <Heading
        :text="isCurrentSeason ? $t('season.pastRaces') : $t('season.races')"
        family="oswald"
        size="h4"
        seo="h4"
        :class="{ '__short-margin': !isCurrentSeason }"
        class="subheading"
      />

      <section class="past-race-list">
        <CardPastRace
          v-for="race in pastRacesList"
          :key="race.id"
          :data="race"
          class="past-race-item"
        />
      </section>
    </template>

    <Heading
      id="standings"
      :text="$t('season.standings')"
      family="oswald"
      size="h4"
      seo="h4"
      class="subheading"
    />

    <StandingTabs :item-list="seasonSeriesList" class="series-tabs" />

    <Link
      v-if="isCurrentSeason && season.standings_url"
      :text="$t('season.fullStandings')"
      :href="season.standings_url"
      :show-external-icon="true"
      type="secondary"
      class="full-standings-link"
    />

    <template v-if="archiveSeasonsList && archiveSeasonsList.length">
      <Heading
        :text="$t('season.archive')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <section class="season-archive-list">
        <CardSeasonArchive
          v-for="season in archiveSeasonsList"
          :key="season.year"
          :data="season"
        />
      </section>
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import dayjs from 'dayjs'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import GraphicsProgressMap from '@/components/graphics/ProgressMap'
import Heading from '@/components/atoms/Heading'
import ControlButton from '@/components/atoms/ControlButton'
import CardUpcomingRace from '@/components/molecules/CardUpcomingRace'
import CardPastRace from '@/components/molecules/CardPastRace'
import StandingTabs from '@/components/molecules/StandingTabs'
import SeasonProgressMap from '@/components/organisms/SeasonProgressMap'
import CardSeasonArchive from '@/components/molecules/CardSeasonArchive'
import Link from '@/components/atoms/Link'
import BreadcrumbsArchive from '@/components/molecules/BreadcrumbsArchive'
import IconTable from '@/components/icons/Table'
import DarwinText from '@/components/atoms/Text'

export default {
  name: 'SeasonPage',

  components: {
    DarwinText,
    IconTable,
    BreadcrumbsArchive,
    Link,
    CardSeasonArchive,
    StandingTabs,
    CardPastRace,
    CardUpcomingRace,
    SeasonProgressMap,
    GraphicsProgressMap,
    ControlButton,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await Promise.all([
        store.dispatch('fetchSeasonData', params.year),
        store.dispatch('fetchSeasonsList')
      ])
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      raceRouteName: routeNamesList.race,
      seasonRouteName: routeNamesList.season,
      year: this.$route.params.year
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },

    isCurrentSeason() {
      // season of this year
      return parseInt(this.year) === this.currentYear
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    seasonSeriesList() {
      if (this.season.seriesList) {
        return [...this.season.seriesList].sort(
          (a, b) => a.priority - b.priority
        )
      }

      return []
    },

    startOfSaturday() {
      const now = dayjs()

      return now
        .endOf('isoWeek')
        .subtract(2, 'day')
        .startOf('day')
    },

    upcomingAndCurrentRacesList() {
      if (!this.season.raceList || !this.season.raceList.length) {
        return []
      }

      return this.season.raceList.filter(
        (race) => dayjs(race.datetime) >= this.startOfSaturday
      )
    },

    pastRacesList() {
      if (!this.season.raceList || !this.season.raceList.length) {
        return []
      }

      return this.season.raceList
        .filter((race) => dayjs(race.datetime) < this.startOfSaturday)
        .reverse()
    },

    archiveSeasonsList() {
      if (!this.settings.seasonsList || !this.settings.seasonsList.length) {
        return []
      }
      // exclude current season year and active season year (this page)
      const currentYear = new Date().getFullYear()
      const activeSeasonYear = parseInt(this.year)

      return this.settings.seasonsList.filter(
        (season) => ![currentYear, activeSeasonYear].includes(season.year)
      )
    },

    showProgressMap() {
      return this.isCurrentSeason && !['xs', 'sm'].includes(this.deviceWidth)
    },

    progressMapData() {
      return {
        start_month: this.season.start_month,
        end_month: this.season.end_month,
        racesList: this.season.raceList
      }
    },

    metaData() {
      return {
        title: this.$t('pages.season'),
        description: this.$t('pageDescriptions.season'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState(['deviceWidth', 'settings', 'season'])
  },

  methods: {
    standingsButtonClickHandler() {
      VueScrollTo.scrollTo('#standings', { offset: -110 }) // for desktop
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.standings-button {
  margin-top: 24px;

  &:hover {
    text-decoration: underline;
  }
}

.upcoming-races-subheading {
  margin-top: 56px;
}

.upcoming-race-list {
  margin-top: 24px;
  margin-bottom: -18px;
}

.upcoming-race-item {
  grid-column: span 6;
  margin-bottom: 18px;
}

.subheading {
  margin-top: 96px;
}

.heading-wrap + .subheading {
  margin-top: 56px;
}

.past-race-list {
  margin-top: 24px;
  margin-bottom: -18px;
}

.past-race-item {
  margin-bottom: 18px;
}

.series-tabs {
  margin-top: 40px;
}

.full-standings-link {
  margin-top: 24px;
  align-items: center;
}

.season-archive-list {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid $white015;

  .card-wrap {
    width: 100%;
    border: 1px solid $white015;
    border-left: none;
  }
}

@media (max-width: $sm-breakpoint) {
  .heading-wrap {
    .heading,
    .breadcrumbs-archive {
      margin-bottom: 16px;
    }
  }

  .season-archive-list {
    .card-wrap {
      &:nth-child(n + 2) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $sm-breakpoint) {
  .standings-button {
    margin-top: 8px;
  }

  .heading-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .upcoming-race-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;
    // margin-bottom: -18px;
  }

  .upcoming-race-item {
    grid-column: span 6;
    // margin-bottom: 18px;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .season-archive-list {
    .card-wrap {
      width: 50%;

      &:nth-child(n + 3) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $md-breakpoint) {
  .graphics {
    margin: 72px auto 0;
    width: 100%;
    height: auto;
  }

  .season-progress-map {
    margin-top: 72px;
  }

  .upcoming-races-subheading {
    margin-top: 96px;
  }

  .subheading {
    margin-top: 128px;

    &.__short-margin {
      margin-top: 56px;
    }
  }

  .upcoming-race-list {
    grid-column-gap: 24px;
    margin-bottom: -24px;
  }

  .upcoming-race-item {
    margin-bottom: 24px;
  }

  .past-race-list {
    margin-bottom: -24px;
  }

  .past-race-item {
    margin-bottom: 24px;
  }

  .season-archive-list {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid $white015;

    .card-wrap {
      width: 33.333%;
      border: 1px solid $white015;
      border-left: none;

      &:nth-child(n + 5) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $md-breakpoint) and (max-width: $lg-breakpoint) {
  .season-archive-list {
    .card-wrap {
      &:nth-child(n + 4) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .graphics {
    max-width: 720px;
    grid-column: 2/12;
  }

  .season-archive-list {
    .card-wrap {
      width: 25%;
    }
  }

  .season-archive-list {
    .card-wrap {
      width: 25%;

      &:nth-child(n + 5) {
        border-top: none;
      }
    }
  }
}

@media (min-width: $xl-breakpoint) {
  .page-container {
    display: block !important;
  }

  .graphics {
    max-width: 946px;
    margin-left: calc((100% - 946px) / 2);
  }
}
</style>
