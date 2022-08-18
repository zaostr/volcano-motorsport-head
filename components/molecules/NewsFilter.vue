<template>
  <div class="filter-wrap">
    <component
      :is="el"
      :size="elSize"
      :family="elFamily"
      :text="$t('newsFilter.all')"
      :class="{ __active: typeFilter === 'all' }"
      class="filter-item"
      @click.native="changeFilterHandler('all')"
    />

    <component
      :is="el"
      :size="elSize"
      :family="elFamily"
      :text="$t('newsFilter.news')"
      :class="{ __active: typeFilter === 'post' }"
      class="filter-item"
      @click.native="changeFilterHandler('post')"
    />

    <component
      :is="el"
      :size="elSize"
      :text="$t('newsFilter.galleries')"
      :family="elFamily"
      :class="{ __active: typeFilter === 'gallery' }"
      class="filter-item"
      @click.native="changeFilterHandler('gallery')"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

/** components **/
import Heading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'NewsFilter',

  components: { Heading, DarwinText },

  props: {
    typeFilter: {
      type: String,
      default: 'all'
    }
  },

  computed: {
    el() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'DarwinText' : 'Heading'
    },

    elSize() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'general' : 'h4'
    },

    elFamily() {
      return ['xs', 'sm'].includes(this.deviceWidth) ? 'averta' : 'oswald'
    },

    ...mapState(['deviceWidth'])
  },

  methods: {
    changeFilterHandler(filter) {
      this.$emit('change', filter)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.filter-wrap {
  display: flex;
  align-items: center;
}

.filter-item {
  padding-bottom: 16px;
  transition: color 150ms linear;
  position: relative;

  & + & {
    margin-left: 24px;
  }

  &:after {
    position: absolute;
    content: '';
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background: $orange-500;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-out;
  }

  &:hover {
    color: $orange-500;
  }

  &.__active {
    color: $orange-500;

    &:after {
      transform-origin: left;
      transform: scaleX(1);
    }
  }

  &:not(.__active) {
    cursor: pointer;
  }
}

@media (min-width: $md-breakpoint) {
  .filter-item {
    padding-bottom: 24px;

    & + & {
      margin-left: 32px;
    }
  }
}
</style>
