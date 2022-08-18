<template>
  <div class="heading">
    <!-- eslint-disable vue/no-v-html -->
    <component
      :is="el"
      v-if="seo"
      :itemprop="itemprop"
      :class="{
        [size]: size,
        ['__' + weight]: weight,
        ['__' + family]: family
      }"
      v-html="text"
    />
    <div
      v-else
      :itemprop="itemprop"
      :class="{
        [size]: size,
        ['__' + weight]: weight,
        ['__' + family]: family
      }"
      v-html="text"
    />
  </div>
</template>

<script>
/**
 * This is a reusable heading component. Converts to <div ...> or <h1 ...>, <h2 ...>, <h3 ...>, <h4 ...>, <h5 ...> depending on props.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Heading',

  props: {
    /**
     * Text of the heading
     */
    text: {
      type: [String, Number],
      default: 'Heading'
    },

    /**
     * Size of the heading if it is just a <div ...>
     * @values h1, h2, h3, h4, h5
     */
    size: {
      type: String,
      default: 'h3',
      validator: (val) =>
        ['superior', 'h1', 'h2', 'h3', 'h4', 'h5'].includes(val)
    },

    /**
     * If the heading tends to be a SEO heading use appropriate tag
     * @values h1, h2, h3, h4, h5
     */
    seo: {
      type: String,
      default: '',
      validator: (val) => ['', 'h1', 'h2', 'h3', 'h4', 'h5'].includes(val)
    },

    /**
     * Font family.
     * @values 'averta', 'oswald'
     */
    family: {
      type: String,
      default: 'averta',
      validator: (val) => ['averta', 'oswald'].includes(val)
    },

    /**
     * Font weight.
     * @values 'regular', 'medium', 'bold'
     */
    weight: {
      type: String,
      default: 'default',
      validator: (val) => ['default', 'regular', 'medium', 'bold'].includes(val)
    },

    itemprop: {
      type: String,
      default: ''
    }
  },

  computed: {
    el() {
      let elem = 'h1'
      if (this.seo === 'h2') {
        elem = 'h2'
      } else if (this.seo === 'h3') {
        elem = 'h3'
      } else if (this.seo === 'h4') {
        elem = 'h4'
      } else if (this.seo === 'h5') {
        elem = 'h5'
      }
      return elem
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.heading {
  > * {
    transition: all 150ms linear;
  }
}

h1,
.h1 {
  font-weight: 500;
  font-size: 90px;
  line-height: 100px;
}

h2,
.h2 {
  font-weight: 700;
  font-size: 48px;
  line-height: 62px;
}

h3,
.h3 {
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
}

h4,
.h4 {
  font-weight: 700;
  font-size: 26px;
  line-height: 36px;

  &.__oswald {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
  }
}

h5,
.h5 {
  font-weight: 400;
  font-size: 19px;
  line-height: 28px;
}

.superior {
  // only for index first screen
  font-size: 36px;
  line-height: 48px;
  text-transform: uppercase;

  &.__oswald {
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
  }
}

.__regular {
  font-weight: 400;
}

.__medium {
  font-weight: 500;
}

.__bold {
  font-weight: 700;
}

@media (min-width: $md-breakpoint) {
  .superior {
    font-size: 64px;
    line-height: 78px;
  }
}

@media (min-width: $lg-breakpoint) {
  .superior {
    font-size: 84px;
    line-height: 98px;
  }
}

@media (min-width: $xxl-breakpoint) {
  .superior {
    font-size: 111px;
    line-height: 130px;
  }
}
</style>
