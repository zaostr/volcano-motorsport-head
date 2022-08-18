<template>
  <component
    :is="el"
    v-bind="linkProps"
    :class="{
      ['__' + type]: type
    }"
    class="link"
    @click="emitClick"
  >
    <DarwinText :text="text" :size="size" :weight="weight" />
    <IconExternalLink v-if="showExternalIcon" />
  </component>
</template>

<script>
import DarwinText from '@/components/atoms/Text'
import IconExternalLink from '@/components/icons/ExternalLink'

/**
 * This is a reusable link component. Converts to <nuxt-link ...> or <a target="_blank" ...> depending on props
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Link',

  components: { IconExternalLink, DarwinText },

  props: {
    /**
     * Defines appearance of the link
     * @values 'primary', 'secondary'
     */
    type: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'tertiary'].includes(val)
    },

    /**
     * In case of for internal navigation pass a route name here.
     */
    routeName: {
      type: String,
      default: ''
    },

    /**
     * In case of for internal navigation pass route params here.
     */
    routeParams: {
      type: Object,
      default: () => ({})
    },

    /**
     * In case of for external navigation pass external link here.
     */
    href: {
      type: String,
      default: ''
    },

    /**
     * Text of the link
     */
    text: {
      type: [String, Number],
      default: ''
    },

    /**
     * Type of the text.
     * @values 'augmented', 'general', 'small', 'tiny'
     */
    size: {
      type: String,
      default: 'general',
      validator: (val) =>
        ['augmented', 'general', 'small', 'tiny'].includes(val)
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
     * Target attribute of the <a> tag
     * @values '_blank', '_self', '_parent', '_top'
     */
    target: {
      type: String,
      default: '_blank',
      validator: (val) => ['_blank', '_self', '_parent', '_top'].includes(val)
    },

    showExternalIcon: {
      type: Boolean,
      default: false
    },

    preventDefault: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    el() {
      return this.routeName ? 'n-link' : 'a'
    },
    linkProps() {
      if (this.routeName) {
        return {
          to: this.localePath({
            name: this.routeName,
            params: this.routeParams
          })
        }
      } else {
        return {
          href: this.href,
          target: this.target,
          rel: 'nofollow noopener noreferer'
        }
      }
    }
  },
  methods: {
    emitClick(e) {
      if (this.preventDefault) {
        e.preventDefault()
      }
      /**
       * Link was clicked. Payload contains component uid
       *
       * @event click
       * @type {Number}
       */
      this.$emit('click', this._uid)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.link,
.link:visited {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  transition: color 150ms ease;

  .icon {
    margin-left: 12px;
  }

  &.__primary {
    color: $orange-500;
  }

  &.__secondary {
    color: $white;
  }

  &.__tertiary {
    color: $gray-300;
  }
}

.link:hover,
.link:active {
  text-decoration: underline;

  /* &.__primary {
    color: $orange-300;
  }

  &.__secondary {
    color: $orange-500;
  }

  &.__tertiary {
    color: $orange-500;
  } */
}
</style>
