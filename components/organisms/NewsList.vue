<template>
  <transition-group
    :css="false"
    tag="section"
    class="grid-container news-list"
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <CardNews
      v-for="(item, index) in filteredList"
      :key="item.id || index"
      :data-index="index"
      :data="item"
    />
  </transition-group>
</template>

<script>
/** mixins **/
import cardAppearanceAnimation from '@/mixins/cardAppearanceAnimation'

/** components **/
import CardNews from '@/components/molecules/CardNews'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'NewsList',

  components: { CardNews },

  mixins: [cardAppearanceAnimation],

  props: {
    list: {
      type: Array,
      default: () => []
    },

    showLimit: {
      type: Number,
      default: 12
    }
  },

  computed: {
    filteredList() {
      return this.list.filter((it, index) => this.showLimit >= index + 1)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .card-wrap {
    grid-column-end: span 6;
  }
}

@media (max-width: $md-breakpoint) {
  .news-list {
    margin-bottom: -18px;
  }

  .card-wrap {
    margin-bottom: 18px;
  }
}

@media (min-width: $md-breakpoint) {
  .news-list {
    margin-bottom: -24px;
  }

  .card-wrap {
    grid-column-end: span 6;
    margin-bottom: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  .card-wrap {
    grid-column-end: span 4;
  }
}
</style>
