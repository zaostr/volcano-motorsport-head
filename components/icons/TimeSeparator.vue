<template>
  <!--  <svg
    class="icon"
    width="8"
    height="20"
    viewBox="0 0 8 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2.00003" width="4" height="8" rx="2" />
    <rect y="20" width="4" height="8" rx="2" transform="rotate(-90 0 20)" />
  </svg>-->
  <lottie-animation
    :auto-play="false"
    :speed="1"
    path="volcano-counter.json"
    @AnimControl="setAnimController"
  />
</template>

<script>
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconTimeSeparator',

  components: {
    LottieAnimation
  },

  methods: {
    setAnimController(animationItem) {
      // used by parent component to sync animations
      this.$emit('AnimControl', animationItem)
    }
  }
}
</script>

<style scoped lang="scss">
/*.icon {
  rect {
    fill: currentColor;

    &:nth-child(1) {
      animation-duration: 3s;
      animation-name: rect1Animation;
    }
  }
}

@keyframes rect1Animation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(180deg);
  }
}*/
</style>
