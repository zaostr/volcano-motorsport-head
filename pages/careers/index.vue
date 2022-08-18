<template>
  <main class="grid-container page-container">
    <Heading :text="$t('pages.careers')" :size="headingSize" seo="h1" />

    <Picture
      :picture="mainPicture"
      :lqip="settings.careers_image ? settings.careers_image.lqip : ''"
      :aspect-ratio="aspectRatio"
      class="main-picture"
    />

    <div class="join-team">
      <Heading
        :text="$t('careers.joinTeam')"
        :size="joinHeadingSize"
        seo="h2"
      />

      <div class="mail-us-wrap __desktop">
        <Heading :text="$t('careers.emailUs')" size="h5" />
        <LinkCopy :text="companyData.email_job" :href="companyData.email_job" />
      </div>
    </div>

    <RichText
      :block-list="settings.careers_description"
      text-size="augmented"
      class="team-details"
    />

    <div class="mail-us-wrap __mobile">
      <Heading :text="$t('careers.emailUs')" size="h5" />
      <LinkCopy :text="companyData.email_job" :href="companyData.email_job" />
    </div>

    <Heading
      v-if="
        companyData && companyData.vacancies && companyData.vacancies.length
      "
      :text="$t('careers.lookingFor')"
      family="oswald"
      size="h4"
      seo="h2"
      class="looking-for-heading"
    />

    <CardVacancy
      v-for="(vacancy, index) in companyData.vacancies"
      :key="vacancy.id"
      :data="vacancy"
      :email-job="companyData.email_job"
      :is-expanded-by-default="index === 0"
    />
  </main>
</template>

<script>
import { mapState } from 'vuex'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import Heading from '@/components/atoms/Heading'
import Picture from '@/components/atoms/Picture'
import RichText from '@/components/organisms/RichText'
import LinkCopy from '@/components/molecules/LinkCopy'
import CardVacancy from '@/components/molecules/CardVacancy'

export default {
  name: 'CareersPage',

  components: { CardVacancy, LinkCopy, RichText, Picture, Heading },

  mixins: [head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchCareersPageData')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  computed: {
    mainPicture() {
      if (
        ['string', 'undefined'].includes(typeof this.settings.careers_image)
      ) {
        // flat picture fallback
        return this.settings.careers_image
      } else if (typeof this.settings.careers_image === 'object') {
        const picture = []
        const separator = this.settings.careers_image?.url?.includes('?')
          ? '&'
          : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.settings.careers_image.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.settings.careers_image.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.settings.careers_image.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.settings.careers_image.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.settings.careers_image.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: this.settings.careers_image.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.settings.careers_image.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: this.settings.careers_image.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.settings.careers_image.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: this.settings.careers_image.url + separator + 'w=2640'
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

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    joinHeadingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    metaData() {
      return {
        title: this.$t('pages.careers'),
        description: this.$t('pageDescriptions.careers'),
        image: this.settings?.careers_image?.url
      }
    },

    ...mapState(['deviceWidth', 'settings', 'companyData'])
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.mail-us-wrap {
  > * + * {
    margin-top: 8px;
  }
}

@media (max-width: $md-breakpoint) {
  .__desktop {
    display: none !important;
  }

  .main-picture,
  .join-team {
    margin-top: 32px;
  }

  .team-details {
    margin-top: 24px;
  }

  .mail-us-wrap {
    margin-top: 32px;
  }

  .looking-for-heading {
    margin-top: 96px;

    & + .card-vacancy {
      margin-top: 24px;
    }
  }

  .card-vacancy {
    margin-top: 18px;
  }
}

@media (min-width: $md-breakpoint) {
  .__mobile {
    display: none !important;
  }

  .main-picture {
    margin-top: 56px;
  }

  .join-team {
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1/6;
  }

  .team-details {
    margin-top: 56px;
    grid-column: 6/13;
  }

  .looking-for-heading {
    margin: 128px 0 24px;
  }

  .card-vacancy {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
