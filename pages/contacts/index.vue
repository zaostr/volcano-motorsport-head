<template>
  <main
    class="grid-container page-container"
    itemscope
    itemtype="http://schema.org/Organization"
  >
    <Heading
      :text="$t('pages.contacts')"
      :size="headingSize"
      seo="h1"
      class="page-heading"
    />

    <a :href="`tel:${companyData.phone}`" target="_blank" class="actions-card">
      <IconPhone />
      <DarwinText :text="$t('contacts.callUs')" size="small" />
    </a>

    <a
      :href="`mailto:${companyData.email}`"
      target="_blank"
      class="actions-card"
    >
      <IconMail />
      <DarwinText :text="$t('contacts.mailUs')" size="small" />
    </a>

    <n-link
      :to="localePath({ name: routeNamesList.careers })"
      class="actions-card"
    >
      <IconTrending />
      <DarwinText :text="$t('contacts.careerOpp')" size="small" />
    </n-link>

    <div class="details-wrap">
      <Heading
        :text="companyData.name"
        itemprop="name"
        family="oswald"
        size="h4"
        seo="h3"
      />

      <DarwinText :text="baseInfo.address" itemprop="address" class="address" />

      <LinkCopy
        :title="$t('contacts.phone')"
        :text="companyData.phone"
        :href="`tel:${companyData.phone}`"
        class="copy-phone"
      />

      <LinkCopy
        :title="$t('contacts.email')"
        :text="companyData.email"
        :href="`mailto:${companyData.email}`"
        class="copy-email"
      />

      <div class="cars-for-sale">
        <IconSale />

        <div class="sale-details">
          <Heading :text="$t('contacts.salesEmailText')" size="h5" seo="h3" />

          <LinkCopy
            :text="companyData.email_sale"
            :href="`mailto:${companyData.email_sale}`"
            class="copy-sale-email"
          />
        </div>
      </div>

      <div class="socials-wrap">
        <Heading :text="$t('contacts.social')" size="h5" seo="h3" />

        <ul class="socials-list">
          <li v-for="social in companyData.socials" :key="social.id">
            <a :href="social" target="_blank" class="socials-item-link">
              <template v-if="getSocialType(social) === 'facebook'">
                <IconFacebook />
                <DarwinText :text="getSocialType(social)" />
              </template>
              <template v-else-if="getSocialType(social) === 'instagram'">
                <IconInstagram />
                <DarwinText :text="getSocialType(social)" />
              </template>
              <template v-else-if="getSocialType(social) === 'twitter'">
                <IconTwitter />
                <DarwinText :text="getSocialType(social)" />
              </template>
              <template v-else-if="getSocialType(social) === 'linkedin'">
                <IconLinkedIn />
                <DarwinText :text="getSocialType(social)" />
              </template>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="map-wrap">
      <GoogleMap :coords="mapCoords" :aspect-ratio="aspectRatio" />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
// import VueScrollTo from 'vue-scrollto'

/** utils **/
import { routeNamesList } from '@/utils/routes'
import getSocialType from '@/utils/getSocialType'

/** mixins **/
import head from '@/mixins/head'

/** components **/
import IconMail from '@/components/icons/Mail'
import IconPhone from '@/components/icons/Phone'
import IconTrending from '@/components/icons/Trending'
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'
import GoogleMap from '@/components/atoms/Map'
import LinkCopy from '@/components/molecules/LinkCopy'
import IconSale from '@/components/icons/Sale'
import IconFacebook from '@/components/icons/Facebook'
import IconInstagram from '@/components/icons/Instagram'
import IconTwitter from '@/components/icons/Twitter'
import IconLinkedIn from '@/components/icons/LinkedIn'

export default {
  name: 'ContactsPage',

  components: {
    IconLinkedIn,
    IconTwitter,
    IconInstagram,
    IconFacebook,
    IconSale,
    LinkCopy,
    GoogleMap,
    DarwinText,
    IconTrending,
    IconPhone,
    IconMail,
    Heading
  },

  mixins: [head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchContactsPageData')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  data() {
    return {
      routeNamesList
    }
  },

  computed: {
    mapCoords() {
      return [this.baseInfo.geopoint.lat, this.baseInfo.geopoint.lng]
    },

    aspectRatio() {
      return ['sm', 'md'].includes(this.deviceWidth) ? '2:3' : '1:1'
    },

    headingSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    metaData() {
      return {
        title: this.$t('pages.contacts'),
        description: this.$t('pageDescriptions.contacts'),
        image: this.settings?.meta_image?.url
      }
    },

    ...mapState(['deviceWidth', 'companyData', 'settings', 'baseInfo'])
  },

  mounted() {
    // VueScrollTo.scrollTo('body')
    // this.$nuxt.$store.dispatch('setNotification', '')
  },

  methods: {
    getSocialType
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';
@import './assets/styles/shadows.scss';

.actions-card {
  @include shadow;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 32px 16px;
  background: $gray-880;

  .text {
    // margin-top: 32px;
    text-transform: uppercase;
    text-align: center;
  }
}

.address {
  max-width: 134px;
}

.address {
  margin-top: 24px;
}

.copy-phone {
  margin-top: 24px;
}

.copy-email {
  margin-top: 12px;
}

.cars-for-sale {
  margin-top: 56px;
}

.copy-sale-email {
  margin-top: 12px;
}

.socials-wrap {
  margin-top: 56px;
}

.socials-list {
  margin-top: 12px;

  > * + * {
    margin-top: 16px;
  }
}

.socials-item-link {
  display: flex;
  align-items: center;
  width: fit-content;

  .text {
    margin-left: 12px;
    text-transform: capitalize;
  }
}

.map-wrap {
  margin-top: 56px;
}

@media (max-width: $sm-breakpoint) {
  .sale-details {
    margin-top: 24px;
  }
}

@media (min-width: $sm-breakpoint) {
  .cars-for-sale {
    display: flex;
  }

  .sale-details {
    margin-left: 24px;
  }
}

@media (max-width: $md-breakpoint) {
  .page-heading {
    & + .actions-card {
      margin-top: 32px;
    }
  }

  .actions-card {
    margin-top: 18px;
    padding: 24px 16px;

    .text {
      margin-top: 24px;
    }
  }

  .details-wrap {
    margin-top: 80px;
  }
}

@media (min-width: $md-breakpoint) {
  .page-heading {
    margin-bottom: 56px;
  }

  .actions-card {
    grid-column: span 4;
    padding: 32px 16px;

    .text {
      margin-top: 32px;
    }
  }

  .details-wrap {
    margin-top: 96px;
    grid-column: span 12;
  }

  .map-wrap {
    // margin-top: 56px;
    grid-column: span 12;
  }
}

@media (min-width: $lg-breakpoint) {
  .map-wrap,
  .details-wrap {
    margin-top: 96px;
    grid-column: span 6;
  }
}
</style>
