<template>
  <div class="breadcrumbs-archive">
    <div class="link-back-wrap">
      <LinkBack
        :text="backText"
        :route-name="backRouteName"
        :route-params="backRouteParams"
        :white="true"
        text-size="general"
      />

      <DarwinText text="/" class="separator" />
    </div>

    <Heading :text="year" :size="yearSize" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** components **/
import LinkBack from '@/components/atoms/LinkBack'
import DarwinText from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'BreadcrumbsArchive',

  components: { Heading, DarwinText, LinkBack },

  props: {
    backRouteName: {
      type: String,
      default: ''
    },

    backRouteParams: {
      type: Object,
      default: () => {}
    },

    backText: {
      type: String,
      default: ''
    },

    year: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    yearSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'h3' : 'h2'
    },

    ...mapState(['deviceWidth'])
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.breadcrumbs-archive {
  display: flex;
  align-items: flex-start;
}

.link-back-wrap {
  display: flex;
  margin-top: 20px;
}

.breadcrumbs-archive {
  height: 48px;
}

.separator {
  margin: 0 8px;
}

@media (min-width: $md-breakpoint) {
  .link-back-wrap {
    margin-top: 32px;
  }

  .breadcrumbs-archive {
    height: 62px;
  }
}
</style>
