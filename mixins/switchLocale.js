export default {
  methods: {
    async switchLocale(locale) {
      if (this.$store) {
        await this.$store.dispatch('setMenuShown', false)
        await this.$store.dispatch('setLocale', locale)
      } else {
        /**
         * For storybook purpose only.
         */
        this.$emit('switch-locale', locale)
      }
    }
  }
}
