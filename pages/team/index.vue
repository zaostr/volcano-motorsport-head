<template>
  <main class="grid-container page-container">
    <Heading :text="$t('pages.team')" :size="headingSize" seo="h1" />

    <Picture
      :picture="mainPicture"
      :lqip="companyData.image ? companyData.image.lqip : null"
      :aspect-ratio="aspectRatio"
      class="main-picture"
    />

    <GraphicsAchievements v-if="showGraphics" />

    <Heading
      v-else
      :text="$t('team.achievements')"
      family="oswald"
      size="h4"
      seo="h3"
      class="subheading"
    />

    <div v-if="firstAchievement" class="achievement-item">
      <div class="icon-wrap">
        <IconRace />
        <Heading :text="firstAchievement.name" size="h4" />
      </div>

      <DarwinText :text="firstAchievement.value" />
    </div>

    <div v-if="secondAchievement" class="achievement-item">
      <div class="icon-wrap">
        <IconPodium />
        <Heading :text="secondAchievement.name" size="h4" />
      </div>

      <DarwinText :text="secondAchievement.value" />
    </div>

    <div v-if="thirdAchievement" class="achievement-item">
      <div class="icon-wrap">
        <IconCup />
        <Heading :text="thirdAchievement.name" size="h4" />
      </div>

      <DarwinText :text="thirdAchievement.value" />
    </div>

    <Heading
      :text="$t('team.pilots')"
      family="oswald"
      size="h4"
      seo="h3"
      class="subheading"
    />

    <section class="pilot-list">
      <CardPilot v-for="pilot in pilotsList" :key="pilot.id" :data="pilot" />
    </section>

    <Heading
      :text="$t('team.crew')"
      family="oswald"
      size="h4"
      seo="h3"
      class="subheading"
    />

    <div class="crew-member-list">
      <CardCrewMember
        v-for="member in companyData.crew"
        :key="member.id"
        :data="member"
      />
    </div>

    <Heading
      :text="$t('team.base')"
      family="oswald"
      size="h4"
      seo="h3"
      class="subheading"
    />

    <div v-if="baseInfo.images" class="base-images-container">
      <Picture
        v-if="!isMounted || baseInfo.images.length === 1"
        :key="baseInfo.images[0].id"
        :picture="getBaseImage(baseInfo.images[0])"
        :lqip="baseInfo.images[0].lqip"
        :loaded-initially="true"
        :aspect-ratio="baseImageAspectRatio"
        class="swiper-slide"
      />
      <SlideSwiper v-else :options="{ loop: true }">
        <Picture
          v-for="baseImage in baseInfo.images"
          :key="baseImage.id"
          :picture="getBaseImage(baseImage)"
          :lqip="baseImage.lqip"
          :loaded-initially="true"
          :aspect-ratio="baseImageAspectRatio"
          class="swiper-slide"
        />
      </SlideSwiper>
    </div>

    <ul class="base-features-list">
      <li
        v-for="feature in baseInfo.features"
        :key="feature.id"
        class="base-feature-item"
      >
        <DarwinText :text="`<b>${feature.name}:</b> ${feature.value}`" />
      </li>
    </ul>

    <RichText
      :block-list="baseInfo.blocksList"
      text-size="augmented"
      class="base-description"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import IconRace from '@/components/icons/Race'
import IconPodium from '@/components/icons/Podium'
import IconCup from '@/components/icons/Cup'
import GraphicsAchievements from '@/components/graphics/Achievements'
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import DarwinText from '@/components/atoms/Text'
import CardPilot from '@/components/molecules/CardPilot'
import CardCrewMember from '@/components/molecules/CardCrewMember'
import SlideSwiper from '@/components/molecules/SlideSwiper'
import RichText from '@/components/organisms/RichText'

export default {
  name: 'TeamPage',

  components: {
    RichText,
    SlideSwiper,
    CardCrewMember,
    CardPilot,
    DarwinText,
    IconCup,
    IconPodium,
    IconRace,
    GraphicsAchievements,
    Picture,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchTeamPageData')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      isMounted: false
    }
  },

  computed: {
    mainPicture() {
      if (!this.companyData || !this.companyData.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.companyData.image)) {
        // flat picture fallback
        return this.companyData.image
      } else if (typeof this.companyData.image === 'object') {
        const picture = []
        const separator = this.companyData?.image?.url?.includes('?')
          ? '&'
          : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.companyData?.image?.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.companyData?.image?.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.companyData?.image?.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.companyData?.image?.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.companyData?.image?.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: this.companyData?.image?.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.companyData?.image?.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: this.companyData?.image?.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.companyData?.image?.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: this.companyData?.image?.url + separator + 'w=2640'
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

    baseImageAspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '2:3'
      } else {
        return '9:16'
      }
    },

    showGraphics() {
      return !['xs', 'sm'].includes(this.deviceWidth)
    },

    firstAchievement() {
      return this.companyData.achievements && this.companyData.achievements[0]
    },

    secondAchievement() {
      return this.companyData.achievements && this.companyData.achievements[1]
    },

    thirdAchievement() {
      return this.companyData.achievements && this.companyData.achievements[2]
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    metaData() {
      return {
        title: this.$t('pages.team'),
        description: this.$t('pageDescriptions.team'),
        image: this.companyData?.image?.url
      }
    },

    ...mapState(['deviceWidth', 'companyData', 'pilotsList', 'baseInfo'])
  },

  mounted() {
    this.isMounted = true
  },

  methods: {
    getBaseImage(image) {
      if (!image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof image)) {
        // flat picture fallback
        return image
      } else if (typeof image === 'object') {
        const picture = []
        const separator = image.url?.includes('?') ? '&' : '?'
        picture.push({
          min_width: 320,
          srcset: [
            {
              density: '1x',
              src: image.url + separator + 'w=560'
            },
            {
              density: '2x',
              src: image.url + separator + 'w=1120'
            }
          ]
        })

        return picture
      }

      return null
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.base-images-container {
  margin-top: 24px;
}

@media (max-width: $md-breakpoint) {
  .main-picture {
    margin-top: 32px;

    & + .subheading {
      margin: 32px 0 24px;
    }
  }

  .subheading {
    margin-top: 96px;
  }

  .base-features-list {
    margin-top: 44px;
  }

  .base-description {
    margin-top: 24px;
  }
}

@media (max-width: $sm-breakpoint) {
  .icon-wrap {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .heading {
      margin-top: 20px;
    }
  }

  .achievement-item {
    > .text {
      margin-top: 20px;
    }

    & + & {
      margin-top: 56px;
    }
  }

  .pilot-list,
  .crew-member-list {
    margin-top: 24px;
  }

  .card-pilot,
  .card-crew-member {
    & + & {
      margin-top: 18px;
    }
  }
}

@media (min-width: $sm-breakpoint) {
  .achievement-item {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 18px;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .achievement-item {
    grid-template-columns: repeat(12, 1fr);

    & + & {
      margin-top: 56px;
    }

    .icon-wrap {
      grid-column: 1/5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .heading {
        margin-top: 20px;
        text-align: center;
      }
    }

    .text {
      grid-column: 5/13;
      display: flex;
      align-items: center;
    }
  }
}

@media (min-width: $sm-breakpoint) {
  .pilot-list,
  .crew-member-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 18px;
    margin-bottom: -18px;
  }

  .card-pilot,
  .card-crew-member {
    margin-bottom: 18px;
    grid-column: span 6;
  }
}

@media (min-width: $md-breakpoint) {
  .main-picture {
    margin-top: 56px;
  }

  .graphics {
    margin: 72px auto 0;
    width: 100%;
    height: auto;
  }

  .achievement-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: -32px;
    grid-column: span 4;
    padding: 0 32px;

    .heading,
    .text {
      margin-top: 20px;
    }
  }

  .subheading {
    margin-top: 128px;
  }

  .pilot-list,
  .crew-member-list {
    grid-column-gap: 24px;
    margin-bottom: -24px;
  }

  .card-pilot {
    margin-bottom: 24px;
  }

  .card-crew-member {
    margin-bottom: 24px;
    grid-column: span 4;
  }

  .base-features-list {
    margin-top: 56px;
    grid-column: 1/6;
  }

  .base-description {
    margin-top: 56px;
    grid-column: 6/13;
  }
}

@media (min-width: $lg-breakpoint) {
  .graphics {
    max-width: 720px;
    grid-column: 2/12;
  }

  .achievement-item {
    padding: 0 48px;
  }

  .card-crew-member {
    grid-column: span 3;
  }
}

@media (min-width: $xl-breakpoint) {
  .graphics {
    max-width: 946px;
  }
}
</style>
