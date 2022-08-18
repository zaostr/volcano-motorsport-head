<template>
  <main class="grid-container page-container">
    <div v-if="error.statusCode === 404" class="status-code">
      {{ error.statusCode }}
    </div>

    <div v-else class="animation-container">
      <img src="/images/animated-car-racing.gif" />
    </div>

    <Heading :text="errorMessage" size="h5" class="message" />

    <ul v-if="error.statusCode === 404" class="links-list">
      <li v-for="route in routesList" :key="route.name" class="link-wrap">
        <darwin-link
          :route-name="route.name"
          :route-params="route.params"
          :text="$t(`pages.${route.label ? route.label : route.name}`)"
          class="link"
        />
      </li>
    </ul>

    <ControlButton
      v-else
      :text="$t('errors.refreshPage')"
      :href="currentHref"
      :prevent-default="false"
      target="_self"
      class="refresh-button"
    />
  </main>
</template>

<script>
/** utils **/
import { routeNamesList } from '@/utils/routes'

/** components **/
import DarwinLink from '@/components/atoms/Link'
import Heading from '@/components/atoms/Heading'
import ControlButton from '@/components/atoms/ControlButton'

export default {
  name: 'Error',

  layout: 'error_layout',

  components: {
    ControlButton,
    Heading,
    DarwinLink
  },

  props: {
    /**
     * Accepts error object from Nuxt.js
     */
    error: {
      type: Object,
      default() {
        return {
          statusCode: 404
        }
      }
    }
  },

  data() {
    return {
      routesList: [
        {
          name: routeNamesList.index
          // label: 'index'
        },
        {
          name: routeNamesList.newsList,
          label: 'news',
          params: { year: new Date().getFullYear() }
        },
        {
          name: routeNamesList.season,
          label: 'season',
          params: { year: new Date().getFullYear() }
        }
      ]
    }
  },

  computed: {
    errorMessage() {
      if (this.error.statusCode === 404) {
        return this.$t('errors.notFoundMessage')
      } else if (this.error.statusCode === 503) {
        return this.$t('errors.networkErrorMessage')
      } else if (this.error.message) {
        return this.error.message
      } else {
        return this.defaultErrorMessage
      }
    },

    currentHref() {
      return global?.location?.href
    }
  },

  mounted() {
    if (this.$nuxt) {
      // to use error at other components
      this.$nuxt.$store.dispatch('setError', this.error)
    } else {
      // for storybook do nothing
    }
  },

  destroyed() {
    if (this.$nuxt) {
      // reset storage data
      this.$nuxt.$store.dispatch('setError', {})
    } else {
      // for storybook do nothing
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables.scss';

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-code {
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  font-size: 64px;
  line-height: 78px;
}

.message {
  margin-top: 56px;
  text-align: center;
}

.links-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.links-list,
.refresh-button {
  margin-top: 32px;
}

.link-wrap + .link-wrap {
  margin-top: 12px;
}

@media (min-width: $xl-breakpoint) {
  .status-code {
    font-size: 84px;
    line-height: 98px;
  }
}
</style>
