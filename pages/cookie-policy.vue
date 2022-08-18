<template>
  <main class="grid-container page-container cookie-policy-page">
    <Heading
      :text="$t('cookiePolicy.heading')"
      :size="['xs', 'sm'].includes(deviceWidth) ? 'h3' : 'h2'"
      seo="h1"
      class="main-heading"
    />

    <div class="content-container">
      <DarwinText :text="formattedUpdatedAt" size="augmented" />

      <RichText :block-list="cookiePolicy.blockList" text-size="augmented" />

      <Heading
        :text="$t('cookiePolicy.contactsSubheading')"
        size="h5"
        class="subheading"
      />

      <DarwinText
        :text="$t('cookiePolicy.contactsText')"
        size="augmented"
        class="contacts-text"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

/** mixins **/
// import head from '@/mixins/head'

/** utils **/

/** components **/
import Heading from '@/components/atoms/Heading'
import RichText from '@/components/organisms/RichText'
import DarwinText from '@/components/atoms/Text'

export default {
  name: 'CookiePolicyPagePage',

  components: { DarwinText, RichText, Heading },

  // mixins: [head],

  async asyncData({ store, error }) {
    try {
      await store.dispatch('fetchCookiePolicyData')
    } catch (e) {
      error({ statusCode: 503 })
    }
  },

  computed: {
    formattedUpdatedAt() {
      if (this.locale === 'es') {
        dayjs.locale('es')
      }
      return `${this.$t('cookiePolicy.lastUpdated')}: ${dayjs(
        this.cookiePolicy.updatedAt
      ).format('DD MMM YYYY')}`
    },

    ...mapState(['locale', 'cookiePolicy', 'deviceWidth'])
  },

  async created() {
    if (this.locale === 'es') {
      await require('dayjs/locale/es')
      dayjs.locale('es')
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.content-container,
.rich-text {
  margin-top: 32px;
}

.subheading {
  margin-top: 48px;
}

.contacts-text {
  margin-top: 12px;
}

@media (min-width: $md-breakpoint) {
  .content-container {
    margin-top: 56px;
  }
}

@media (min-width: $lg-breakpoint) {
  .content-container {
    grid-column: 1/10;
  }
}

@media (min-width: $xl-breakpoint) {
  .content-container {
    grid-column: 1/9;
  }
}

@media (min-width: $xxl-breakpoint) {
  .content-container {
    grid-column: 1/8;
  }
}
</style>

<style lang="scss">
@import './assets/styles/variables.scss';

.cookie-policy-page {
  .subheading {
    .h5 {
      font-weight: 700;
    }
  }

  .contacts-text {
    a {
      color: $orange-500;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
