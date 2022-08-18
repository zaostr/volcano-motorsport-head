<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    :class="{
      ['__' + size]: size,
      ['__' + weight]: weight,
      ['__' + family]: family
    }"
    :itemprop="itemprop"
    class="text __bulleted"
    v-html="text"
  />
</template>

<script>
/**
 * This is a reusable text component.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'DarwinText',

  props: {
    /**
     * Component content. May contains HTML tags
     */
    text: {
      type: [String, Number],
      default: ''
    },

    /**
     * Type of the text.
     * @values 'superior', 'augmented', 'general', 'small', 'tiny', 'micro'
     */
    size: {
      type: String,
      default: 'general',
      validator: (val) =>
        ['superior', 'augmented', 'general', 'small', 'tiny', 'micro'].includes(
          val
        )
    },

    /**
     * Font weight.
     * @values 'regular', 'medium', 'bold'
     */
    weight: {
      type: String,
      default: 'regular',
      validator: (val) => ['regular', 'medium', 'bold'].includes(val)
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

    itemprop: {
      type: String,
      default: ''
    }
  },

  watch: {
    text: 'contentUpdated'
  },

  mounted() {
    this.addListeners()
  },

  beforeDestroy() {
    this.removeListeners()
  },

  methods: {
    navigate(event) {
      const href = event.target.getAttribute('href')
      const target = event.target.getAttribute('target')

      if (href && href[0] === '/' && target !== '_blank') {
        event.preventDefault()
        this.$router.push(this.localePath(href))
      }
    },

    contentUpdated() {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
      })
    },

    addListeners() {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },

    removeListeners() {
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.__superior {
  font-size: 19px;
  line-height: 28px;
}

.__augmented {
  font-size: 17px;
  line-height: 28px;
}

.__general {
  font-size: 15px;
  line-height: 24px;
}

.__small {
  font-size: 14px;
  line-height: 22px;
}

.__tiny {
  font-size: 13px;
  line-height: 20px;
}

.__micro {
  font-size: 10px;
  line-height: 15px;
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

.__oswald {
  font-family: 'Oswald', sans-serif;

  &.__tiny {
    letter-spacing: 3px;
  }

  &.__micro {
    letter-spacing: 2px;
  }
}
</style>

<style lang="scss">
@import './assets/styles/variables';

.text {
  a {
    text-decoration: underline;
  }
}
</style>
