<template>
  <div class="serie-date-badge">
    <Badge :text="serie" />
    <div class="separator" />
    <DateBadge :date="date" />
  </div>
</template>

<script>
import Badge from '@/components/atoms/Badge'
import DateBadge from '@/components/atoms/DateBadge'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'SerieDateBadge',

  components: { DateBadge, Badge },

  props: {
    serie: {
      type: String,
      default: ''
    },

    date: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.serie-date-badge {
  display: flex;
  align-items: center;

  .separator {
    height: 20px;
    width: 1px;
    background: $white015;
    margin: 0 16px;
  }
}
</style>
