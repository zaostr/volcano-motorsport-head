<template>
  <div class="nuxt-container">
    <template v-if="isSiteClosed">
      <UnderMaintenance />
    </template>
    <template v-else>
      <DarwinHeader />

      <Nuxt />

      <DarwinFooter />

      <CookieUsageConfirmation />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

/** components **/
import DarwinHeader from '@/components/organisms/Header.vue'
import DarwinFooter from '@/components/organisms/Footer.vue'
import UnderMaintenance from '@/components/UnderMaintenance'
import CookieUsageConfirmation from '@/components/organisms/CookieUsageConfirmation'

export default {
  components: {
    CookieUsageConfirmation,
    UnderMaintenance,
    DarwinHeader,
    DarwinFooter
  },

  data() {
    return {
      localDeviceWidth: 'xs',
      devMode: false,
      keydownEventListener: null
    }
  },

  computed: {
    pageUrl() {
      if (process.browser) {
        return (
          location.protocol +
          '//' +
          location.host +
          this.$route.path.replace(/\/$/, '')
        )
      } else {
        return (
          (process.env.APP_PROTOCOL ? process.env.APP_PROTOCOL : 'http') +
          '://' +
          process.env.APP_HOST +
          this.$route.path.replace(/\/$/, '')
        )
      }
    },

    isSiteClosed() {
      return this.settings.is_frontend_closed && !this.devMode
    },

    ...mapState(['cssVariables', 'isMenuShown', 'settings'])
  },

  watch: {
    localDeviceWidth(value) {
      // change deviceWidth at storage only if local one have changed
      this.$store.dispatch('setDeviceWidth', value)
    }
  },

  mounted() {
    this.handleResize()

    if (process.browser) {
      this.throttledFunction = throttle(this.handleResize, 100, {
        leading: true,
        trailing: true
      })
      window.addEventListener('resize', this.throttledFunction)

      // hold pointer to the event listener to release it while unmount
      this.keydownEventListener = (e) => {
        if (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'l')) {
          this.devMode = !this.devMode
        }
      }
      window.addEventListener('keydown', this.keydownEventListener)
    }
  },

  destroyed() {
    if (process.browser) {
      // remove all added event listeners to avoid memory leaks
      window.removeEventListener('resize', this.throttledFunction)
      window.removeEventListener('keydown', this.keydownEventListener)
    }
  },

  methods: {
    handleResize() {
      if (process.browser) {
        const smBreakpoint = parseInt(this.cssVariables['sm-breakpoint'])
        const mdBreakpoint = parseInt(this.cssVariables['md-breakpoint'])
        const lgBreakpoint = parseInt(this.cssVariables['lg-breakpoint'])
        const xlBreakpoint = parseInt(this.cssVariables['xl-breakpoint'])
        const xxlBreakpoint = parseInt(this.cssVariables['xxl-breakpoint'])

        if (window.innerWidth < smBreakpoint) {
          this.localDeviceWidth = 'xs'
        } else if (
          window.innerWidth >= smBreakpoint &&
          window.innerWidth < mdBreakpoint
        ) {
          this.localDeviceWidth = 'sm'
        } else if (
          window.innerWidth >= mdBreakpoint &&
          window.innerWidth < lgBreakpoint
        ) {
          this.localDeviceWidth = 'md'
        } else if (
          window.innerWidth >= lgBreakpoint &&
          window.innerWidth < xlBreakpoint
        ) {
          this.localDeviceWidth = 'lg'
        } else if (
          window.innerWidth >= xlBreakpoint &&
          window.innerWidth < xxlBreakpoint
        ) {
          this.localDeviceWidth = 'xl'
        } else if (window.innerWidth >= xxlBreakpoint) {
          this.localDeviceWidth = 'xxl'
        }
      }
    }
  },
  // TODO: ???
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs
      },
      link: [
        {
          rel: 'canonical',
          href: this.pageUrl
        },
        ...i18nSeo.link
      ],
      meta: [
        {
          name: 'og:url',
          content: this.pageUrl
        },
        ...i18nSeo.meta
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.nuxt-container {
  background: $gray-900;
}

@media (max-width: $sm-breakpoint) {
  .page-container {
    min-height: calc(100vh - 64px - 96px - 152px); // - header - footer
    margin-top: 64px;
    padding-top: 32px;
    margin-bottom: 96px;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .page-container {
    min-height: calc(100vh - 64px - 96px - 108px); // - header - footer
    margin-top: 64px;
    padding-top: 32px;
    margin-bottom: 96px;
  }
}

@media (min-width: $md-breakpoint) {
  .page-container {
    min-height: calc(
      100vh - 96px - 80px - 72px
    ); // - margin-bottom - header - footer
    padding-top: 56px;
    margin-top: 80px;
    margin-bottom: 96px;
  }
}
</style>
