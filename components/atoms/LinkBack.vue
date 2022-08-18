<template>
  <NLink
    :to="localePath({ name: routeName, params: routeParams })"
    :class="{ __white: white }"
    class="link-back"
  >
    <IconChevronBack />
    <DarwinText :text="text" :size="textSize" />
  </NLink>
</template>

<script>
import IconChevronBack from '@/components/icons/ChevronBack'
import DarwinText from '@/components/atoms/Text'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'LinkBack',

  components: { DarwinText, IconChevronBack },

  props: {
    routeName: {
      type: String,
      default: ''
    },

    routeParams: {
      type: Object,
      default: () => {}
    },

    text: {
      type: String,
      default: ''
    },

    textSize: {
      type: String,
      default: 'tiny'
    },

    white: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.link-back {
  color: $gray-300;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }

  &.__white {
    color: $white;
  }
}
</style>
