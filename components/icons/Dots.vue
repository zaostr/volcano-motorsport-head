<template>
  <svg
    class="icon"
    width="20"
    height="4"
    viewBox="0 0 20 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2" cy="2" r="2" />
    <circle cx="10" cy="2" r="2" />
    <circle cx="18" cy="2" r="2" />
  </svg>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconDots'
}
</script>

<style scoped lang="scss">
.icon {
  circle {
    fill: currentColor;
  }
}
</style>
