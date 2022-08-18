<template>
  <svg
    class="loader"
    style="margin: auto; background-image: none; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s; background-position: initial initial; background-repeat: initial initial;"
    width="128px"
    height="128px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M14 50A36 36 0 0 0 86 50A36 40 0 0 1 14 50"
      fill="#fd7222"
      stroke="none"
      style="animation-play-state: running; animation-delay: 0s;"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 52;360 50 52"
        style="animation-play-state: running; animation-delay: 0s;"
      ></animateTransform>
    </path>
  </svg>
</template>

<script>
/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Loader'
}
</script>
