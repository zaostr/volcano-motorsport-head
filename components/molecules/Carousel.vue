<template>
  <div class="carousel">
    <pre>{{ list }}</pre>
  </div>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Carousel',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
// @import './assets/styles/colors';
</style>
