<template>
  <DarwinText :text="copyrightText" size="tiny" class="copyright" />
</template>

<script>
import DarwinText from '@/components/atoms/Text'

/**
 * This is a reusable copyright component.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'FooterCopyright',

  components: { DarwinText },

  props: {
    /**
     * Company name
     */
    company: {
      type: String,
      default: 'ACME Corp.'
    }
  },

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },

    copyrightText() {
      return '© ' + this.currentYear + ' ' + this.company
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';
</style>
