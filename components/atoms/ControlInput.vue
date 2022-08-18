<template>
  <div
    ref="group"
    :class="{ __type: type, '__right-icon': suffixIcon }"
    class="control-group"
  >
    <label
      v-if="label"
      :for="id"
      :class="{
        'small-text': type === 'primary',
        __disabled: disabled,
        __sticky: inputValue
      }"
      class="control-group-label"
      v-text="required ? label + '*' : label"
    />
    <div class="input-wrap">
      <!--TODO: refactor v-if for v-mask-->
      <input
        v-if="inputType === 'phone'"
        :id="id"
        :ref="id"
        v-model="inputValue"
        v-mask="'+# (###) ###-####'"
        :name="name"
        :placeholder="
          type === 'secondary' ? '' : required ? placeholder + '*' : placeholder
        "
        :autocomplete="autocomplete ? 'on' : 'off'"
        :required="required"
        :disabled="disabled"
        :class="{ __error: error }"
        type="tel"
        class="control-group-input"
        @input="emitValue"
        @change="emitValue"
        @keyup.enter.prevent="emitSubmit"
        @keyup="emitKeyup($event)"
      />
      <input
        v-else
        :id="id"
        :ref="id"
        v-model="inputValue"
        :name="name"
        :placeholder="
          type === 'secondary' ? '' : required ? placeholder + '*' : placeholder
        "
        :autocomplete="autocomplete ? 'on' : 'off'"
        :required="required"
        :disabled="disabled"
        :class="{ __error: error }"
        :type="inputType"
        class="control-group-input"
        @input="emitValue"
        @change="emitValue"
        @keyup.enter.prevent="emitSubmit"
        @keyup="emitKeyup($event)"
      />
    </div>
    <transition name="error">
      <span
        v-if="error"
        class="control-group-error small-text"
        v-text="error"
      />
    </transition>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

/**
 * This is a reusable input component. Depending on props may have different appearance and behavior.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'ControlInput',

  directives: { mask },

  props: {
    /**
     * Name of the input
     */
    name: {
      type: String,
      default: 'form_input[]'
    },
    /**
     * Defines appearance the input
     * @values 'primary', 'secondary'
     */
    type: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'botbait'].includes(val)
    },
    /**
     * Defines input attribute type
     */
    inputType: {
      type: String,
      default: 'text'
    },
    /**
     * Default value of the input
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * Label of the input
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Placeholder of the input
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * If input is required
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * If autocomplete is allowed
     */
    autocomplete: {
      type: Boolean,
      default: false
    },
    /**
     * If input is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * If it isn't empty error message will be displayed
     */
    error: {
      type: String,
      default: ''
    },
    /**
     * If not zero restricts amount of chars
     */
    limit: {
      type: Number,
      default: 0
    },
    /**
     * If input have to be padded right
     */
    suffixIcon: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      inputValue: this.value,
      id: null,
      innerError: this.error
    }
  },

  watch: {
    value() {
      // replace inputValue with value if changed
      this.inputValue = this.value
    }
  },

  mounted() {
    this.id = this._uid
    if (this.type === 'botbait') {
      this.inputValue = this.makeRandomString()
      this.emitValue()
    }
  },

  methods: {
    emitValue() {
      if (this.checkOverflow()) {
        /**
         * Value was overflowed. User types more chars than limit defines. Payload contains component uid
         *
         * @event overflow
         * @type {Number}
         */
        this.$emit('overflow', this.id)
      } else {
        /**
         * Value was changed. Payload contains current value and component uid.
         *
         * @event changed
         * @type {String, Number}
         */
        this.$emit('changed', this.inputValue, this.id)
      }
    },
    emitSubmit() {
      /**
       * Enter key was pressed. Payload contains component uid.
       *
       * @event submitted
       * @type {Number}
       */
      this.$emit('submitted', this.id)
    },
    emitKeyup(event) {
      /**
       * Key was pressed. Payload contains KeyboardEvent and component uid.
       *
       * @event keyup
       * @type {KeyboardEvent, Number}
       */
      this.$emit('keyup', event, this.id)
    },
    checkOverflow() {
      let overflow = false
      if (this.limit !== 0 && this.inputValue.length > this.limit) {
        this.inputValue = this.inputValue.substr(0, this.limit)
        overflow = true
      }
      return overflow
    },
    makeRandomString(length = 16) {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.control-group {
  /*display: inline-block;
  width: auto; // Edge fix
  width: fit-content;*/
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.control-group-label {
  line-height: inherit;
  text-align: left;
  margin-bottom: 2px;
}

.input-wrap {
  position: relative;
  display: flex;
  // align-items: center;
  // justify-content: center;
  width: 100%;
}

.blocked-icon {
  pointer-events: none;
  position: absolute;
  left: 16px;
}

.control-group-input {
  display: inline-block;
  background: transparent;
  border: none;
  border-left: 1px solid $white015;
  border-radius: 0;
  // width: 100%;
  color: $white;
  padding: 0 0 2px 24px;
  height: 32px;
  font-size: 15px;
  line-height: 24px;
  transition: all 300ms ease;
  margin-left: auto;
  width: 138px;
}

.control-group-input:focus,
.control-group-input:active {
  color: $white;
  width: 100%;
}

.control-group-input:disabled {
  background: $light-gray;
  cursor: not-allowed;
  padding-left: 39px;
}

.control-group-input.__error {
  border-color: $royal-red;
}

.control-group-error {
  margin-top: 8px;
  color: $royal-red;
}

.__secondary {
  .blocked-icon {
    position: absolute;
    left: 0;
    top: 4px;
  }

  .control-group-label {
    position: absolute;
    color: $twilight-gray;
    z-index: 1;
    top: 0;
    transition: all 200ms ease;
  }

  .control-group-label.__sticky {
    top: -20px;
    font-size: 13px;
    line-height: 18px;
  }

  .control-group-label.__disabled:not(.__sticky) {
    margin-left: 24px;
  }

  .control-group-input {
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
    padding: 0 0 7px;
  }

  .control-group-input:focus,
  .control-group-input:active {
    border-color: $smoky-gray;
  }

  .input-wrap::after {
    position: absolute;
    content: '';
    background: $classic-blue;
    bottom: 0;
    height: 1px;
    width: 0;
    transition: width 200ms ease;
  }

  .control-group-input:disabled {
    background: none;
    padding-left: 24px;
  }
}

.__secondary.__active-input {
  .control-group-label {
    top: -20px;
    font-size: 13px;
    line-height: 18px;
  }

  .input-wrap::after {
    width: 100%;
  }
}

.__right-icon {
  .control-group-input {
    padding-right: 32px;
  }
}
</style>
