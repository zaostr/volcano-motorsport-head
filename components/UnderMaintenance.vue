<template>
  <div>
    <Picture
      picture="/images/under-construction.jpg"
      min-width="100%"
      min-height="100%"
    />

    <Heading
      :text="settings ? settings.maintenance_message : ''"
      :light="true"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Picture from '@/components/atoms/Picture'
import Heading from '@/components/atoms/Heading'

/**
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'UnderConstruction',

  components: { Heading, Picture },

  computed: {
    ...mapState(['settings'])
  }
}
</script>

<style scoped lang="scss">
// @import './assets/styles/colors';
.picture-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  overflow: hidden;
  display: flex;
}

.heading {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 10001;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
}
</style>
