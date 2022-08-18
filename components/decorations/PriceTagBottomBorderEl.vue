<template>
  <svg
    class="decoration"
    width="12"
    height="4"
    viewBox="0 0 12 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 4H2C2 1.79077 3.79102 0 6 0C8.20898 0 10 1.79077 10 4H12V0H6H0V4Z"
    />
  </svg>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'PriceTagBottomBorderEl'
}
</script>

<style scoped lang="scss">
.decoration {
  display: block;

  path {
    fill: currentColor;
  }
}
</style>
