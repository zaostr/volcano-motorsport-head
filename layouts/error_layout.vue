<template>
  <div class="nuxt-container">
    <DarwinHeader />

    <Nuxt />

    <DarwinFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

/** components **/
import DarwinHeader from '@/components/organisms/Header.vue'
import DarwinFooter from '@/components/organisms/Footer.vue'

export default {
  name: 'ErrorLayout',

  components: {
    DarwinHeader,
    DarwinFooter
  },

  data() {
    return {
      localDeviceWidth: 'xs'
    }
  },

  computed: {
    ...mapState(['cssVariables'])
  },

  watch: {
    localDeviceWidth(value) {
      // change deviceWidth at storage only if local one have changed
      this.$store.dispatch('setDeviceWidth', value)
    }
  },

  mounted() {
    if (process.browser) {
      this.throttledFunction = throttle(this.handleResize, 100, {
        leading: true,
        trailing: true
      })
      window.addEventListener('resize', this.throttledFunction)
      this.handleResize()
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.throttledFunction)
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
    padding-top: 56px;
    margin-bottom: 96px;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .page-container {
    min-height: calc(100vh - 64px - 96px - 108px); // - header - footer
    margin-top: 64px;
    padding-top: 56px;
    margin-bottom: 96px;
  }
}

@media (min-width: $md-breakpoint) {
  .page-container {
    min-height: calc(100vh - 80px - 96px - 72px); // - header - footer
    margin-top: 80px;
    padding-top: 128px;
    margin-bottom: 96px;
  }
}
</style>
