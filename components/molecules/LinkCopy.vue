<template>
  <div class="link-copy">
    <div class="text-container">
      <DarwinText v-if="title" :text="title + ':'" />

      <Link :text="text" :href="href" target="_blank" />
    </div>

    <transition name="opacity-short" mode="out-in">
      <div v-if="!copied" class="copy-handler">
        <IconCopy @click.native="copyHandler" />
        <DarwinText
          :text="$t('linkCopy.copy')"
          size="tiny"
          @click.native="copyHandler"
        />
      </div>

      <DarwinText
        v-if="copied"
        :text="$t('linkCopy.copied')"
        size="tiny"
        class="copied"
      />
    </transition>
  </div>
</template>

<script>
/** utils **/
import copyToClipboard from '@/utils/copyToClipboard'

/** components **/
import Link from '@/components/atoms/Link'
import DarwinText from '@/components/atoms/Text'
import IconCopy from '@/components/icons/Copy'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'LinkCopy',

  components: { IconCopy, DarwinText, Link },

  props: {
    title: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },

    href: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      copied: false
    }
  },

  methods: {
    copyToClipboard,

    copyHandler() {
      this.copyToClipboard(this.text)
      this.copied = true

      setTimeout(() => {
        this.copied = false
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.link-copy {
  display: flex;
  align-items: baseline;

  .copy-handler {
    cursor: pointer;
    color: $white;
    margin-left: 12px;

    &:hover {
      opacity: 0.8;
    }
  }

  .copied {
    margin-left: 12px;
  }
}

.text-container {
  > * {
    display: inline-flex;
  }
}

@media (max-width: $xl-breakpoint) {
  .copy-handler {
    .icon {
      display: none;
    }
  }
}

@media (min-width: $xl-breakpoint) {
  .copy-handler {
    .text {
      display: none;
    }
  }
}
</style>
