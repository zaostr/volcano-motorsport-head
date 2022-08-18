<template>
  <div class="rating">
    <IconStar
      v-for="index in 5"
      :key="index"
      :class="{ __filled: index <= value }"
    />
  </div>
</template>

<script>
import IconStar from '@/components/icons/Star'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Rating',

  components: { IconStar },

  props: {
    value: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0 && val <= 5
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.rating {
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 4px;
  }
}

.__filled {
  color: $orange-500;
}
</style>
