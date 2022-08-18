<template>
  <transition name="opacity">
    <div v-if="loading" class="loading-page">
      <Loader class="loader" />
    </div>
  </transition>
</template>

<script>
import Loader from '@/components/atoms/Loader'

export default {
  name: 'Loading',

  components: { Loader },

  data: () => ({
    loading: false
  }),

  methods: {
    start() {
      this.loading = true
    },

    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $gray-880; // $white015;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  height: 64px;
  width: 64px;
}
</style>
