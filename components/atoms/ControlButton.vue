<template>
  <div
    :class="{
      ['__' + type]: type,
      ['__' + size]: size,
      '__icon-only': iconOnly
    }"
    class="control-group"
    @click="emitClick($event)"
  >
    <component
      :is="el"
      v-bind="linkProps"
      :disabled="disabled"
      :class="{ ['control-group-button']: true, __disabled: disabled }"
    >
      <DarwinText v-if="!$slots.default" :text="text" size="small" />
      <!-- @slot may contains a text or an icon. -->
      <slot v-else />
    </component>
  </div>
</template>

<script>
import DarwinText from '@/components/atoms/Text'
/**
 * This is a reusable button component. Converts to <nuxt-link ...> or <a target="_blank" ...> depending on props
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'ControlButton',

  components: { DarwinText },

  props: {
    /**
     * The type of the button defines it's appearance.
     * @values primary, secondary
     */
    type: {
      type: String,
      default: 'primary',
      validator: (val) =>
        ['primary', 'secondary', 'alternative', 'inverse'].includes(val)
    },

    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['medium', 'small', 'tiny'].includes(val)
    },

    /** For simple text button
     *
     */
    text: {
      type: [String, Number],
      default: ''
    },

    /**
     * In case of the button usage for internal navigation pass a route name here.
     */
    routeName: {
      type: String,
      default: ''
    },

    /**
     * In case of the button usage for internal navigation pass route params here.
     */
    routeParams: {
      type: Object,
      default: () => ({})
    },

    /**
     * In case of the button usage for external navigation pass external link here.
     */
    href: {
      type: String,
      default: ''
    },

    /**
     * In case of the button usage for external navigation you can change target attribute of the link.
     * @values '_blank', '_parent', '_self', '_top'
     */
    target: {
      type: String,
      default: '_blank',
      validator: (val) => ['_blank', '_parent', '_self', '_top'].includes(val)
    },

    /**
     * In case of the button usage for other purposes buy handling click event you may need to set this param to true .
     */
    preventDefault: {
      type: Boolean,
      default: true
    },

    iconOnly: {
      type: Boolean,
      default: false
    },

    disabled: {
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
          target: this.target
        }
      }
    }
  },

  methods: {
    emitClick(event) {
      if (this.preventDefault) {
        event.preventDefault()
      }
      /**
       * Button was clicked. Payload contains MouseEvent and component uid.
       *
       * @event click
       * @type {MouseEvent, Number}
       */
      this.$emit('click', event, this._uid)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.text {
  text-transform: uppercase;
}

.control-group {
  width: fit-content;
  position: relative;
}

.control-group-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  color: $white;
  text-align: center;
  white-space: nowrap;
  transition: background-color 150ms linear;

  > * + * {
    margin-left: 8px;
  }
}

.__primary {
  .control-group-button {
    background: $orange-500;
  }

  .control-group-button:hover,
  .control-group-button:active {
    background: $orange-550;
  }
}

.__secondary {
  .control-group-button {
    border: 1px solid $white;
    background: transparent;
    color: $white;
  }

  .control-group-button:hover,
  .control-group-button:active {
    // TODO
    background: $white015;
  }
}

.__alternative {
  .control-group-button {
    background: $white;
    color: $black;
  }

  .control-group-button:disabled,
  .control-group-button.__disabled {
    cursor: not-allowed;
  }
}

.__inverse {
  .control-group-button {
    background: transparent;
    color: $white;

    > * + * {
      margin-left: 12px;
    }
  }

  .control-group-button:disabled,
  .control-group-button.__disabled {
    cursor: not-allowed;
  }
}

.__medium {
  .control-group-button {
    height: 48px;
    padding: 0 24px;
  }

  &.__secondary {
    .control-group-button {
      padding: 0 23px;
    }
  }
}

.__small {
  .control-group-button {
    height: 36px;
    padding: 0 20px;
  }

  &.__secondary {
    .control-group-button {
      padding: 0 19px;
    }
  }
}

.__tiny {
  .control-group-button {
    height: 24px;
  }
}

.__icon-only {
  &.__medium {
    .control-group-button {
      height: 48px;
      width: 48px;
      padding: 0;
    }
  }

  &.__small {
    .control-group-button {
      height: 36px;
      width: 36px;
      padding: 0;
    }
  }
}
</style>
