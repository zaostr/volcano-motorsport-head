<template>
  <div class="grid-container">
    <div class="heading-container">
      <DarwinText :text="supHeading" family="oswald" size="tiny" />

      <div class="heading-wrapper">
        <IconInstagram v-if="instagramIcon" :hoverable="false" />
        <Heading :text="heading" size="h3" seo="h4" />
      </div>
    </div>

    <div class="separator" />
  </div>
</template>

<script>
import DarwinText from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'
import IconInstagram from '~/components/icons/Instagram'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'NewsListBlock',

  components: { IconInstagram, Heading, DarwinText },

  props: {
    supHeading: {
      type: String,
      default: ''
    },

    heading: {
      type: String,
      default: ''
    },

    instagramIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.grid-container {
  margin-top: 96px;
}

.heading-container {
  text-align: center;

  .text {
    text-transform: uppercase;
  }

  .heading {
    margin-top: 12px;
  }
}

.separator {
  height: 3px;
  width: 48px;
  background: $white;
  margin: 24px auto 0;
}

.heading-wrapper {
  display: flex;
  column-gap: 12px;
  align-items: flex-end;
  width: fit-content;
  margin: auto;

  .icon {
    margin-bottom: 8px;
  }
}

@media (min-width: $md-breakpoint) {
  .grid-container {
    margin-top: 128px;
  }
}
</style>
