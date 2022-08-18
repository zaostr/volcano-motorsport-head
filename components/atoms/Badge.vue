<template>
  <DarwinText :text="text" family="oswald" size="micro" class="badge" />
</template>

<script>
import DarwinText from '@/components/atoms/Text'
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Badge',

  components: { DarwinText },

  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.badge {
  display: flex;
  align-items: center;
  padding: 0.5px 2.5px 0 5px; // due to letter-spacing right padding in Chrome is wired
  height: 19px;
  background: $white;
  width: fit-content;
  color: $gray-900;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
