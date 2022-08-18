<template>
  <main class="grid-container page-container">
    <LinkBack :route-name="teamRouteName" :text="$t('pages.team')" />
    <Heading
      :text="pilot.name"
      :size="headingSize"
      seo="h1"
      class="main-heading"
    />

    <Picture
      :picture="mainPicture"
      :lqip="pilot.image ? pilot.image.lqip : null"
      :aspect-ratio="aspectRatio"
      class="main-picture"
    />

    <RichText
      :block-list="pilot.description"
      text-size="augmented"
      class="description"
    />

    <div class="details">
      <ul v-if="pilot.characteristics" class="characteristics">
        <li v-for="item in pilot.characteristics" :key="item.name">
          <DarwinText :text="`<b>${item.name}</b>: ${item.value}`" />
        </li>
      </ul>

      <ul v-if="pilot.socials" class="socials-wrap">
        <li
          v-for="social in pilot.socials"
          v-show="getSocialType(social)"
          :key="social.id"
        >
          <a :href="social" target="_blank" class="socials-item-link">
            <IconFacebook v-if="getSocialType(social) === 'facebook'" />
            <IconInstagram v-else-if="getSocialType(social) === 'instagram'" />
            <IconTwitter v-else-if="getSocialType(social) === 'twitter'" />
            <IconLinkedIn v-else-if="getSocialType(social) === 'linkedin'" />
          </a>
        </li>
      </ul>

      <Link
        v-if="pilot.web_site"
        :text="preparedWebsite"
        :href="pilot.web_site"
        type="secondary"
        class="web-site"
      />
    </div>

    <Heading
      :text="$t('pilot.career')"
      family="oswald"
      size="h4"
      seo="h3"
      class="subheading"
    />

    <ul class="career-table">
      <li
        v-for="careerRow in pilot.career_table"
        :key="careerRow.year"
        class="career-row"
      >
        <div class="year">
          <DarwinText :text="careerRow.year" weight="bold" />
        </div>
        <RichText class="achievement" :block-list="careerRow.value" />
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import { routeNamesList } from '@/utils/routes'
import getSocialType from '@/utils/getSocialType'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import IconFacebook from '@/components/icons/Facebook'
import IconInstagram from '@/components/icons/Instagram'
import IconTwitter from '@/components/icons/Twitter'
import IconLinkedIn from '@/components/icons/LinkedIn'
import Heading from '@/components/atoms/Heading'
import LinkBack from '@/components/atoms/LinkBack'
import Picture from '@/components/atoms/Picture'
import DarwinText from '@/components/atoms/Text'
import Link from '@/components/atoms/Link'
import RichText from '@/components/organisms/RichText'

export default {
  name: 'PilotPage',

  components: {
    IconLinkedIn,
    IconTwitter,
    IconInstagram,
    IconFacebook,
    Link,
    DarwinText,
    RichText,
    Picture,
    LinkBack,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('fetchPilotData', params.slug)
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      teamRouteName: routeNamesList.team
    }
  },

  computed: {
    mainPicture() {
      if (!this.pilot || !this.pilot.image) {
        return null
      }

      if (['string', 'undefined'].includes(typeof this.pilot.image)) {
        // flat picture fallback
        return this.pilot.image
      } else if (typeof this.pilot.image === 'object') {
        const picture = []
        const separator = this.pilot?.image?.url?.includes('?') ? '&' : '?'
        picture.push(
          {
            min_width: 320,
            srcset: [
              {
                density: '1x',
                src: this.pilot.image.url + separator + 'w=444'
              },
              {
                density: '2x',
                src: this.pilot.image.url + separator + 'w=888'
              }
            ]
          },
          {
            min_width: 480,
            srcset: [
              {
                density: '1x',
                src: this.pilot.image.url + separator + 'w=732'
              },
              {
                density: '2x',
                src: this.pilot.image.url + separator + 'w=1464'
              }
            ]
          },
          {
            min_width: 1024,
            srcset: [
              {
                density: '1x',
                src: this.pilot.image.url + separator + 'w=960'
              },
              {
                density: '2x',
                src: this.pilot.image.url + separator + 'w=1920'
              }
            ]
          },
          {
            min_width: 1280,
            srcset: [
              {
                density: '1x',
                src: this.pilot.image.url + separator + 'w=1140'
              },
              {
                density: '2x',
                src: this.pilot.image.url + separator + 'w=2280'
              }
            ]
          },
          {
            min_width: 1480,
            srcset: [
              {
                density: '1x',
                src: this.pilot.image.url + separator + 'w=1320'
              },
              {
                density: '2x',
                src: this.pilot.image.url + separator + 'w=2640'
              }
            ]
          }
        )

        return picture
      }

      return null
    },

    preparedWebsite() {
      if (this.pilot.web_site) {
        return this.pilot.web_site
          .replace('https://', '')
          .replace('http://', '')
      } else {
        return null
      }
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h4' : 'h3'
    },

    aspectRatio() {
      if (this.deviceWidth === 'xs') {
        return '2:3'
      } else {
        return '9:16'
      }
    },

    pilotShortDescription() {
      const firstHtmlBlock =
        this.pilot &&
        this.pilot.description &&
        this.pilot.description.length &&
        this.pilot.description.find((block) => block.type === 'html')

      if (firstHtmlBlock) {
        return firstHtmlBlock.content.substr(0, 280)
      } else {
        return ''
      }
    },

    metaData() {
      return {
        title: this.pilot.name,
        description: this.prepareMetaDescription(
          this.pilot.meta_description || this.pilotShortDescription
        ),
        image: this.prepareMetaImagePath(this.pilot.image)
      }
    },

    ...mapState(['deviceWidth', 'pilot'])
  },

  methods: {
    getSocialType
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.main-heading {
  margin-top: 8px;
}

.socials-wrap {
  margin-top: 16px;
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 24px;
  }
}

.web-site {
  margin-top: 16px;
  display: block;
  width: fit-content;
}

@media (max-width: $sm-breakpoint) {
  .career-row {
    grid-template-columns: repeat(6, 1fr);

    .year {
      grid-column: 1/3;
    }

    .achievement {
      grid-column: 3/7;
    }
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .career-row {
    grid-template-columns: repeat(12, 1fr);

    .year {
      grid-column: 1/4;
    }

    .achievement {
      grid-column: 4/13;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .main-picture {
    margin-top: 24px;
  }

  .details {
    order: 1;
    margin-top: 32px;
  }

  .description {
    order: 2;
    margin-top: 24px;
  }

  .subheading {
    order: 3;
    margin-top: 80px;
  }

  .career-table {
    order: 4;
    margin-top: 24px;
  }

  .career-row {
    display: grid;
    grid-column-gap: 18px;
    border: 1px solid $white015;

    & + & {
      margin-top: 8px;
    }

    .year {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $gray-050;
      color: $gray-900;
      padding: 12px 0;
    }

    .achievement {
      padding: 12px 24px 12px 0;
    }
  }
}

@media (min-width: $md-breakpoint) {
  .page-container {
    padding-top: 44px;
  }

  .main-picture {
    margin-top: 32px;
  }

  .description {
    margin-top: 56px;
    grid-column: 1/8;
  }

  .details {
    margin-top: 56px;
    grid-column: 9/13;
  }

  .subheading {
    margin-top: 96px;
  }

  .career-table {
    margin-top: 24px;
    grid-column: 1/11;
  }

  .career-row {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-column-gap: 24px;
    border: 1px solid $white015;

    & + & {
      margin-top: 8px;
    }

    .year {
      grid-column: 1/3;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $gray-050;
      color: $gray-900;
      padding: 12px 0;
    }

    .achievement {
      grid-column: 3/11;
      padding: 12px 24px 12px 0;
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .career-table {
    grid-column: 1/8;
  }

  .career-row {
    grid-template-columns: repeat(7, 1fr);

    .year {
      grid-column: 1/2;
    }

    .achievement {
      grid-column: 2/8;
    }
  }
}
</style>
