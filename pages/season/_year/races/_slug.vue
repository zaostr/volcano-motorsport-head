<template>
  <main class="grid-container page-container">
    <div class="main-picture-container">
      <Picture
        :picture="mainPicture"
        :lqip="race.mainImage ? race.mainImage.lqip : null"
        :author="race.mainImage.author"
        :aspect-ratio="aspectRatio"
        class="main-picture"
      />

      <div v-if="isUpcoming" class="countdown-wrap">
        <DateCountdown :deadline="deadline" />
      </div>
    </div>

    <LinkBack
      :text="$t('race.season')"
      :route-name="seasonRouteName"
      :route-params="{ year }"
    />

    <Heading
      :text="race.name"
      :size="headingSize"
      seo="h1"
      class="main-heading"
    />

    <SerieDateBadge :serie="race.serie" :date="race.datetime" />

    <RichText :block-list="race.description" text-size="augmented" />

    <SocialsShare />

    <template v-if="isCurrent && race.results && race.results.length">
      <Heading
        :text="$t('race.weekendResults')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <div class="current-result-list">
        <DarwinText
          v-for="result in race.results"
          :key="result.id"
          :text="getResultString(result)"
          size="augmented"
        />
      </div>
    </template>

    <template
      v-if="(isUpcoming || isCurrent) && race.schedule && race.schedule.length"
    >
      <Heading
        :text="$t('race.weekendSchedule')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <ScheduleTable :item-list="race.schedule" />
    </template>

    <template v-else>
      <template v-if="race.results && race.results.length">
        <Heading
          :text="$t('race.weekendResults')"
          family="oswald"
          size="h4"
          seo="h4"
          class="subheading"
        />

        <ResultsTable :item-list="race.results" />
      </template>
    </template>

    <template v-if="race.videos && race.videos.length">
      <Heading
        :text="$t('race.video')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <section class="grid-container">
        <Video
          v-for="video in race.videos"
          :key="video"
          :content="video"
          aspect-ratio="9:16"
        />
      </section>
    </template>

    <template v-if="race.news && race.news.length">
      <Heading
        :text="$t('race.news')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <NewsList :list="race.news" />
    </template>

    <template v-if="race.publications && race.publications.length">
      <Heading
        :text="$t('race.articles')"
        family="oswald"
        size="h4"
        seo="h4"
        class="subheading"
      />

      <Article
        v-for="article in race.publications"
        :key="article.link"
        :data="article"
      />
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** utils **/
import { routeNamesList } from '@/utils/routes'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import DateCountdown from '@/components/atoms/DateCountdown'
import LinkBack from '@/components/atoms/LinkBack'
import SerieDateBadge from '@/components/molecules/SerieDateBadge'
import RichText from '@/components/organisms/RichText'
import SocialsShare from '@/components/molecules/SocialsShare'
import ScheduleTable from '@/components/organisms/ScheduleTable'
import ResultsTable from '@/components/organisms/ResultsTable'
import Video from '@/components/atoms/Video'
import NewsList from '@/components/organisms/NewsList'
import Article from '@/components/molecules/Article'
import DarwinText from '~/components/atoms/Text'

export default {
  name: 'RacePage',

  components: {
    DarwinText,
    Article,
    NewsList,
    Video,
    ResultsTable,
    ScheduleTable,
    SocialsShare,
    RichText,
    SerieDateBadge,
    LinkBack,
    DateCountdown,
    Picture,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('fetchRaceData', params.slug)
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      seasonRouteName: routeNamesList.season,
      year: this.$route.params.year
    }
  },

  computed: {
    mainPicture() {
      if (!this.race || !this.race.mainImage) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.race.mainImage)) {
        // flat picture fallback
        return this.race.mainImage
      } else if (typeof this.race.mainImage === 'object') {
        const picture = []
        const separator = this.race.mainImage?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.race.mainImage.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.race.mainImage.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.race.mainImage.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.race.mainImage.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.race.mainImage.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: this.race.mainImage.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.race.mainImage.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: this.race.mainImage.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.race.mainImage.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: this.race.mainImage.url + separator + 'w=2640'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    aspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '2:3'
      } else if (['sm', 'md'].includes(this.deviceWidth)) {
        return '9:16'
      } else {
        return '5:12'
      }
    },

    isUpcoming() {
      const now = dayjs()
      const raceDate = dayjs(this.race.datetime)

      return now < raceDate
    },

    isCurrent() {
      return this.race.isCurrent
    },

    deadline() {
      const dateTime = this.race ? this.race.datetime.split('T') : []

      return dateTime[0]
    },

    raceShortDescription() {
      const firstHtmlBlock =
        this.race &&
        this.race.description &&
        this.race.description.length &&
        this.race.description.find((block) => block.type === 'html')

      if (firstHtmlBlock) {
        return firstHtmlBlock.content.substr(0, 280)
      } else {
        return ''
      }
    },

    metaData() {
      return {
        title: this.race.meta_title || this.race.name,
        description: this.prepareMetaDescription(
          this.race.meta_description || this.raceShortDescription
        ),
        image: this.prepareMetaImagePath(this.mainPicture)
      }
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    ...mapState(['locale', 'deviceWidth', 'race'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  },

  methods: {
    getPreparedPicture(image) {
      if (!image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof image)) {
        // flat picture fallback
        return image
      } else if (typeof image === 'object') {
        const picture = []
        const separator = image?.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            {
              density: '1x',
              src: image.url + separator + 'w=368'
            },
            {
              density: '2x',
              src: image.url + separator + 'w=736'
            }
          ]
        })

        return picture
      }

      return null
    },

    getResultString(result) {
      const pilotResultStrings = result.pilotResultsList?.map((pr) => {
        let resultString = ''
        if (result.isQualification) {
          resultString = `${this.$t('race.position')} ${pr.position}, ${this.$t(
            'race.time'
          )} ${pr.time}`
        } else {
          resultString = `${this.$t('race.position')} ${pr.position}, ${this.$t(
            'race.points'
          )} ${pr.points}`
        }

        return `${pr.pilot.name}: ${resultString}`
      })

      return `<b>${result.name}</b>. ${pilotResultStrings.join('; ')}`
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.page-container {
  padding-top: 0;
}

.main-picture-container {
  position: relative;
}

.countdown-wrap {
  // position: absolute;
  // padding: 16px 21px 24px;
  // background: $gray-050;
  position: relative;
  margin-top: -16px;
  z-index: 10;
}

.link-back {
  margin-top: 32px;
}

.main-heading {
  margin-top: 8px;
}

.serie-date-badge,
.rich-text,
.current-result-list {
  margin-top: 24px;
}

.socials-share {
  margin-top: 32px;
}

.subheading {
  margin-top: 80px;
}

.schedule-table,
.results-table {
  margin-top: 24px;
  // grid-column: 1/13;
}

.video-container,
.article-container {
  margin-top: 18px;
}

.news-list {
  margin-top: 18px;
  padding: 0;
}

@media (min-width: $md-breakpoint) {
  .countdown-wrap {
    position: absolute;
    padding: 16px 21px 24px;
    background: $gray-050;
    bottom: 0;
  }

  .link-back {
    margin-top: 44px;
  }

  .serie-date-badge,
  .rich-text,
  .current-result-list {
    margin-top: 32px;
  }

  .rich-text,
  .current-result-list {
    grid-column: 1/8;
  }

  .socials-share {
    grid-column: 9/13;
  }

  .subheading {
    margin-top: 96px;
  }

  .schedule-table,
  .results-table {
    margin-top: 40px;
    grid-column: 1/13;
  }

  .article-container {
    margin-top: 24px;
    grid-column: 1/8;
  }

  .video-container {
    margin-top: 24px;
    grid-column-end: span 6;
  }

  .news-list {
    margin-top: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  .schedule-table {
    grid-column: 1/11;
  }

  .results-table {
    grid-column: 1/10;
  }
}
</style>
