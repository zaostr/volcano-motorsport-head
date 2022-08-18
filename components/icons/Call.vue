<template>
  <svg
    class="icon"
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 5C21.2386 5 19 7.23858 19 10V62C19 64.7614 21.2386 67 24 67H48C50.7614 67 53 64.7614 53 62V10C53 7.23858 50.7614 5 48 5H24ZM24 7H48C49.6569 7 51 8.34315 51 10V62C51 63.6569 49.6569 65 48 65H24C22.3431 65 21 63.6569 21 62V10C21 8.34315 22.3431 7 24 7ZM20 10C20 7.79086 21.7909 6 24 6H48C50.2091 6 52 7.79086 52 10V62C52 64.2091 50.2091 66 48 66H24C21.7909 66 20 64.2091 20 62V10Z"
    />
    <rect x="22" y="8" width="28" height="56" rx="2" fill="#1A1A1A" />
    <path d="M48 52V62H38L48 52Z" fill="#ADADAD" />
    <path d="M30 11L28 8H44L42 11H30Z" />
  </svg>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconCall'
}
</script>

<style scoped lang="scss">
.icon {
  path:nth-child(1) {
    fill: currentColor;
  }

  path:nth-child(4) {
    fill: currentColor;
  }
}
</style>
